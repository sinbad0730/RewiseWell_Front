"use client"
import React, { useEffect, useState } from 'react';
import './PracticeExams.css';
import WithAuth from '../../components/Layout/WithLayout';
import { ExamForm } from "./exam-form";
import { ExamDisplay } from "./exam-display";

interface ExamConfig {
  subject: any;
  unit: any;
  quantity: number;
  unitName: any;
  op: string;
}

const PracticeExams: React.FC = () => {
  const [examConfig, setExamConfig] = useState<ExamConfig>();

  return (
    <>
       <div className="relative mx-auto px-6 pt-28 pb-12 space-y-8 bg-background min-h-screen ">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 text-transparent bg-clip-text">
            Practice Exams Made Simple
          </h1>
          <p className="text-slate-400 text-lg">Advanced practice exams powered by AI</p>
        </div>

        {!examConfig ? (
          <ExamForm onGenerate={setExamConfig} />
        ) : (
          <ExamDisplay 
            {...examConfig} 
            onBack={() => setExamConfig(undefined)} 
          />
        )}
      </div>

      <style>{`
        .holographic-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 0 20px rgba(16, 185, 129, 0.1),
            inset 0 0 20px rgba(16, 185, 129, 0.05);
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
        }

        .holographic-input:hover, .holographic-input:focus {
          border-color: rgba(16, 185, 129, 0.5);
          box-shadow: 
            0 0 30px rgba(16, 185, 129, 0.2),
            inset 0 0 30px rgba(16, 185, 129, 0.1);
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      
    </>
  );
};

export default WithAuth(PracticeExams);