import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../../challenge/component/card";
import { Button } from "../../challenge/component/button";
import { Input } from "../../challenge/component/input";
import { Dice1, ChevronRight, ChevronDown, Coins } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";
import EventBus from "../../../components/EventBus";

const SEGMENTS = [
  { value: 2, label: "2x", color: "#34d399" },
  { value: 0.5, label: "½x", color: "#e33c3c" },
  { value: 2, label: "2x", color: "#34d399" },
  { value: 0.5, label: "½x", color: "#e33c3c" },
  { value: 2, label: "2x", color: "#34d399" },
  { value: 0.5, label: "½x", color: "#e33c3c" },
  { value: 2, label: "2x", color: "#34d399" },
  { value: 0.5, label: "½x", color: "#e33c3c" },
];

export default function CyberWheel({scores, setScores} :any) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const [rotation, setRotation] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(parseInt(scores));
  const [unlockProgress, setUnlockProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const spinTimeoutRef = useRef<NodeJS.Timeout>();
  const wheelRef = useRef<HTMLDivElement>(null);

  const userData =  JSON.parse(localStorage.getItem("authtoken") as string);

  useEffect(() => {
    // Cleanup function to clear any running intervals/timeouts
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array means this runs on mount and cleanup on unmount

  const handleSpin = () => {
    if (isSpinning) return;

    const bet = parseInt(betAmount);
    if (isNaN(bet) || bet <= 0 || bet > currentPoints) {
      return;
    }

    setIsSpinning(true);
    setUnlockProgress(0);

    // Set up progress animation
    progressIntervalRef.current = setInterval(() => {
      setUnlockProgress(prev => {
        if (prev >= 100) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const spinDegrees = 1440 + Math.random() * 360; // At least 4 full rotations + random
    const finalRotation = rotation + spinDegrees;
    setRotation(finalRotation);

    // Calculate result after spin
    spinTimeoutRef.current = setTimeout(async () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setUnlockProgress(0);

      const segment = Math.floor((finalRotation % 360) / (360 / SEGMENTS.length));
      const multiplier = SEGMENTS[segment].value;
      const winAmount = Math.floor(bet * multiplier);
      const scoreValue = currentPoints -bet + winAmount;
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

      setIsSpinning(false);

    }, 3000);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      <div className="scanning-line" />
      <CardHeader className="border-b border-[#00ff00]/30">
        <div className="flex items-center gap-2">
          <Dice1 className="w-5 h-5 text-emerald-300" />
          <h3 className="text-lg font-bold text-emerald-300">Cyber Wheel</h3>
          <span className="ml-auto flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-300" />
            <span className="font-mono">{scores}</span>
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-6">
          {/* Wheel */}
          <div 
            ref={wheelRef}
            className="relative w-64 h-64 cyber-wheel"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3s cubic-bezier(0.32, 0.94, 0.60, 1)' : 'none'
            }}
          >
            {SEGMENTS.map((segment, index) => (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${index * (360 / SEGMENTS.length)}deg)`,
                }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-[50%]"
                  style={{
                    background: `linear-gradient(to bottom, ${segment.color}, transparent)`,
                  }}
                />
                <div
                  className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold"
                  style={{ color: segment.color }}
                >
                  {segment.label}
                </div>
              </div>
            ))}
            <div className="absolute inset-2 rounded-full border-2 border-emerald-400 shadow-[inset_0_0_20px_#00ff00]" />
          </div>

          {/* Pointer */}
          <div className="absolute top-[155px] left-1/2 -translate-x-1/2 w-4 h-8">
            <div className="w-full h-full bg-emerald-500 clip-path-pointer neon-pointer" />
          </div>

          {/* Controls */}
          <div className="w-full max-w-xs space-y-4">
            <div className="flex gap-2">
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="!bg-slate-900/95 border-white/10 holographic-input text-white"
                // placeholder="Enter bet amount"
                disabled={isSpinning}
              />
              <Button
                variant="outline"
                className="text-emerald-300 border-emerald-500/30 bg-none hover:bg-emerald-500/10 inline-flex items-center gap-2"
                onClick={handleSpin}
                disabled={isSpinning}
              >
                {isSpinning ? (
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                SPIN
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}