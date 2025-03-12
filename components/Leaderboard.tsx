// components/Leaderboard.tsx
import React, { useState } from 'react';
import { Modal } from 'antd';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
// Define the structure of student data
interface Student {
  id: number;
  name: string;
  score: number;
}

interface LeaderboardProps {
  students: Student[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ students }) => {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <div>
      <div className='flex justify-center items-center gap-2'>
        <h1 className='text-[#111c2d] dark:text-white text-3xl text-center'><EmojiEventsOutlinedIcon className='text-[#eab308] w-12 h-12'/> Leaderboard</h1>
        <button className="px-[10px] py-[3px] dark:bg-blue-700 dark:text-white rounded-full" onClick={() => setShowHelp(true)}>?</button>
      </div>
      <div className='flex flex-col gap-2 bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-blue-800 shadow-xl m-[50px] border-[1px] rounded-lg p-7' >
          {students
            .sort((a, b) => b.score - a.score) // Sort students by score, highest first
            .map((student, index) => (
              <div key={student.id} className=' flex flex-row justify-between items-center rounded-lg bg-blue-800/30 hover:bg-blue-800/50 transition-colors py-6 px-10'>
                <div className='flex flex-row gap-4 items-center'>
                  {index === 0 && (<div className='bg-[#eab30833] rounded-full p-2'><WorkspacePremiumOutlinedIcon className="text-[#eab308] w-8 h-8" /> </div>)}
                  {index === 1 && (<div className='bg-[#d1d5db33] rounded-full p-2'><WorkspacePremiumOutlinedIcon className="text-[#d1d5db] w-8 h-8" /> </div>)}
                  {index === 2 && (<div className='bg-[#d9770633] rounded-full p-2'><WorkspacePremiumOutlinedIcon className="text-[#d97706] w-8 h-8" /> </div>)}
                  {index > 2 && (<div className='bg-[#1e40af80] rounded-full p-2'><span className='text-[#93c5fd]'>{index + 1}</span></div>)}
                  <div className='font-medium text-lg text-blue-100'>{student.name}</div>
                </div>
                <div className='text-lg font-semibold bg-blue-800/50 px-4 py-2 rounded-full text-blue-200'>{student.score} Points</div>
              </div>
            ))}
      </div>
      <Modal open={showHelp} onCancel={() => setShowHelp(false)} footer={null}>
        <div className="tutorial-overlay rounded-md p-5">
          <div className="tutorial-content space-y-2">
            <h2 className='text-xl text-center'>Leaderboard</h2>
            <iframe
              className='w-full h-[315px]'
              src="https://www.youtube.com/embed/08AZk1AUJeo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
            <div className='flex justify-end'>
              <button id="help" className='py-2 px-4 dark:bg-blue-700 dark:text-white' onClick={() => setShowHelp(false)}>Got It!</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Leaderboard;
