import { useState } from "react";
import { Card, CardContent } from "../../challenge/component/card";
import { Button } from "../../challenge/component/button";
import { Input } from "../../challenge/component/input";
import { Avatar, AvatarImage, AvatarFallback } from "../../challenge/component/avatar";
import { Edit2, Upload, Coins, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../challenge/component/tooltip";

export default function ProfileCard({scores, setScores} : any) {
  const [nickname, setNickname] = useState("CyberUser_42");
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState("https://api.dicebear.com/7.x/pixel-art/svg?seed=42");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [prizesTooltipOpen, setPrizesTooltipOpen] = useState(false);

  const userData =  JSON.parse(localStorage.getItem("authtoken") as string);
  // Simulated DOGE price ($0.08 per DOGE as of last 24h)
  const dogePrice = 0.08;
  const dogeAmount = 64;
  const usdAmount = 5;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateName = (value : any) => {

  }

  return (
    <Card className="bg-black bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl text-emerald-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Avatar className="w-24 h-24">
              <AvatarImage src='/coin.png' />
              <AvatarFallback className="text-emerald-300">CN</AvatarFallback>
            </Avatar>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-opacity">
              <Upload className="w-6 h-6 text-[#00ff00]" />
              <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
            </label>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <Input
                value={userData?.user.username}
                onChange={(e) => updateName(e.target.value)}
                className="bg-black text-emerald-300 border-[#00ff00] font-mono text-xl"
                maxLength={20}
              />
            ) : (
              <h2 className="text-2xl font-bold text-emerald-300">{userData?.user.username}</h2>
            )}
            <p className="text-emerald-500 mt-1">Level 15 Netrunner</p>
          </div>

          <Button
            variant="outline"
            className="text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/10 inline-flex items-center gap-2"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>

        {/* Prize Box */}
        <div className="mt-6 p-6 border-2 rounded-lg pt-6 border-t border-emerald-500/20 relative overflow-hidden">
          <div className="scanning-line" />
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2 text-emerald-400">
                <Coins className="w-6 h-6 text-emerald-400" />
                Prize Pool
                <TooltipProvider>
                  <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                    <TooltipTrigger asChild>
                      <button 
                        className="inline-flex focus:outline-none focus:ring-2 focus:ring-[#00ff00] rounded"
                        onClick={() => setTooltipOpen(!tooltipOpen)}
                      >
                        <HelpCircle className="w-4 h-4 text-emerald-400 hover:text-[#00ff00]/80 transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="max-w-xs bg-black border-emerald-500/30 text-[#00ff00] z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="space-y-2 p-2">
                        <p className="font-bold">🚀 Level Up Your Game!</p>
                        <p>Not about being the best - it's about being better than yesterday! Keep grinding, stay active, and watch your progress soar to win some sweet DOGE! 🐕✨</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              <p className="text-white mt-3 font-bold text-3xl">{dogeAmount} DOGE</p>
              <p className="text-white text-sm">≈ ${usdAmount} USD</p>
            </div>
            <a
              href="https://www.tradingview.com/chart/?symbol=BINANCE:DOGEUSDT"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-emerald-500/30 rounded hover:bg-[#00ff00] hover:text-black transition-colors text-sm"
            >
              View Price Chart →
            </a>
          </div>

          {/* Small Prize Boxes */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-sm font-bold text-emerald-400">In-class Rewards</h4>
              <TooltipProvider>
                <Tooltip open={prizesTooltipOpen} onOpenChange={setPrizesTooltipOpen}>
                  <TooltipTrigger asChild>
                    <button 
                      className="inline-flex focus:outline-none focus:ring-2 focus:ring-[#00ff00] rounded text-emerald-400"
                      onClick={() => setPrizesTooltipOpen(!prizesTooltipOpen)}
                    >
                      <HelpCircle className="w-4 h-4 text-emerald-400 hover:text-[#00ff00]/80 transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    className="max-w-xs bg-black border-[#00ff00] text-[#00ff00] z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-2 p-2">
                      <p className="font-bold">👩‍🏫 ReviseWell Rewards</p>
                      <p>Earn these rewards through active participation on ReviseWell! Your teachers can award these special prizes based on your platform engagement and learning progress.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-2 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-md  hover:bg-[#002200] transition-colors">
                <div className="text-xl mb-1">📚</div>
                <h4 className="font-bold text-xs text-emerald-400">School Pass</h4>
                <p className="text-[10px] text-white">Skip one class!</p>
              </div>
              <div className="p-2 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-md hover:bg-[#002200] transition-colors">
                <div className="text-xl mb-1">🍫</div>
                <h4 className="font-bold text-xs text-emerald-400">Chocolate Box</h4>
                <p className="text-white text-[10px]">Premium treats!</p>
              </div>
              <div className="p-2 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-md hover:bg-[#002200] transition-colors">
                <div className="text-xl mb-1">🍩</div>
                <h4 className="font-bold text-xs text-emerald-400">Donuts x2</h4>
                <p className="text-white text-[10px]">Double the fun!</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}