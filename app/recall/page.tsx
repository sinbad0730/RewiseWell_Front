"use client";
import React, {useEffect, useState} from "react";
import WithAuth from "../../components/Layout/WithLayout";
import axios from "axios";
import {API_BASE_URL} from "@/utils/axios";
import useUserActivity from "../../hooks/useUserActivity";
import {FormProps, Modal, Button, Form, Input} from "antd";
import SpeechToText from "../../components/SpeechToText";
import TextToSpeech from "../../components/TextToSpeech";
import {PacmanLoader} from "react-spinners";
import {Card} from "../challenge/component/card";
import ChatWindow from "./components/chatwindow";
import ChatInput from "./components/chatInput";
import { union } from "zod";
import { get } from "http";
import { Label } from "../challenge/component/label";
const ActiveRecall: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number>(-1);
    const [selectedDetail, setSelectedDetail] = useState<number>(-1);
    const [showMarkScheme, setShowMarkScheme] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");
    const [showInstructions, setShowInstructions] = useState<boolean>(false); // State for showing instructions modal
    const [questionLimit, setQuestionLimit] = useState<number | null>(null); // State for question limit
    const [answerResult, setAnswerResult] = useState<any>([]);
    const [subjects, setSubjects]: any = useState([]);
    const [units, setUnits]: any = useState([]);
    const token = JSON.parse(
        localStorage.getItem("authtoken") as string
    ).access_token;
    const userId = JSON.parse(localStorage.getItem("authtoken") as string).user
    .id;
    const [messages, setMessages] = useState<string[]>([]);
    const [showHelp, setShowHelp] = useState(false);
    const [showKeyTerm, setShowKeyTerm] = useState(false);
    const [keyterms, setKeyterms] = useState("");
    const [loading, setLoading] = useState(false);
    const [unitName, setUnitName] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [unitDetail, setUnitDetail] = useState<{ unitName: string; subjectName: string } | null>(null);

    const [submits , setSubmits] = useState(false);
    // const [studyPath, setStudyPath] = useState<"weakness" | "specific" | null>(null);
    const {TextArea} = Input;
    const [weakUnits, setWeakUnits] = useState<any[]>([]);
    const [loadingWeakUnits, setLoadingWeakUnits] = useState<boolean>(false);
    

    type FieldType = {
        keyterm?: string;
    };

    useUserActivity();
    useEffect(() => {
        getSubjects();
    }, []);
    useEffect(() => {
        getQuestions();
        setAnswer("");
        setShowMarkScheme(false);
    }, [selectedDetail, questionLimit]);

    useEffect(() => {
        if (answer.length > 600) {
            setAnswer(answer.slice(0, 600));
        }
    }, [answer]);
    const getQuestions = async () => {
        const unit = units?.filter(
            (item: any) => item.unit_id == selectedDetail
        ) as {unit_id: number; unit_name: string}[];
        const category =
            selectedCategory !== -1 &&
            selectedDetail !== -1 &&
            unit[0]?.unit_name;
        const marks = 0;
        const limit = questionLimit === null ? 0 : questionLimit;
        const response = await axios.get(
            `${API_BASE_URL}/mongo_questions?category=${category}&marks=${marks}&limit=${limit}`
        );
    };

    const getActiveRecallFeedback = async (unitId: any) => {   
        await axios.get(`${API_BASE_URL}/recall/get_recall_answers`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                subjectId: selectedCategory,
                unitId: unitId,
                userId: userId
            }
        }).then(async (res) => {
            setAnswerResult(res.data);
            setMessages(Array.isArray(res.data.messages) ? res.data.messages : []);
        }).catch((err) => {
            console.log("Error getting recall feedback", err);
        });
    };
    
    const getSubjects = async () => {
        await axios
            .get(`${API_BASE_URL}/grade-retrieval/get_all_subject`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(async (res) => {
                setSubjects(res.data);
            })
            .catch((e) => {});
    };

    const getUnits = async (id: number) => {
        await axios
            .get(`${API_BASE_URL}/grade-retrieval/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUnits(res.data);
            })
            .catch((e) => {});
    };

    const getUnitAndSubjectNames = async (unitId: number, subjectId: number) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/grade-retrieval/get_unit_and_subject_names/${unitId}/${subjectId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            return response.data;
        } catch (error) {
            console.error("Error fetching unit and subject name:", error);
            return null;
        }
    };

    // const handleCategoryChange = async (
    //     e: React.ChangeEvent<HTMLSelectElement>
    // ) => {
    //     setSelectedCategory(Number(e.target.value));
    //     await getUnits(Number(e.target.value));
    //     setSelectedDetail(-1); // Reset detail selection when category changes
    //     setQuestionLimit(null); // Reset question limit when category changes
    // };

    // const handleDetailChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const unitId = Number(e.target.value);
    

    //     await getActiveRecallFeedback(unitId);
    
    //     setSelectedDetail(unitId);
        

    //     const unitName = units.filter((unit: any) => unit.unit_id === unitId)[0]?.unit_name;
    //     setUnitName(unitName);

    // };


    // const handleAnswerChange = (value: string) => {
    //     setAnswer(value);
    // };

    useEffect(() => {
        if(submits){
            setSubmits(false);
            submitAnswer();
        }
    }, [submits])
    const submitAnswer = async () => {
        try {
            setLoading(true);
           
            await axios
                .post(
                    `${API_BASE_URL}/recall/generate_recall_feedback_v3`,
                    {
                        question: messages,
                        answer: '',
                        subjectId: selectedCategory,
                        unitId: selectedDetail,
                        userId: userId,
                        unitName: unitDetail?.unitName,
                        subjectName: unitDetail?.subjectName,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(async (res: any) => {
                    setMessages(prevMessages => [...prevMessages]);
                    await getActiveRecallFeedback(selectedDetail);
                    setLoading(false);
                });
        } catch (error: any) {
            console.log("error", error);

            setLoading(false);
        }
    };

    const handleTranscriptChange = (transcript: string) => {
        setAnswer((prev) => prev + transcript);
    };

    const handleKeyTerm = () => {
        setShowKeyTerm(true);
    };

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
        if (values?.keyterm) {
            setKeyterms(values.keyterm);
        }
        setShowKeyTerm(false);
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    const getLastThreeScores = (scores: any[]): number[] => {
        if (typeof scores[0] === 'number') {
            return scores.slice(-3);
        }
    
        return scores
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
            .map((score) => score.value || 0);
    };
    
    const getExamScore = async (subjectId: number): Promise<any[]> => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/exam/get_exam_score/${userId}/${subjectId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            const data = response.data.filter(
                (item: any) =>
                    item.subject_id === Number(subjectId) && item.student_id === Number(userId)
            );
    
            if (data.length === 0) {
                console.warn(`No notes found for the topic ${subjectId}`);
                return [];
            }
    
   
            const unitScoresMap: { [key: string]: number[] } = {};
            data.forEach((item: any) => {
                if (!unitScoresMap[item.unit_id]) {
                    unitScoresMap[item.unit_id] = [];
                }
                unitScoresMap[item.unit_id].push(item.score);
            });
    
            const scores = await Promise.all(
                Object.entries(unitScoresMap).map(async ([unitId, scores]) => {
                    const lastThreeScores = getLastThreeScores(scores);
    
                    const averageScore = Math.ceil(
                        lastThreeScores.reduce((acc: number, score: number) => acc + score, 0) /
                        lastThreeScores.length
                    );

   
                    const { unitName, subjectName } = await getUnitAndSubjectNames(
                        Number(unitId),
                        subjectId
                    );
                    return {
                        subjectName: subjectName || "Unknown Subject",
                        unitName: unitName || "Unknown Unit",
                        averageScore: Math.trunc(averageScore),
                        unitId: String(unitId),
                    };
                })
            );
    
            return scores;
        } catch (error) {
            console.error("Error retrieving exam grades: ", error);
            return [];
        }
    };

    const getWeakUnits = async () => {
        setLoadingWeakUnits(true);
        const allWeakUnits: any[] = [];
        try {
            for (const subject of subjects) {
 
                const subjectScores = await getExamScore(subject.subject_id);

            

                const weakUnitsForSubject = subjectScores.filter(
                    (score) => score.averageScore < 70
                );
            
                allWeakUnits.push(...weakUnitsForSubject);
            }
        

            setWeakUnits(
                allWeakUnits.sort((a, b) => a.averageScore - b.averageScore)
            );
        } catch (error) {
            console.error("Error searching for weak units:", error);
        } finally {
            setLoadingWeakUnits(false);
        }
    };

    useEffect(() => {
    if (subjects.length > 0) {
        getWeakUnits();
    }
    }, [subjects]);

    const handleStudy = async (subjectName: string, unitName: string, unitId: string) => {
        try {
            setUnitDetail({ unitName, subjectName });
            setSelectedDetail(Number(unitId));
            setSelectedCategory(Number(unitId));
    

            await new Promise((resolve) => setTimeout(resolve, 50));
    

            // await getActiveRecallFeedback(unitId);
    

            setTimeout(() => {
                const chatSection = document.getElementById("chat-section");
                if (chatSection) {
                    chatSection.scrollIntoView({ behavior: "smooth" });
                } else {
                    console.warn("Chat section not found in DOM.");
                }
            }, 150);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    useEffect(() => {
        if (selectedDetail !== -1) {
            getActiveRecallFeedback(selectedDetail);
        }
    }, [selectedDetail]);
    

    return (
        <>
            <div className="flex flex-col  items-center min-h-screen bg-background p-10">
                <Modal
                    open={showHelp}
                    onCancel={() => setShowHelp(false)}
                    footer={null}
                >
                    <div className="tutorial-overlay rounded-md p-5">
                        <div className="tutorial-content space-y-2">
                            <h2 className="text-xl text-center text-white">
                                Active Recall
                            </h2>
                            <iframe
                                className="w-full h-[315px]"
                                src="https://www.youtube.com/embed/ih490oNctRU"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="flex justify-end">
                                <button
                                    id="help"
                                    className="py-2 px-4 dark:bg-blue-700 dark:text-white"
                                    onClick={() => setShowHelp(false)}
                                >
                                    Got It!
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                
                    open={showKeyTerm}
                    onCancel={() => setShowKeyTerm(false)}
                    footer={null}
                >
                    <div className="tutorial-overlay rounded-md p-5">
                        <div className="tutorial-content space-y-2 ">
                            <Form
                                name="KeyTerm"
                                initialValues={{remember: true}}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                className="flex flex-col gap-2 relative mt-6"
                            >
                                <Form.Item<FieldType>
                                    label="Enter a key term or topic you want to start with:"
                                    name="keyterm"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your KeyTerms!",
                                        },
                                    ]}
                                >
                                    <TextArea className="h-7 rounded pl-3" />
                                </Form.Item>
                                <Form.Item label={null}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="absolute bottom-0 right-0"
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-bold text-primary">
                        Active Recall
                    </h1>
                    <button
                        id="help"
                        className="ml-2 px-[10px] rounded-full text-lg dark:bg-blue-700 dark:text-white"
                        onClick={() => setShowHelp(true)}
                    >
                        ?
                    </button>
                </div>
                {/* {studyPath === null && (
                    <div className="flex flex-col items-center mt-10 space-y-4">
                        <h2 className="text-2xl font-semibold text-center dark:text-white">
                            How would you like to study?
                        </h2>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-[300px]"
                            onClick={() => setStudyPath("weakness")}
                        >
                            Study your weakest topics
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded w-[300px]"
                            onClick={() => setStudyPath("specific")}
                        >
                            Study a specific topic
                        </button>
                    </div>
                )}
                {studyPath === "specific" && (
                    <div className="flex flex-col items-center mt-10 space-y-4">
                    <h2 className="text-2xl font-semibold dark:text-white">
                        test specific
                    </h2>
                </div>
                )} */}

                    {/* Old script */}
                {/* <div className="dropdowns flex items-center flex max-[750px]:flex-col gap-2 mt-10 border-[1px] rounded-md">
                    <div className=" p-2 flex items-center flex-wrap  bg-[#00000000]">
                        <select
                            className="mx-5 my-4 px-3 py-2 border  rounded-md shadow-sm text-gray-900 sm:text-sm dark:bg-blue-900 dark:text-white w-[300px] max-[700px]:text-sm max-[815px]:w-[75vw]"
                            onChange={handleCategoryChange}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a subject
                            </option>
                            {subjects.map((item: any) => (
                                <option
                                    value={item.subject_id}
                                    key={item.subject_id}
                                >
                                    {item.subject_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {units.length > 0 && (
                        <div className=" p-2 flex items-center flex-wrap  bg-[#00000000]">
                            <select
                                className="mx-5 my-4 px-3 py-2 border  rounded-md shadow-sm text-gray-900 sm:text-sm dark:bg-blue-900 dark:text-white w-[300px] max-[700px]:text-sm max-[815px]:w-[75vw]"
                                onChange={handleDetailChange}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select a unit
                                </option>
                                {units.map((unit: any, index: number) => (
                                    <option
                                        key={"unit" + index}
                                        value={unit.unit_id}
                                    >
                                        {unit.unit_name}
                                    </option>
                                ))}
                            </select>
                            {units.length > 0 && selectedDetail !== -1 && (
                                <button
                                    className="dark:bg-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded mr-4"
                                    onClick={handleKeyTerm}
                                >
                                    Start here
                                </button>
                            )}
                        </div>
                    )}
                </div> */}



                {/* {studyPath === "weakness" && (
                    <div className="flex flex-col items-center mt-10 space-y-4">
                        <h2 className="text-2xl font-semibold dark:text-white">
                            test weakness
                        </h2>
                    </div>
                )} */}
                <Card className=" mx-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl p-10 mt-10">
                    <Label className="text-lg font-medium text-emerald-300 mt-8 mx-auto">
                        Performance on Weak Topics
                    </Label>
                    {loadingWeakUnits ? (
                        <p className="text-center text-gray-300 mt-4">
                            Loading performance...
                        </p>
                    ) : weakUnits.length > 0 ? (
                        <table className="table-auto w-full mt-4 text-left border-collapse  rounded-md border border-[#232F40]">
                            <thead>
                                <tr className="bg-[#232F40] rounded-md" >
                                    <th className="border border-[#232F40] px-4 py-2 text-[#F070B3]">Subject</th>
                                    <th className="border border-[#232F40] px-4 py-2 text-[#F070B3]">Unit</th>
                                    <th className="border border-[#232F40] px-4 py-2 text-[#F070B3]">Average (%)</th>
                                    <th className="border border-[#232F40] px-4 py-2"></th> {/* Extra column for button */}
                                </tr>
                            </thead>
                            <tbody className="rounded-md">
                                {weakUnits.map((unit, index) => (
                                    <tr
                                        key={index}
                                        // className={`${
                                        //     unit.averageScore < 50 ? "bg-red-300" : "bg-yellow-300"
                                        // } hover:bg-opacity-80 transition-all duration-200`}
                                    >
                                        <td className="border border-[#232F40] px-4 py-2 text-white">{unit.subjectName}</td>
                                        <td className="border border-[#232F40] px-4 py-2 text-white">{unit.unitName}</td>
                                        <td className="border border-[#232F40] px-4 py-2 text-white">{unit.averageScore}%</td>
                                        <td className="border border-[#232F40] px-4 py-2">
                                        <button 
                                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none"
                                            onClick={() => handleStudy(unit.subjectName, unit.unitName, unit.unitId)}
                                            disabled={selectedDetail === unit.unitId}
                                        >
                                            Study
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-300 mt-4">
                            Congratulations! No weak topics found.
                        </p>
                    )}
                </Card>


            {selectedDetail !== -1 && (
                <div
                    id="chat-section"
                    className="mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full rounded-lg"
                >
                    <Card className="h-[calc(100vh-12rem)] bg-black border-green-700/30">
                        <ChatWindow answerResult={answerResult} isLoading={false} />
                        <ChatInput
                            userId={userId}
                            keyterms={keyterms}
                            unitName={unitDetail?.unitName}
                            setMessages={setMessages}
                            messages={messages}
                            setSubmits={setSubmits}
                        />
                    </Card>
                </div>
            )}
            </div>
            {loading && (
                <div className="loader-overlay">
                    <PacmanLoader size={18} color="#dark:bg-blue-900" />
                </div>
            )}
            {!loading && (
                <div>
                    <h1>Flashcard incorrectList</h1>
                </div>
            )}

        </>
    );
};

export default WithAuth(ActiveRecall);
