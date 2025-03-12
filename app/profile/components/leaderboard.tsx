import { Card, CardHeader, CardContent } from "../../challenge/component/card";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { id: 1, name: "NetKing_99", score: 15420 },
  { id: 2, name: "CyberQueen", score: 14850 },
  { id: 3, name: "ByteMaster", score: 14200 },
  { id: 4, name: "DataRunner", score: 13980 },
  { id: 5, name: "CodePhantom", score: 13540 }
];

export default function Leaderboard() {
  return (
    <Card className="bg-black border-[#00ff00] border-2 shadow-[0_0_10px_#00ff00]">
      <CardHeader className="border-b border-[#00ff00]/30">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#00ff00]" />
          <h3 className="text-lg font-bold">Top Runners</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {leaderboardData.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 rounded bg-[#001100] hover:bg-[#002200] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center font-bold">#{index + 1}</span>
                <span>{user.name}</span>
              </div>
              <span className="font-mono">{user.score}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
