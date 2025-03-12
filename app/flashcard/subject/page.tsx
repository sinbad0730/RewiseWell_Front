"use client";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import WithAuth from "@/components/Layout/WithLayout";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";
const subjects = {
    1: {
        title: "Computer Science",
        description: "Dive into the world of computing and programming. Our computer science curriculum covers everything from basic programming concepts to advanced algorithms and data structures.",
        topics: ["Programming Fundamentals", "Web Development", "Data Structures", "Algorithms", "Database Systems"],
        image: "https://images.unsplash.com/photo-1629481317043-16b1343d77d9",
        color: "#3B82F6"
    },
    14: {
        title: "Physical Education",
        description: "Develop your physical fitness and sports skills through our comprehensive physical education program. Learn about health, teamwork, and various sports disciplines.",
        topics: ["Team Sports", "Individual Sports", "Fitness Training", "Health Education", "Sports Psychology"],
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
        color: "#22C55E"
    },
    15: {
        title: "Business",
        description: "Learn essential business concepts and develop entrepreneurial skills. Our business curriculum prepares you for the modern business world through practical experience and theory.",
        topics: ["Management", "Marketing", "Finance", "Entrepreneurship", "Business Strategy"],
        image: "https://images.unsplash.com/photo-1444653389962-8149286c578a",
        color: "#8B5CF6"
    }
};

const Subject = () => {
    const searchParams = useSearchParams();
    const subjectId = parseInt(searchParams?.get('subject_id') || '0');
    const [units, setUnits] = useState([]);

    const subject = subjects[subjectId as keyof typeof subjects];
    const router = useRouter();

    useEffect(() => {
        fetchUnitsNames(subjectId);
    }, []);

    const fetchUnitsNames = async (subject_id: number) => {
        const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token;

        try {
            const response = await axios.get(`${API_BASE_URL}/grade-retrieval/${subject_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUnits(response.data);
        } catch (error) {
            console.error('Error fetching units:', error);
            throw error;
        }
    };
    return (
        <div className="min-h-screen bg-background">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={subject.image}
                    alt={subject.title}
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{ backgroundColor: subject.color }}
                />
                <Button
                    variant="outline"
                    className="absolute top-4 left-4 bg-background/80 hover:bg-background text-white"
                    onClick={() => router.push('/flashcard')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative"
            >
                <div className="bg-card rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        {subject.title}
                    </h1>
                    <p className="text-foreground/90 mb-8">
                        {subject.description}
                    </p>

                    <h2 className="text-xl font-semibold text-foreground mb-4">
                        Key Topics
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {units?.map((topic:any, index:any) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center p-4 bg-slate-700 rounded-lg cursor-pointer"
                                onClick={()=> {router.push(`/flashcard/subject/units?id=${topic.unit_id}`)}}
                            >
                                
                                <div
                                    className="w-2 h-2 rounded-full mr-3"
                                    style={{ backgroundColor: subject.color }}
                                />
                                <span className="text-white">{topic.unit_name}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}

export default WithAuth(Subject);