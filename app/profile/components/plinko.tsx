import { useState } from "react";
import { Card, CardHeader, CardContent } from "../../challenge/component/card";
import { Button } from "../../challenge/component/button";
import { Input } from "../../challenge/component/input";
import { Progress } from "../../challenge/component/progress";
import { ChevronDown, Coins } from "lucide-react";
import EventBus from "../../../components/EventBus";

const MULTIPLIERS = [5, 2, 1, 0, -1, -2, -1, 0, 1, 2, 5];
const ROWS = 10;
const COLS = 11;

interface Position {
  x: number;
  y: number;
}

export default function Plinko( {scores , setScores} : any ) {
  const [chanceAmount, setChanceAmount] = useState("");
  const [isDropping, setIsDropping] = useState(false);
  const [dropProgress, setDropProgress] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(1000);
  const [chipPosition, setChipPosition] = useState<Position>({ x: 5, y: -1 });
  const [path, setPath] = useState<Position[]>([]);

  const handleDrop = () => {
    const points = parseInt(chanceAmount);
    if (isNaN(points) || points <= 0 || points > currentPoints) {
    //   toast({
    //     title: "Invalid Points",
    //     description: "Please enter a valid number of points to chance.",
    //     variant: "destructive",
    //   });
      return;
    }

    setIsDropping(true);
    setDropProgress(0);
    // Always start from center
    setChipPosition({ x: Math.floor(COLS / 2), y: -1 });
    setPath([]);

    // Pre-calculate the path
    const newPath: Position[] = [];
    let currentX = Math.floor(COLS / 2);
    let currentY = -1;

    for (let row = 0; row < ROWS; row++) {
      currentY++;
      if (row > 0) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        currentX = Math.max(0, Math.min(COLS - 1, currentX + direction));
      }
      newPath.push({ x: currentX, y: currentY });
    }

    // Animate the chip along the path
    let step = 0;
    const interval = setInterval(() => {
      if (step < newPath.length) {
        const currentPosition = newPath[step];
        setChipPosition(currentPosition);
        setPath(prevPath => [...prevPath, currentPosition]);
        step++;
      } else {
        clearInterval(interval);
        const finalPosition = newPath[newPath.length - 1];
        const multiplierIndex = Math.min(Math.max(0, finalPosition.x), MULTIPLIERS.length - 1);
        const finalMultiplier = MULTIPLIERS[multiplierIndex];

        let pointChange;
        if (finalMultiplier > 0) {
          // For positive multipliers, calculate additional points won
          const totalWin = Math.floor(points * finalMultiplier);
          pointChange = totalWin - points; // Only the extra points won
        } else if (finalMultiplier < 0) {
          // For negative multipliers, calculate points lost
          pointChange = -Math.floor(points * Math.abs(finalMultiplier));
        } else {
          // For multiplier = 0, lose the points
          pointChange = -points;
        }

        setScores(scores + pointChange);

        EventBus.emit('scoresUpdated', scores + pointChange);
        setCurrentPoints(prev => prev + pointChange);

        setTimeout(() => {
          setIsDropping(false);
          setDropProgress(0);
          setChanceAmount("");
          setPath([]);

        //   if (finalMultiplier > 0) {
        //     toast({
        //       title: "You Won!",
        //       description: `${finalMultiplier}x multiplier! You won ${pointChange} points!`,
        //     });
        //   } else if (finalMultiplier === 0) {
        //     toast({
        //       title: "No Luck!",
        //       description: "You lost your points. Try again!",
        //     });
        //   } else {
        //     toast({
        //       title: "Ouch!",
        //       description: `${Math.abs(finalMultiplier)}x loss! You lost ${Math.abs(pointChange)} points!`,
        //       variant: "destructive",
        //     });
        //   }
        }, 1000);
      }
    }, 200);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setDropProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const getPegCount = (row: number) => {
    // Start with 1 peg, then expand more dramatically
    if (row === 0) return 1;
    if (row === 1) return 3;
    if (row === 2) return 5;
    // After row 2, increase by 2 each time until reaching COLS
    return Math.min((row - 2) * 2 + 5, COLS);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      <div className="scanning-line" />
      <CardHeader className="border-b border-[#00ff00]/30">
        <div className="flex items-center gap-2">
          <ChevronDown className="w-5 h-5 text-emerald-300" />
          <h3 className="text-lg font-bold text-emerald-300">Cyber Plinko</h3>
          <span className="ml-auto flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-300" />
            <span className="font-mono text-emerald-300">{scores}</span>
          </span>
        </div>
        {isDropping && <Progress value={dropProgress} className="mt-2" />}
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Plinko Board */}
          <div className="aspect-[6/7] w-full max-w-md mx-auto bg-[#001100] rounded-lg p-4 relative">
            {/* Entry point marker */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-8">
              <div className="w-full h-full bg-emerald-300 clip-path-pointer neon-pointer" />
            </div>

            {/* Path trace */}
            {path.map((pos, idx) => (
              <div
                key={`path-${idx}`}
                className="absolute w-1 h-1 rounded-full bg-[#00ff00]/30"
                style={{
                  left: `${(pos.x * (100 / (COLS - 1)))}%`,
                  top: `${(pos.y * (100 / ROWS))}%`,
                }}
              />
            ))}

            {/* Pegs Grid */}
            <div className="absolute inset-[10%] grid grid-rows-10 gap-4">
              {Array.from({ length: ROWS }).map((_, row) => {
                const pegCount = getPegCount(row);
                return (
                  <div
                    key={row}
                    className="grid"
                    style={{
                      gridTemplateColumns: `repeat(${pegCount}, 1fr)`,
                      justifyItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem'
                    }}
                  >
                    {Array.from({ length: pegCount }).map((_, col) => (
                      <div
                        key={col}
                        className="w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_5px_#00ff00]"
                      />
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Chip */}
            {isDropping && chipPosition.y >= -1 && (
              <div
                className="absolute w-4 h-4 rounded-full bg-emerald-300 shadow-[0_0_10px_#00ff00] transition-all duration-200"
                style={{
                  left: `${chipPosition.x * (100 / (COLS - 1))}%`,
                  top: `${(chipPosition.y + 1) * (100 / ROWS)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}

            {/* Multiplier slots */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between px-4">
              {MULTIPLIERS.map((mult, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono px-1.5 py-1 rounded ${
                    mult > 0
                      ? 'bg-[#002200] text-white'
                      : mult === 0
                        ? 'bg-[#222200] text-yellow-500'
                        : 'bg-[#220000] text-red-500'
                  }`}
                >
                  {mult}x
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2 max-w-xs mx-auto">
            <Input
              type="number"
              value={chanceAmount}
              onChange={(e) => setChanceAmount(e.target.value)}
              className="!bg-slate-900/95 border-white/10 holographic-input text-white w-[300px]"
              placeholder="Enter points to chance"
              disabled={isDropping}
            />
            <Button
              variant="outline"
              className="w-full text-emerald-300 border-emerald-500/30 bg-none hover:bg-emerald-500/10 inline-flex items-center gap-2"
              onClick={handleDrop}
              disabled={isDropping}
            >
              DROP
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}