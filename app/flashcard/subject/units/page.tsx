"use client";
import { Card } from "../../../challenge/component/card";
import { Button } from "../../../challenge/component/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Plus, Minus, ArrowLeft, ArrowRight, HelpCircle, BookOpen, List } from "lucide-react";
import { useEffect, useState } from "react";
import WithAuth from "@/components/Layout/WithLayout";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";

import swal from 'sweetalert';
import { PacmanLoader } from 'react-spinners'
import { boolean } from "zod";
import IncorrectList from "../../../../components/IncorrectList";

interface Flashcard {
  term: string;
  definition: string;
}

interface IncorrectListType {
  userId: string;
  subjectId: string;
  unitId: string;
  terms: Flashcard[];
  createdAt: string;
}

const Units = () => {
  const searchParams = useSearchParams();
  const unitId = searchParams.get('id');


  const topic = '';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [responses, setResponses] = useState<{ question: string; isCorrect: boolean }[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<{ term: string; definition: string }[]>([]);
  const [flashData, setFlashData] = useState<Flashcard[]>([]);
  const [timeoutActive, setTimeoutActive] = useState(false); // State to track timeout
  const [showAnswer, setShowAnswer] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const totalQuestions = flashData.length;
  const isLastCard = totalQuestions > 0 && currentIndex === totalQuestions - 1;
  const [loading, setLoading] = useState(false);
  const [screens, setScreens] = useState(false);
  const [incorrectList, setIncorrectList] = useState([]);
  

  const handleScore = (isCorrect: boolean) => {
    if (scores.incorrect + scores.correct === flashData.length)
      return;

    if (timeoutActive) return;

    if (responses?.length > 0) {
      const questionExists = responses.some(response => response.question === flashData[currentIndex].term);
      if (questionExists) {
        swal("Warning!", "You already answered!", "warning");
        return; // If the question exists, return early
      }
    }
    setResponses((prevResponses) => [
      ...prevResponses,
      { question: flashData[currentIndex].term, isCorrect }
    ]);

    if (scores.incorrect === 0 && scores.correct === 0) {
      setIncorrectWords([]);
    }
    if(!isCorrect){
      setIncorrectWords((prevWords) => [...prevWords, { term: flashData[currentIndex].term, definition: flashData[currentIndex].definition }]);
    }
    setScores(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }));

    handleNavigation('next');
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentIndex === 0) return; // Prevent moving to previous card if it's the first card
      if (timeoutActive) return; // Prevent moving to previous card if timeout is active
      setShowAnswer(false);
      setCurrentIndex((prevCard) => (flashData.length > 0 ? (prevCard - 1) % flashData.length : 0));
    } else {
      if (scores.correct + scores.incorrect === flashData.length)
        return;
      if (timeoutActive) return; // Prevent moving to next card if timeout is active
      setShowAnswer(false);
      setCurrentIndex((prevCard) => (flashData.length > 0 ? (prevCard + 1) % flashData.length : 0));
      if (isLastCard) {
        // Set timeout when reaching the last card
        setTimeoutActive(true);
        setTimeout(() => {
          setTimeoutActive(false);
        }, 5000); // Disable interaction after 5 seconds (adjust as needed)
      }
    }
  };

  const data = [
    { name: "Correct", value: scores.correct },
    { name: "Incorrect", value: scores.incorrect }
  ];

  const handleToggleAnswer = () => {
    setShowAnswer((prevShow) => !prevShow);
  };

  const COLORS = ["#22c55e", "#ef4444"];


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('authtoken') as string)?.access_token;
    axios.get(`${API_BASE_URL}/mongo_flashcards?topic=${''}&unit=${unitId}&limit=100`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then((res) => {
      setFlashData(res.data);
    });
  }, []);

  const handleAgain = () => {
    if (incorrectWords.length > 0) {

      const filteredData = flashData.filter(data => incorrectWords.some(word => word.term === data.term));
      setFlashData(filteredData);
      setResponses([]);
      scores.correct = 0;
      scores.incorrect = 0;
      setTimeoutActive(false);
      setCurrentIndex(0);
      setIncorrectWords([]);
      setSaveButtonDisabled(false);
    } else {
      alert("There is nothing incorrect word");
    }
  }

  const saveData = async () => {
    console.log(incorrectWords)
    if (incorrectWords.length > 0) {
      const token = JSON.parse(localStorage.getItem('authtoken') as string)?.access_token;
    const userData = JSON.parse(localStorage.getItem('authtoken') as string).user;
      try {
        setLoading(true);
        const data = await axios.post(`${API_BASE_URL}/mongo_flashcards/save_incorrectlist`, {
          subjectId : '1',
          terms: incorrectWords,
          userId: userData.id,
          unitId: unitId
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setLoading(false);
        if (data) {
          setSaveButtonDisabled(true);
          setNotification({ message: 'Saved successfully', type: 'success' });
          setTimeout(() => setNotification({ message: '', type: null }), 3000);
        }
      } catch (error) {
        setLoading(false);
        setNotification({ message: 'Failed to save', type: 'error' });
        setTimeout(() => setNotification({ message: '', type: null }), 3000);
      }
    } else {
      setNotification({ message: 'There are no incorrect words', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: null }), 3000);
    }
  }

  

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('authtoken') as string)?.access_token;
    const userData = JSON.parse(localStorage.getItem('authtoken') as string).user;
    axios.get(`${API_BASE_URL}/mongo_flashcards/get_incorrectlist?userId=${userData.id}&subjectId=${1}&unitId=${unitId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then((res) => {
      setIncorrectList(res.data);
    });
  }, []);

  useEffect(() => {
    setScreens(true);
  }, []);

  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#070D0A' }}>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#03A678' }}>Flashcards</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setScreens(false)}
              variant={!screens ? "default" : "outline"}
              className="flex items-center gap-2"
              style={{
                backgroundColor: !screens ? '#03A678' : 'transparent',
                color: !screens ? 'white' : '#03A678',
                borderColor: '#03A678'
              }}
            >
              <BookOpen className="h-5 w-5" />
              Study Cards
            </Button>
            <Button
              onClick={() => {
                setScreens(true);
                console.log('Switching to incorrect list view. Current list:', incorrectList);
              }}
              variant={screens ? "default" : "outline"}
              className="flex items-center gap-2"
              style={{
                backgroundColor: screens ? '#03A678' : 'transparent',
                color: screens ? 'white' : '#03A678',
                borderColor: '#03A678'
              }}
            >
              <List className="h-5 w-5" />
              Incorrect List
            </Button>
          </div>
        </div>

        {screens ? (
          <div>
            {/* <pre>{JSON.stringify({ hasIncorrectList: !!incorrectList, length: incorrectList?.length }, null, 2)}</pre> */}
            <IncorrectList incorrectList={incorrectList || []} />
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground mb-8" style={{ color: '#48D97A' }}>
              Term {currentIndex + 1} of {flashData.length}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 shadow-lg border-2" style={{ borderColor: '#0E5936', backgroundColor: '#070D0A' }}>
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-3" style={{ color: '#03A678' }}>Term</h2>
                      <p className="text-2xl font-medium text-white">{flashData[currentIndex]?.term}</p>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-3" style={{ color: '#03A678' }}>Definition</h2>
                      {showAnswer && (
                        <p className="text-lg leading-relaxed" style={{ color: '#48D97A' }}>
                          {flashData[currentIndex]?.definition}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: '#0E5936' }}>
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 transition-colors"
                          onClick={() => handleScore(true)}
                          style={{ borderColor: '#48D97A', color: '#48D97A' }}
                        >
                          <Plus className="h-5 w-5" />
                          Correct
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 transition-colors"
                          onClick={() => handleScore(false)}
                          style={{ borderColor: '#177337', color: '#177337' }}
                        >
                          <Minus className="h-5 w-5" />
                          Incorrect
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 transition-colors"
                          onClick={handleToggleAnswer}
                          style={{ borderColor: '#03A678', color: '#03A678' }}
                        >
                          <HelpCircle className="h-5 w-5" />
                          Show Answer
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleNavigation('prev')}
                          style={{ color: '#03A678' }}
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleNavigation('next')}
                          style={{ color: '#03A678' }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-4">
                  <Button
                    className="w-full"
                    onClick={saveData}
                    disabled={saveButtonDisabled}
                    style={{ backgroundColor: '#03A678', color: 'white' }}
                  >
                    Save Progress
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full"
                    style={{ backgroundColor: '#0E5936', color: 'white' }}
                  >
                    Test Knowledge
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleAgain}
                    style={{ borderColor: '#177337', color: '#177337' }}
                  >
                    Try Again
                  </Button>
                </div>
              </div>

              <div className="rounded-lg p-6 shadow-lg border"
                style={{ backgroundColor: '#070D0A', borderColor: '#0E5936' }}>
                <h2 className="text-xl font-semibold mb-6 text-center" style={{ color: '#03A678' }}>Progress</h2>
                <div className="aspect-square relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold" style={{ color: '#48D97A' }}>
                      {((scores.correct / (scores.correct + scores.incorrect || 1)) * 100).toFixed(0)}%
                    </p>
                    <p className="text-sm" style={{ color: '#177337' }}>Accuracy</p>
                  </div>
                </div>

                <div className="flex justify-around mt-8">
                  <div className="text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#48D97A' }} />
                      <span className="font-medium text-white">{scores.correct}</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: '#177337' }}>Correct</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#177337' }} />
                      <span className="font-medium text-white">{scores.incorrect}</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: '#177337' }}>Incorrect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className='loader-overlay'>
          <PacmanLoader size={18} color='#03A678' />
        </div>
      )}
    </div>
  );
}

export default WithAuth(Units);