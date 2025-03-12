import { useState } from "react";
import { Card, CardHeader, CardContent } from "../../challenge/component/card";
import { Button } from "../../challenge/component/button";
import { Progress } from "../../challenge/component/progress";
import { Lock, Unlock, Target, Award, Cpu, Brain, BookOpen, Trophy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../challenge/component/tooltip";

const GRID_SIZE = 5;
const UNLOCK_COST = 100;

// Educational achievements that can be unlocked
const ACHIEVEMENTS = [
  { id: 1, name: "Quick Learner", icon: "🚀", points: 100, description: "Complete 5 lessons in a day" },
  { id: 2, name: "Knowledge Seeker", icon: "📚", points: 150, description: "Perfect score in a quiz" },
  { id: 3, name: "Team Player", icon: "🤝", points: 200, description: "Help 3 classmates with problems" },
  { id: 4, name: "Focus Master", icon: "🎯", points: 250, description: "Study streak for 7 days" },
  { id: 5, name: "Subject Expert", icon: "🏆", points: 300, description: "Master a subject chapter" },
];

interface GridCell {
  x: number;
  y: number;
  isUnlocked: boolean;
  achievement?: typeof ACHIEVEMENTS[0];
}

export default function CyberGrid() {
  const [grid, setGrid] = useState<GridCell[]>(() => {
    // Randomly assign achievements to some cells
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
      const hasAchievement = Math.random() > 0.5;
      return {
        x: i % GRID_SIZE,
        y: Math.floor(i / GRID_SIZE),
        isUnlocked: false,
        achievement: hasAchievement 
          ? ACHIEVEMENTS[Math.floor(Math.random() * ACHIEVEMENTS.length)]
          : undefined,
      };
    });
  });

  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [unlockProgress, setUnlockProgress] = useState(0);

  const handleCellClick = (index: number) => {
    const cell = grid[index];
    if (cell.isUnlocked) {
      return;
    }

    setSelectedCell(index);
    setUnlockProgress(0);

    // Simulate unlock progress animation
    const interval = setInterval(() => {
      setUnlockProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 50);

    // Simulate verification of educational achievement
    setTimeout(() => {
      clearInterval(interval);
      setUnlockProgress(0);
      setSelectedCell(null);

    }, 2500);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl relative overflow-hidden">
      <div className="scanning-line" />
      <CardHeader className="border-b border-[#00ff00]/30">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-[#00ff00]" />
              Learning Grid
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <Brain className="w-4 h-4 text-[#00ff00]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-black border-[#00ff00] text-[#00ff00]">
                    <p>Unlock nodes by completing educational achievements. Each achievement earns you points and reveals special rewards!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h2>
            <span className="text-sm font-normal flex items-center gap-1">
              <BookOpen className="w-4 h-4 inline" />
              Progress Tracking Active
            </span>
          </div>
          <p className="text-sm text-[#00ff00]/60">
            Node: {selectedCell !== null ? `(${grid[selectedCell].x}, ${grid[selectedCell].y})` : 'Select a node'}
          </p>
          {selectedCell !== null && (
            <Progress value={unlockProgress} className="h-2 bg-[#003300]" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-5 gap-2">
          {grid.map((cell, index) => (
            <TooltipProvider key={`${cell.x}-${cell.y}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className={`
                      cyber-grid-cell
                      relative aspect-square p-0 
                      ${cell.isUnlocked
                        ? "bg-[#003300] border-[#00ff00] neon-pulse"
                        : "bg-black border-[#00ff00]/30"
                      }
                      hover:bg-[#004400] hover:border-[#00ff00]
                      transition-all duration-300
                      ${selectedCell === index ? "animate-pulse" : ""}
                      before:content-[''] before:absolute before:inset-[-1px]
                      before:bg-[#00ff00]/10 before:clip-path-hex
                      after:content-[''] after:absolute after:inset-0
                      after:bg-gradient-to-br after:from-transparent after:to-[#00ff00]/5
                    `}
                    onClick={() => handleCellClick(index)}
                  >
                    {cell.isUnlocked ? (
                      <div className="relative">
                        <Unlock className="w-6 h-6 text-[#00ff00]" />
                        {cell.achievement && (
                          <Trophy className="absolute -top-2 -right-2 w-4 h-4 text-[#00ff00]" />
                        )}
                      </div>
                    ) : (
                      <div className="relative group">
                        <Lock className="w-6 h-6 text-[#00ff00]/30 group-hover:text-[#00ff00] transition-colors" />
                        {cell.achievement && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {cell.achievement.icon}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1 text-xs opacity-50">
                      {cell.x},{cell.y}
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  className="bg-black border-[#00ff00] text-[#00ff00]"
                >
                  {cell.achievement ? (
                    <div className="p-2 space-y-1">
                      <p className="font-bold">{cell.achievement.name}</p>
                      <p className="text-sm">{cell.achievement.description}</p>
                      <p className="text-xs text-[#00ff00]/70">Worth: {cell.achievement.points} points</p>
                    </div>
                  ) : (
                    <p className="p-2">Keep learning to discover achievements!</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}