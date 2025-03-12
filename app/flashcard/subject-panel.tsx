"use client";
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

interface SubjectPanelProps {
  id: Number;
  title: string;
  description: string;
  image: string;
  color: string;
}

export function SubjectPanel({ id, title, description, image, color }: SubjectPanelProps) {
    const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => router.push(`/flashcard/subject?subject_id=${id}`)}
    >
      <Card className="overflow-hidden cursor-pointer h-full">
        <div className="relative h-48">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div 
            className="absolute inset-0 opacity-10"
            style={{ backgroundColor: color }}
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-sm text-foreground/80">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}