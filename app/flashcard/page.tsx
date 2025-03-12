"use client";
import WithAuth from "@/components/Layout/WithLayout";
import { SubjectPanel } from "./subject-panel";
import { motion } from "framer-motion";

const subjects = [
  {
    id: 1,
    title: "Computer Science",
    description: "Explore programming, algorithms, and computational thinking through hands-on projects and problem-solving challenges.",
    image: "https://images.unsplash.com/photo-1629481317043-16b1343d77d9",
    color: "#3B82F6"
  },
  {
    id: 14,
    title: "Physical Education",
    description: "Develop physical fitness, sports skills, and team collaboration through diverse athletic activities.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    color: "#22C55E"
  },
  {
    id: 15,
    title: "Business",
    description: "Learn entrepreneurship, management, and business strategies through real-world case studies and simulations.",
    image: "https://images.unsplash.com/photo-1444653389962-8149286c578a",
    color: "#8B5CF6"
  }
];

const Flashcards = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Choose Your Subject
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a subject to explore detailed information and begin your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <SubjectPanel key={subject.id} {...subject} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
export default WithAuth(Flashcards);