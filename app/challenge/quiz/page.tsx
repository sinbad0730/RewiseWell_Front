"use client";
import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CloseCircle } from "iconsax-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { PacmanLoader } from 'react-spinners'

const Quiz = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [timer, setTimer] = useState(180);
    const [loading, setLoading] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: string]: string;
    }>({});
    const [questions, setQuestions] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [resultScore, setResultScore] = useState('0');
    const [answer, setAnswer] = useState('');



    const router = useRouter();

    const fetchQuestion = async () => {
        const response = await axios.get(`${API_BASE_URL}/mongo_questions?category=${'Data Representation'}&marks=0&limit=5`)
        console.log(response);
        setQuestions(response.data);
    }
    // Handle timer
    useEffect(() => {
        fetchQuestion();
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 0) {
                    clearInterval(interval);
                    setShowResult(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Show error message
    const showError = (message: string) => {
        const errorDiv = document.createElement("div");
        errorDiv.className = "reveal alert alert-danger";
        errorDiv.textContent = message;
        const errorContainer = document.getElementById("error");
        if (errorContainer) {
            errorContainer.appendChild(errorDiv);
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }
    };

    // Handle next step
    const handleNext = (stepNumber: number) => {
        if (answer === "") {
            showError("Enter your answer!");
            return;
        }
        setSelectedAnswers((prev) => ({
            ...prev,
            [`step${stepNumber}`]: answer,
        }));

        setTimeout(async () => {
            if (stepNumber === 5) {
                await handleResult();
            } else {
                setCurrentStep((prev) => Math.min(prev + 1, 5));
                setAnswer('');
            }
        }, 900);
    };

    const handleResult = async () => {
        const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token
        const answerList = Object.values(selectedAnswers);
        answerList.push(answer);
        questions.forEach((question: any, index: any) => {
            question.answer = answerList[index] || null; // Assign answer or null if no corresponding answer
        });
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/challenge/feedback`, { questions }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setResultScore(response.data);
            setLoading(false);
            setShowResult(true);
        } catch (e) {
            setLoading(false);
            showError("There is a Problem with Marking...");
            return;
        }
    }
    // Handle previous step
    const handlePrev = () => {
        if (currentStep > 1) {
            const currentFields = document.querySelectorAll(
                `#step${currentStep} .radio-field`
            );
            currentFields.forEach((field) => {
                field.classList.add("bounce-left");
                field.classList.remove("bounce-right");
            });

            setTimeout(() => {
                setCurrentStep((prev) => prev - 1);
            }, 900);
        }
    };

    const handleTextarea = (e: any) => {
        setAnswer(e.target.value);
    }

    const handleClose = () => {
        router.push('/challenge');
    }
    if (showResult) {
        return (
            <div className="mains">
                <div>
                    <button className="absolute top-6 left-6 text-white hover:text-[#8d8d8d]" onClick={handleClose}><CloseCircle className="w-[40px] h-[40px]" /></button>
                </div>
                <div className="timer">
                    <h2>
                        <span id="countdown-timer">{timer}</span>sec
                    </h2>
                </div>

                <div id="error" className="error-container"></div>

                <div className="step-bar">
                    <div
                        className="fill"
                        style={{ width: `${currentStep * 20}%` }}
                    ></div>
                </div>
                <section className="steps bg-white mt-[50px] mx-[50px] rounded-t-lg">
                    <h2 className="text-center text-[#9600ba] font-bold text-[35px]  my-[45px] mt-[30px]">Your Score</h2>
                    <div className="results">
                        {
                            parseInt(resultScore) < 30 ? (
                                <div className="text-center text-[#FF6692] font-bold text-[65px] text-center ">
                                    {resultScore} <span className="text-[50px]"> Points</span>

                                    <div className="avatar !mt-[30px]">
                                        <img src="/quiz/monkey.png" alt="avatar" />
                                    </div>
                                </div>
                            ) : parseInt(resultScore) < 80 ? (
                                <div className="text-center text-[#FFB900] font-bold text-[65px] text-center ">
                                    {resultScore}<span className="text-[50px]"> Points</span>
                                    <div className="avatar !mt-[30px]">
                                        <img src="/quiz/monkey.png" alt="avatar" />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text#00ceb6] font-bold text-[65px] text-center ">
                                    {resultScore} <span className="text-[50px]"> Points</span>
                                    <div className="avatar !mt-[30px]">
                                        <img src="/quiz/monkey.png" alt="avatar" />
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className="next-prev flex justify-end">
                        <button
                            type="button"
                            className={"next"}
                            onClick={handleClose}
                        >
                            <span className="flex flex-row justify-center gap-2 items-center">Go to Home
                                {currentStep < 6 && (
                                    <ArrowRight />
                                )}
                            </span>
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <>
            <div className="mains relative">

                <div className="timer">
                    <h2>
                        <span id="countdown-timer">{timer}</span>sec
                    </h2>
                </div>

                <div id="error" className="error-container"></div>

                <div className="step-bar">
                    <div
                        className="fill"
                        style={{ width: `${currentStep * 20}%` }}
                    ></div>
                </div>

                <section className="steps bg-white mt-[150px] mx-[50px] rounded-t-lg">
                    {questions?.map((question: any, index: any) => (
                        <fieldset
                            key={index + 1}
                            id={`step${index + 1}`}
                            style={{
                                display:
                                    currentStep === index + 1 ? "block" : "none",
                            }}
                        >
                            <div className="move">
                                <div className="avatar">
                                    <img src="/quiz/monkey.png" alt="avatar" />
                                </div>
                                <h3 className="step-count text-center pt-[30px] text-[20px]">
                                    Question{" "}
                                    <span id="activeStep">{index + 1}</span>/5
                                </h3>
                            </div>
                            <div className="flex flex-row my-[45px] mt-[-30px] justify-evenly">
                                <h3 className="text-[#9600ba] font-bold text-[30px] text-center  leading-snug">
                                    {question?.question}
                                </h3>
                                <div className="content-center">
                                    {question?.pdf_url != null && (
                                        <div className="flex justify-end items-center">
                                            <button
                                                onClick={() => window.open(`${question?.pdf_url}#page=${question?.question_number}`, '_blank')}
                                                className="px-4 py-2 bg-purple-700 text-white shadow-md rounded-md 
                                        hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                                            >
                                                View PDF for this question
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="radio-fields grid grid-cols-1">
                                <textarea className="" rows={6} onChange={(e) => handleTextarea(e)} />
                            </div>
                        </fieldset>
                    ))}

                    <div className={`next-prev flex ${currentStep === 1 ? "justify-end" : 'justify-between'} `}>
                        {currentStep > 1 && (
                            <button
                                type="button"
                                className="prev"
                                onClick={handlePrev}
                            >
                                <span className="flex flex-row justify-center gap-2 items-center"><ArrowLeft /> previous question</span>
                            </button>
                        )}
                        <button
                            type="button"
                            className={"next"}
                            onClick={() => handleNext(currentStep)}
                        >
                            <span className="flex flex-row justify-center gap-2 items-center">{currentStep === 5 ? "Submit" : "Next question"}
                                {currentStep < 6 && (
                                    <ArrowRight />
                                )}
                            </span>
                        </button>
                    </div>
                </section>
            </div>
            {loading && (
                <div className='loader-overlay'><PacmanLoader size={18} color='#ffffff' /></div>
            )}
        </>
    );
};

export default Quiz;
