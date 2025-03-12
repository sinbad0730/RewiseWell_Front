import { useState } from "react";
import { Card, CardHeader, CardContent } from "../../challenge/component/card";
import { Button } from "../../challenge/component/button";
import { Input } from "../../challenge/component/input";
import { Progress } from "../../challenge/component/progress";
import { Dice1, ChevronRight, Coins } from "lucide-react";
import { API_BASE_URL } from "@/utils/axios";
import axios from "axios";
import EventBus from "../../../components/EventBus";

export default function NumberGuess({scores , setScores} : any) {
  const [guess, setGuess] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [isGuessing, setIsGuessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const userData =  JSON.parse(localStorage.getItem("authtoken") as string);

  const [currentPoints, setCurrentPoints] = useState(parseInt(scores));

  const handleGuess = () => {
    const bet = parseInt(betAmount);
    const guessNum = parseInt(guess);

    if (isNaN(bet) || bet <= 0 || bet > currentPoints) {
      return;
    }

    if (isNaN(guessNum) || guessNum < 1 || guessNum > 10) {
      return;
    }

    setIsGuessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    
    setTimeout(async () => {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      const difference = Math.abs(randomNumber - guessNum);
      let multiplier = 0;

      if (difference === 0) {
        multiplier = 3; // Exact match
      } else if (difference === 1) {
        multiplier = 1.5; // Close guess
      }

      const winAmount = Math.floor(bet * multiplier);
      const scoreValue = currentPoints - bet + winAmount;
      const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token;
      await axios.patch(`${API_BASE_URL}/users/updateScores`,  {score: scoreValue , userId : userData.user.id} ,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(()=>{
        setCurrentPoints(prev => prev - bet + winAmount);
        setScores(scoreValue);
        localStorage.setItem('authtoken', JSON.stringify({...JSON.parse(localStorage.getItem('authtoken') as string), user: {...JSON.parse(localStorage.getItem('authtoken') as string).user, scores: scoreValue } }));
        EventBus.emit('scoresUpdated', scoreValue);
      })  

      let message = "";
      if (multiplier > 0) {
        message = `The number was ${randomNumber}. ${multiplier === 3 ? "Perfect guess!" : "Close enough!"} You won ${winAmount - bet} points!`;
      } else {
        message = `The number was ${randomNumber}. Better luck next time! You lost ${bet} points.`;
      }


      setIsGuessing(false);
      setProgress(0);
      setGuess("");
      setBetAmount("");
    }, 2500);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      <div className="scanning-line" />
      <CardHeader className="border-b border-[#00ff00]/30">
        <div className="flex items-center gap-2">
          <Dice1 className="w-5 h-5 text-emerald-300" />
          <h3 className="text-lg font-bold text-emerald-300">Number Guess</h3>
          <span className="ml-auto flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-300" />
            <span className="font-mono text-emerald-300">{scores}</span>
          </span>
        </div>
        {isGuessing && <Progress value={progress} className="mt-2" />}
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h4 className="text-xl mb-2 text-white">Guess a number between 1-10</h4>
            <p className="text-sm text-emerald-500">
              Exact guess: 3x multiplier | One off: 1.5x multiplier
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              min={1}
              max={10}
              className="!bg-slate-900/95 border-white/10 holographic-input text-white"
              placeholder="Enter your guess (1-10)"
              disabled={isGuessing}
            />
            <Input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="!bg-slate-900/95 border-white/10 holographic-input text-white"
              placeholder="Enter amount"
              disabled={isGuessing}
            />
          </div>

          <Button
            variant="outline"
            className="w-full text-emerald-300 border-emerald-500/30 bg-none hover:bg-emerald-500/10 inline-flex items-center gap-2 "
            onClick={handleGuess}
            disabled={isGuessing}
          >
            <ChevronRight className="w-4 h-4 mr-2" />
            GUESS
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
