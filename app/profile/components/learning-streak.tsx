import { Card, CardHeader, CardContent } from "../../challenge/component/card";
import { Star, StarOff, Brain } from "lucide-react";

export default function LearningStreak() {
  // Simulated streak data (would come from backend in real app)
  const currentStreak = 3;
  const maxDays = 7;

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl relative overflow-hidden">
      <div className="scanning-line" />
      <CardHeader className="border-b border-[#00ff00]/30">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-emerald-300" />
          <h3 className="text-lg font-bold text-emerald-300">Learning Streak</h3>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: maxDays }).map((_, index) => (
              <div 
                key={index}
                className={`transition-all duration-300 ${
                  index < currentStreak ? 'scale-110' : 'opacity-50'
                }`}
              >
                {index < currentStreak ? (
                  <Star className="w-8 h-8 text-emerald-300 fill-emerald-300" />
                ) : (
                  <StarOff className="w-8 h-8 text-emerald-300" />
                )}
              </div>
            ))}
          </div>
          <p className="text-lg font-bold text-center">
            {currentStreak} Day Streak!
          </p>
          <p className="text-sm text-emerald-400 text-center">
            Keep learning daily to unlock special rewards and achievements
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
