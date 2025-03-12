import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Loader2 } from "lucide-react";
import { generateQuestion, validateAnswer } from "@/utils/openai";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  term: string;
  definition: string;
}

export function QuestionModal({ isOpen, onClose, term, definition }: QuestionModalProps) {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; score: string } | null>(null);
  const [step, setStep] = useState<"generating" | "answering" | "feedback">("generating");
  const [maxMark, setMaxMark] = useState('')

  async function handleGenerateQuestion() {
    setLoading(true);
    setTimeout(async () => {
      try {
        const result = await generateQuestion(term, definition);


        setQuestion(result.question);
        setCorrectAnswer(result.correctAnswer);
        setMaxMark(result.maxMark)
        setStep("answering");
      } catch (error) {
        console.error("Failed to generate question:", error);
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulate API delay
  }

  async function handleSubmitAnswer() {
    if (!userAnswer.trim()) return;

    setLoading(true);
    setTimeout(async () => {
      try {
        const result = await validateAnswer(userAnswer, correctAnswer, question, maxMark, term, definition);
        setFeedback({
          isCorrect: result.isCorrect,
          message: result.feedback,
          score: result.score
        });
        setStep("feedback");
      } catch (error) {
        console.error("Failed to validate answer:", error);
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulate API delay
  }

  function handleClose() {
    setQuestion("");
    setCorrectAnswer("");
    setUserAnswer("");
    setFeedback(null);
    setStep("generating");
    onClose();
  }

  function handleTryAgain() {
    setUserAnswer("");
    setFeedback(null);
    setStep("answering");
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] top-[300px]" style={{ backgroundColor: '#070D0A', borderColor: '#0E5936' }}>
        <DialogHeader>
          <DialogTitle style={{ color: '#03A678' }}>Practice Question</DialogTitle>
          <DialogDescription style={{ color: '#177337' }}>
            Test your knowledge about: {term}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {step === "generating" && (
            <Button 
              onClick={handleGenerateQuestion}
              disabled={loading}
              className="w-full"
              style={{ backgroundColor: '#03A678', color: 'white' }}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Question...
                </>
              ) : (
                'Generate Question'
              )}
            </Button>
          )}

          {(step === "answering" || step === "feedback") && (
            <Card className="p-4" style={{ backgroundColor: '#070D0A', borderColor: '#0E5936' }}>
              <p className="font-medium mb-4" style={{ color: '#48D97A' }}>{question}</p>
              <p className="font-medium mb-4" style={{ color: '#48D97A' }}> Max Mark: {maxMark}</p>

              {step === "answering" && (
                <div className="space-y-4">
                  <Input
                    placeholder="Type your answer..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    style={{ 
                      backgroundColor: '#0E5936',
                      color: 'white',
                      borderColor: '#03A678'
                    }}
                  />
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={loading || !userAnswer.trim()}
                    className="w-full"
                    style={{ backgroundColor: '#03A678', color: 'white' }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking Answer...
                      </>
                    ) : (
                      'Submit Answer'
                    )}
                  </Button>
                </div>
              )}

              {step === "feedback" && feedback && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-md ${
                    parseInt(feedback.score) === parseInt(maxMark) ? 'bg-green-950' :
                    parseInt(feedback.score) > 0 && parseInt(feedback.score) < parseInt(maxMark) ? 'bg-green-950' :
                    'bg-red-950'
                  }`}>
                    <p className="font-medium" style={{ 
                      color:  parseInt(feedback.score) ===  parseInt(maxMark) ? '#48D97A' :
                              parseInt(feedback.score) > 0 && parseInt(feedback.score) < parseInt(maxMark) ?  '#FFD700' :
                              '#ff6b6b' 
                    }}>
                      {parseInt(feedback.score) ===  parseInt(maxMark) ? 'Correct!' :
                      parseInt(feedback.score) > 0 && parseInt(feedback.score) < parseInt(maxMark) ? 'Partially Correct':
                      'Incorrect'}
                    </p>
                    <p className="mt-2" style={{ color: '#177337' }}>{feedback.message}</p>
                    <p className="mt-2 text-sm" style={{ color: '#177337' }}>
                      score: {feedback.score}
                    </p>
                    <p className="mt-2 text-sm" style={{ color: '#48D97A' }}>
                      Correct answer: {correctAnswer}
                    </p>

                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleTryAgain}
                      variant="outline"
                      className="flex-1"
                      style={{ borderColor: '#03A678', color: '#03A678' }}
                    >
                      Try Another Question
                    </Button>
                    <Button
                      onClick={handleClose}
                      className="flex-1"
                      style={{ backgroundColor: '#03A678', color: 'white' }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}