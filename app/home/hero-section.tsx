import { motion } from "framer-motion";
import { Button } from "../challenge/component/button";
import { ArrowRight, BookOpen, Brain, Target } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Abstract Neural Network Background */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" />
            </linearGradient>
          </defs>
          <g className="text-primary">
            {/* Neural Network Nodes */}
            <circle cx="20" cy="20" r="2" fill="currentColor" />
            <circle cx="50" cy="15" r="2" fill="currentColor" />
            <circle cx="80" cy="25" r="2" fill="currentColor" />
            <circle cx="30" cy="50" r="2" fill="currentColor" />
            <circle cx="70" cy="55" r="2" fill="currentColor" />
            <circle cx="45" cy="80" r="2" fill="currentColor" />
            {/* Neural Network Connections */}
            <path d="M20 20 L50 15" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 15 L80 25" stroke="currentColor" strokeWidth="0.5" />
            <path d="M30 50 L50 15" stroke="currentColor" strokeWidth="0.5" />
            <path d="M30 50 L70 55" stroke="currentColor" strokeWidth="0.5" />
            <path d="M70 55 L45 80" stroke="currentColor" strokeWidth="0.5" />
            <path d="M20 20 L45 80" stroke="currentColor" strokeWidth="0.5" />
          </g>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-foreground sm:text-7xl">
            Learn{" "}
            <span className="relative whitespace-nowrap text-primary">
              <span className="relative">Smarter</span>
            </span>{" "}
            with ReviseWell
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-muted-foreground">
            Transform your learning experience with our innovative educational platform. 
            Master concepts faster and retain information longer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex justify-center gap-x-6"
        >
          <Button size="lg">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-36 lg:mt-44"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">Trusted by students worldwide</span>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-x-8 sm:gap-x-12 lg:gap-x-24">
            {[
              { icon: BookOpen, label: "Interactive Learning" },
              { icon: Brain, label: "Smart Review" },
              { icon: Target, label: "Focused Practice" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <item.icon className="h-8 w-8 text-primary" />
                <span className="mt-2 text-sm font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}