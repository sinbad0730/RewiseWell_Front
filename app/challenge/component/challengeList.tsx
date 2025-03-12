import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { motion } from "framer-motion";
import { ShoppingCart, Gift, Coins, Crown, Medal, Trophy, Star } from "lucide-react";

export function ChanlengeList() {
    const router = useRouter();

const startChallenge = () => { 
    router.push(`/challenge/quiz?category=${'Data Representation'}`);
}
  return (
    <Card className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-3">
          <Gift className="w-6 h-6 text-purple-400" />
          Challenge Quiz List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
              <motion.div
                key='1'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${"bg-purple-800/30 border-purple-700 hover:bg-purple-800/40" } transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className="w-6 h-6 text-purple-400" />
                    <div>
                      <h3 className="font-medium text-purple-100">Computer Science</h3>
                      <p className="text-sm text-purple-300">Data Representation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => startChallenge()}
                      variant={ "default" }
                      className={ "bg-purple-600 hover:bg-purple-500 text-white" }
                    >
                      Start Challenge
                    </Button>
                  </div>
                </div>
              </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
