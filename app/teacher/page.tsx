'use client'
import React, { useEffect, useState } from "react";
import WithAuth from '../../components/Layout/WithLayout';
import ProgressChart from "@/components/ProgressChart";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";
import './style.css';
import { Empty, Modal } from "antd";

const TeacherPage: React.FC = () => {
  const [students, setStudents]: any = useState([]);
  const [student, setStudent]: any = useState(0);
  const [subjects, setSubjects]: any = useState([]);
  const [subject, setSubject]: any = useState(0);
  const [units, setUnits]: any = useState([]);
  const [unit, setUnit]: any = useState(0);
  const [flashcardScore, setFlashcardScore]: any = useState([]);
  const [flashIndex, setFlashIndex]: any = useState(-1);
  const [feedback, setFeedback]: any = useState([]);
  const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token
  const [showHelp, setShowHelp] = useState(false);
  const [mode, setMode] = useState(0);
  const [classType, setClassType]: any = useState('');

  useEffect(() => {
    getSubjects()
    getStudents()
  }, [])

  useEffect(() => {
    if (subject !== 0) {
      getUnits()
    }
  }, [subject])

  useEffect(() => {
    if (unit !== 0) {
      getFlashcardScore()
      getActiveRecallFeedback()
    }
  }, [unit])

  const getStudents = async () => {
    await axios.get(`${API_BASE_URL}/users/get_students`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(async (res) => {
      setStudents(res.data);
    })
  }
  const getSubjects = async () => {
    await axios.get(`${API_BASE_URL}/grade-retrieval/get_all_subject`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(async (res) => {
      setSubjects(res.data);
    })
  }

  const getUnits = async () => {
    await axios.get(`${API_BASE_URL}/grade-retrieval/${subject}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(async (res) => {
      setUnits(res.data);
    })
  }

  const getFlashcardScore = async () => {
    await axios.get(`${API_BASE_URL}/mongo_flashcards/get_incorrectlist`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        subjectId: subject,
        unitId: unit,
        userId: student
      }
    }).then(async (res) => {
      setFlashcardScore(res.data);
    })
  }

  const getActiveRecallFeedback = async () => {
    await axios.get(`${API_BASE_URL}/recall/get_recall_answers`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        subjectId: subject,
        unitId: unit,
        userId: student
      }
    }).then(async (res) => {
      const lastFeedback = res.data.slice(-3)
      setFeedback(lastFeedback);
    })
  }

  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value)
  };

  const handleModeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(parseInt(e.target.value))
  };

  const handleStudentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStudent(e.target.value)
  };

  const handleUnitChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value)
  };

  const handleCancel = (index: number) => {
    setFlashIndex(index);
  };

  const handleClassChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClassType(e.target.value)
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-10 gap-2">
        <h1 className="text-center text-3xl font-bold dark:text-white">Teacher Dashboard</h1>
        <button className="px-[10px] py-[3px] dark:bg-blue-700 dark:text-white rounded-full" onClick={() => setShowHelp(true)}>?</button>
      </div>
      <div className="flex justify-center gap-2 flex-row max-[650px]:flex-wrap dark:text-white dark:bg-slate-700 rounded-md shadow-sm px-7">
        <div className="py-4 flex justify-center items-center w-full">
          <select className="bg-white border border-slate-300 rounded-md shadow-sm text-gray-900 sm:text-sm dark:bg-slate-700 dark:text-white w-full max-[700px]:text-sm max-[840px]:w-[80vw]" onChange={handleModeChange} defaultValue="">
            <option value="" disabled>Select Filter Mode</option>
            <option value={0}>Class</option>
            <option value={1}>Individual Student</option>
          </select>
        </div>

        <div className="py-4 flex justify-center items-center w-full">
          {mode === 1 ?
            <select className="bg-white border border-slate-300 rounded-md shadow-sm text-gray-900 sm:text-sm dark:bg-slate-700 dark:text-white w-full max-[700px]:text-sm max-[840px]:w-[80vw]" onChange={handleStudentChange} defaultValue="">
              <option value="" disabled>Select a student</option>
              {students && students?.map((item: any, index: number) =>
                <option value={item.id} key={"student" + index}>{item.firstName + " " + item.lastName}</option>
              )}
            </select>
            : mode === 0 &&
            <select className="bg-white border border-slate-300 rounded-md shadow-sm text-gray-900 sm:text-sm dark:bg-slate-700 dark:text-white w-full max-[700px]:text-sm max-[840px]:w-[80vw]" onChange={handleClassChange} defaultValue="">
              <option value="" disabled>Select a class</option>
              <option value="CompSci1">CompSci1</option>
              <option value="PE2">PE2</option>
            </select>
          }
        </div>

        <div className="py-4 flex justify-center items-center w-full">
          <select className="bg-white border border-slate-300 rounded-md shadow-sm text-gray-900 sm:text-sm dark:bg-slate-700 dark:text-white w-full max-[700px]:text-sm max-[840px]:w-[80vw]" onChange={handleCategoryChange} defaultValue="">
            <option value="" disabled>Select a subject</option>
            {subjects && subjects.map((item: any, index: number) =>
              <option value={item.subject_id} key={"subject" + index}>{item.subject_name}</option>
            )}
          </select>
        </div>
      </div>
      <ProgressChart student={student} subject={subject} className={classType} />
      {
        units.length > 0 && mode === 1 &&
        <div className="w-full mt-10 p-5 bg-slate-700 rounded-md">
          <h1 className="text-xl font-bold mb-6 dark:text-white mt-3">View Incorrect Words</h1>
          <select className="bg-white border border-slate-300 rounded-md shadow-sm text-gray-900 sm:text-sm dark:bg-slate-700 dark:text-white w-full max-[700px]:text-sm max-[840px]:w-[80vw]" onChange={handleUnitChange} defaultValue="">
            <option value="" disabled>Select Unit</option>
            {units.length > 0 && units.map((item: any, index: number) =>
              <option value={item.unit_id} key={"unit" + index}>{item.unit_name}</option>
            )}
          </select>

          <table className='mt-5 w-full border-collapse'>
            <thead className='dark:text-white'>
              <tr className="">
                <th>No.</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='dark:text-white'>
              {flashcardScore.length > 0 ? flashcardScore.map((item: any, index: number) =>
                <tr className={index % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600'} key={"flashcard" + index}>
                  <td className={index % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600 max-[650px]:text-sm'}>{index + 1}</td>
                  <td className={index % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600 max-[650px]:text-sm'}>{item.createdAt.split('T')[0]}</td>
                  <td className={index % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600 max-[650px]:text-sm'}>{item.createdAt.split('T')[1].split('.')[0]}</td>
                  <td className={index % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600 max-[650px]:text-sm'}><button className="hover:underline" onClick={() => setFlashIndex(index)}>View</button></td>
                </tr>
              ) : <tr className="bg-slate-700"><td colSpan={4} className="text-center dark:text-white dark:bg-slate-700"><Empty /></td></tr>}
            </tbody>
          </table>
          {feedback.length > 0 &&
            <>
              <h1 className="text-xl font-bold mb-6 dark:text-white mt-3">Active Recall Feedback</h1>
              {feedback.map((item: any, index: number) =>
                <div className="flex flex-col gap-2 mt-2" key={"feedback" + index}>
                  <h1 className="text-white">- {item.createdAt?.split('T')[0] + " " + item.createdAt?.split('T')[1].split('.')[0]}</h1>
                  <p className="text-white ml-2">Answer: {item.answer}</p>
                  <p className="text-white ml-2">Feedback: {item.feedback}</p>
                </div>
              )}
            </>
          }
        </div>
      }

      <Modal title={<span className="text-white text-xl">Incorrect Words</span>} open={flashIndex !== -1} onCancel={() => handleCancel(-1)} footer={null} styles={{
        header: {
          background: 'rgb(51, 65, 85)',  // slate-800
          color: 'white'
        },
        content: {
          background: 'rgb(51, 65, 85)',  // slate-800
          color: 'white'
        }
      }}>
        {
          flashcardScore.length > 0 ? (
            <ul>
              {flashIndex !== -1 && flashcardScore[flashIndex].terms.map((word: any, index: number) => {
                return <div key={"flash" + index}>
                  <li className='text-md font-bold list-disc list-inside space-y-2 text-white'>{word.term}</li>
                  <li className='text-md ml-3 text-white'>{word.definition}</li>
                </div>
              })}
            </ul>
          ) : (
            <p>No incorrect words yet.</p>
          )}
      </Modal>
      <Modal open={showHelp} onCancel={() => setShowHelp(false)} footer={null}>
        <div className="tutorial-overlay rounded-md p-5">
          <div className="tutorial-content space-y-2">
            <h2 className='text-xl text-center'>Teacher Dashboard</h2>
            <iframe
              className='w-full h-[315px]'
              src="https://www.youtube.com/embed/CFg79SuttyQ"
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

export default WithAuth(TeacherPage);