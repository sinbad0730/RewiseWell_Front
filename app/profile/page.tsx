"use client";
import WithAuth from "@/components/Layout/WithLayout";
import { useEffect, useState } from "react";
import ProfileCard from "./components/profile-card";
import Badges from "./components/badges";
import CyberWheel from "./components/cyber-wheel";
import NumberGuess from "./components/number-guess";
import LearningStreak from "./components/learning-streak";
import { Button } from "../challenge/component/button";
import { Globe } from "lucide-react";
import swal from 'sweetalert';
import Plinko from "./components/plinko";

const Profile = () => {

  const userData =  JSON.parse(localStorage.getItem("authtoken") as string);
  const [showCyberSpace, setShowCyberSpace] = useState(false);
  
  const [scores , setScores] = useState(userData.user.scores);
  const [aTime, setATime] = useState<number | 0>();
  const [cyberSpaceTimer, setCyberSpaceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect (()=> {
    const time = getUserActivityDuration();
    setATime(time);
  }, [])

  useEffect(() => {
    if (showCyberSpace) {
      const timer = setTimeout(() => {
        setShowCyberSpace(false);
        swal("Time's up!", "You've spent 5 minutes in Cyber Space.", "info");
        localStorage.removeItem('sessionStartTimestamp');
      }, 5 * 60 * 1000); // 5 minutes in milliseconds

      setCyberSpaceTimer(timer);
    } else if (cyberSpaceTimer) {
      clearTimeout(cyberSpaceTimer);
      setCyberSpaceTimer(null);
    }

    return () => {
      if (cyberSpaceTimer) {clearTimeout(cyberSpaceTimer);};
    };
  }, [showCyberSpace]);
  function getUserActivityDuration(): number {
    // Get the timestamp from the localStorage
    const timestamp = localStorage.getItem('sessionStartTimestamp');
  
    if (!timestamp) {
      // If there's no timestamp in the localStorage, this means it's the user's first visit during this session
      // So, we set the current time as the timestamp
      localStorage.setItem('sessionStartTimestamp', Date.now().toString());
      return 0;
    } else {
      // If there's a timestamp in the localStorage, we calculate the difference between the current time and the timestamp
      const duration = Date.now() - Number(timestamp);
  
      // Convert the duration from milliseconds to hours
      const durationInHours = duration / (1000 * 60 );
      console.log(durationInHours)
      return durationInHours;
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div>
          <ProfileCard scores={scores} setScores = {setScores} />
          {showCyberSpace ? (
            <div className="mt-6 space-y-6">
              <LearningStreak />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CyberWheel  scores={scores} setScores={setScores}/>
                <NumberGuess scores={scores} setScores={setScores} />
              </div>
              <Plinko scores={scores} setScores={setScores}/>
              <Badges />
              <Button
                variant="outline"
                className="mt-4 text-emerald-300 border-emerald-500/30  hover:text-emerald-500 "
                onClick={() => setShowCyberSpace(false)}
              >
                ← Back to Profile
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-6 mb-6">
                <Button
                  variant="outline"
                  className="w-full text-emerald-300 border-emerald-500/30  hover:text-emerald-500 h-20 text-lg font-bold"
                  onClick={() => {
                    const times = getUserActivityDuration();
                    if(times >  10){
                      setShowCyberSpace(true)
                    } else {
                      swal("", `You need to spend more time on this site for ${10-Math.ceil(times)} mins. Keep learning!`, "info");
                    }
                    // setShowCyberSpace(true)
                  }
                  }
                >
                  <Globe className="w-6 h-6 mr-2" />
                  Explore Cyber Space
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default WithAuth(Profile);