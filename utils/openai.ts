import axios from "axios";
import { API_BASE_URL } from "./axios";

interface GenerateQuestionResponse {
    question: string;
    correctAnswer: string;
    maxMark: string;
  }
  
  export async function generateQuestion(term: string, definition: string): Promise<GenerateQuestionResponse> {
    
    const token = JSON.parse(localStorage.getItem('authtoken') as string)?.access_token;
    try {
      const response = await axios.post(`${API_BASE_URL}/mongo_flashcards/question_ai`, {
        term : term,
        definition: definition,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const feedback = response.data.feedback
    return {
      question: feedback.question,
      correctAnswer: feedback.markScheme,
      maxMark: feedback.maxMark,
    };
    } catch (error){
      console.error("Error feching question", error)
      throw new Error("Failed to fecht question from AI.")
    }
  }
  
  export async function validateAnswer(
    userAnswer: string, 
    correctAnswer: string,
    question: string,
    maxMark: string,
    term: string,
    definition: string
  ): Promise<{ isCorrect: boolean; feedback: string; score: string }> {
    
    const token = JSON.parse(localStorage.getItem('authtoken') as string)?.access_token;
    try {
      const response = await axios.post(`${API_BASE_URL}/mongo_flashcards/question_ai_feedback`, {
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        question: question,
        maxMark: maxMark,
        term : term,
        definition: definition,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const feedback = response.data.feedback
    return {
      isCorrect: feedback.isCorrect,
      feedback: feedback.feedback,
      score: feedback.score
    };
    } catch (error){
      console.error("Error feching question", error)
      throw new Error("Failed to fecht question from AI.")
    }
}

