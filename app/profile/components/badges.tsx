import { Card, CardHeader, CardContent } from "../../challenge/component/card";
import { Award } from "lucide-react";

const badges = [
  { id: 1, name: "First Hack", icon: "🔓", description: "Complete your first hack" },
  { id: 2, name: "Code Master", icon: "💻", description: "Write 1000 lines of code" },
  { id: 3, name: "Bug Hunter", icon: "🐛", description: "Find and report 10 bugs" },
  { id: 4, name: "Network Sage", icon: "🌐", description: "Connect to 100 networks" },
  { id: 5, name: "Digital Ghost", icon: "👻", description: "Stay undetected for 1 hour" },
  { id: 6, name: "Data Miner", icon: "⛏️", description: "Extract 1TB of data" }
];

export default function Badges() {
  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl relative overflow-hidden">
      <CardHeader className="border-b border-[#00ff00]/30">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-300" />
          <h3 className="text-lg font-bold text-emerald-300">Achievement Badges</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-md  hover:bg-[#002200] transition-colors"
            >
              <div className="text-2xl mb-2">{badge.icon}</div>
              <h4 className="font-bold mb-1 text-emerald-400">{badge.name}</h4>
              <p className="text-sm text-white">{badge.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
