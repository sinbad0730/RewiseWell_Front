import { Card, CardContent } from "../challenge/component/card";
import { Button } from "../challenge/component/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";
import { PacmanLoader } from 'react-spinners';
import swal from 'sweetalert';
import { Textarea } from "../challenge/component/textarea";
import EventBus from "@/components/EventBus";
interface ExamDisplayProps {
    subject: any;
    unit: any;
    quantity: number;
    unitName: any;
    op: string;
    onBack: () => void;
}

export function ExamDisplay({ subject, unit, quantity, unitName, op, onBack }: ExamDisplayProps) {
    const [questions, setQuestions] = useState<any>([]);
    const [visibleImages, setVisibleImages] = useState<{ [key: number]: boolean }>({});
    const [isComplete, setIsComplete] = useState(false);
    const [showMarkScheme, setShowMarkScheme] = useState<boolean>(false);
    const [answers, setAnswers] = useState<string[]>([]);
    const [answerResult, setAnswerResult] = useState<any>([])
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token
    const userData = JSON.parse(window.localStorage.getItem('authtoken') as string).user;

    const toggleImageVisibility = (index: number) => {
        setVisibleImages(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };


    const getQuestions = async () => {

        const marks = 0;
        const response = await axios.get(`${API_BASE_URL}/mongo_questions?category=${unitName}&marks=${marks}&limit=${quantity}&op=${op}`)

        setQuestions(response.data.map((res: any) => {
            const maxMark = res.max_marks_final || 'N/A';
            const markSchemes = res.scheme_final || 'N/A'

            return {
                question_number: res.question_number,
                question_letter: res.question_letter,
                image_filename: res.image_filename,
                question: res.question,
                markSchemes,
                maxMark,
                file_info: res.file_info,
                category: res.category,
                pdf_url: res.pdf_url,
                max_marks: res.max_marks,
                correct_answer: res.correct_answer,
            };
        }));

    }

    useEffect(() => {
        getQuestions();
    }, []);


    const handleShowMarkScheme = () => {
        setShowMarkScheme(!showMarkScheme);
    };

    const handleTestAgain = () => {
        setIsComplete(false);
        setAnswers([]);
        setShowMarkScheme(false);
        setAnswerResult([]);
    }

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleMarkAnswers = async () => {
        if(loading)
            return;
        try {
            const questionsWithAnswers = questions.map((question: any, index: number) => {
                const userAnswer = answers[index] || "";
                const correctAnswers = question.markSchemes || [];

                const normalizeAnswer = (answer: any): string => {
                    if (typeof answer === 'string') {
                        return answer.toLowerCase().trim();
                    }
                    return '';
                };

                const normalizedCorrectAnswers = correctAnswers.map(normalizeAnswer);
                const normalizedUserAnswer = normalizeAnswer(userAnswer);

                const isCorrect = normalizedCorrectAnswers.includes(normalizedUserAnswer);
                const userScore = isCorrect ? question.maxMark : 0;

                return {
                    ...question,
                    answer: userAnswer,
                    correctAnswers,
                    isCorrect,
                    userScore,
                };
            });

            const examData = {
                subject: subject,
                unit: unit,
                user_id: userData.id,
            }

            setLoading(true);

            const feedbacksResponse = await axios.post(`${API_BASE_URL}/exam/generate_feedbacks_v3`, { questionsWithAnswers, examData }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const totalScore = feedbacksResponse.data.reduce((sum: any, item: any) => sum + item.score, 0);
            const averageScore = feedbacksResponse.data.length > 0 ? totalScore / feedbacksResponse.data.length : 0;
            const userDatas =  JSON.parse(localStorage.getItem("authtoken") as string);
            const scoreValues = parseInt(userDatas?.user?.scores) + (averageScore);
            const scoreValue = (scoreValues);
            await axios.patch(`${API_BASE_URL}/users/updateScores`, { score: scoreValue, userId: userDatas?.user?.id }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                setAnswerResult(feedbacksResponse.data);
                setIsComplete(true);
                setLoading(false);
                localStorage.setItem('authtoken', JSON.stringify({ ...JSON.parse(localStorage.getItem('authtoken') as string), user: { ...JSON.parse(localStorage.getItem('authtoken') as string).user, scores: scoreValue } }));
                EventBus.emit('scoresUpdated', scoreValue);
            })
        } catch (error) {
            console.log(error)
            swal("Oops!", "Something went wrong on AI response!", "warning");
            setLoading(false);
        }
    };


    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto relative" >
            <div className="flex items-center justify-between">
                <Button
                    onClick={onBack}
                    variant="outline"
                    className="text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/10 inline-flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Form
                </Button>
                <div className="flex flex-row gap-8">
                    <div className="flex gap-4 flex-row">
                        {isComplete && (
                            <>
                                <button
                                    onClick={handleTestAgain}
                                    className="py-2 px-4 text-emerald-300 bg-emerald-500/50 border-emerald-500/30 border-[1px] shadow-md rounded-md hover:bg-emerald-500/80"
                                >
                                    Test Again
                                </button>
                                <button
                                    onClick={handleShowMarkScheme}
                                    className="py-2 px-4 text-emerald-300 bg-emerald-500/20 border-emerald-500/30 border-[1px] hover:bg-emerald-500/50 rounded-md"
                                >
                                    Show Mark Scheme
                                </button>
                            </>
                        ) }
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-medium text-emerald-300">{questions.length} Questions</h2>
                        <p className="text-slate-400 text-sm">Custom Generated Exam</p>
                    </div>
                </div>
            </div>

            {questions.map((q: any, index: any) => (
                <Card key={q.id} className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <span className="text-emerald-400 font-mono text-xl font-bold">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="space-y-6 flex-1">
                                <p className="text-white text-lg leading-relaxed">
                                    {q.question}

                                    {q.image_filename?.length > 0 && (
                                        <button onClick={() => toggleImageVisibility(index)} className="text-blue-500 underline">
                                            {/* {visibleImages[index] ? 'Hide Image' : 'View Image'} */}
                                        </button>
                                    )}
                                    {q.pdf_url != null && (

                                        <div className="flex justify-end items-center mt-4">
                                            <button
                                                onClick={() => window.open(`${q.pdf_url}#page=${q.question_number}`, '_blank')}
                                                className="px-4 py-2 bg-primary text-white shadow-md rounded-md 
                                  hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                                            >
                                                View PDF for this question
                                            </button>
                                        </div>

                                    )}

                                </p>
                                {showMarkScheme && (
                                    <>
                                        {q.markSchemes && (
                                            <p>
                                                <strong>Mark Scheme:</strong>{' '}
                                                {Array.isArray(q.markSchemes) ? q.markSchemes.join(' | ') : q.markSchemes || 'N/A'}
                                            </p>
                                        )}
                                    </>
                                )}
                                <div className="pt-6 border-t border-emerald-500/20">
                                    {
                                        isComplete ? (
                                            <div className='flex flex-col gap-6'>
                                                <p className="text-emerald-300 font-mono">
                                                    <span className="text-sm text-slate-400 uppercase tracking-wider">Score: </span>
                                                    {answerResult[index]?.score}
                                                </p>

                                                <p className="text-emerald-300 font-mono">
                                                    <span className="text-sm text-slate-400 uppercase tracking-wider">Feedback: </span>
                                                    {answerResult[index]?.feedback}
                                                </p>
                                            </div>

                                        ) : (
                                            <p className="text-emerald-300 font-mono flex flex-row gap-4">
                                                <span className="text-sm text-slate-400 uppercase tracking-wider">Answer: </span>
                                                <Textarea
                                                    value={answers[index] || ''}

                                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                    placeholder="Enter your answer here..."
                                                    className='w-[90%] h-[30px] px-3 focus:border-0 border-0 focus-visible:border-none'
                                                />
                                            </p>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            {
                !isComplete && (
                    <div className="flex relative pb-20">
                        <button
                            onClick={handleMarkAnswers}
                            className=" justify-center py-3 px-5 text-emerald-300 bg-emerald-500/20 border-emerald-500/30 border-[1px] hover:bg-emerald-500/50 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 absolute right-0"
                            disabled={loading}
                        >
                            Mark My Answers
                        </button>
                    </div>
                )
            }
            {/* {loading && (
                <div className='loader-overlay'><PacmanLoader size={18} color='#ffffff' className="sticky top-0" /></div>
            )} */}
        </div>
    );
}