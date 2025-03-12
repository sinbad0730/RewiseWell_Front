import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { QuestionModal } from "./QuestionModal";

interface Flashcard {
  term: string;
  definition: string;
}

interface IncorrectListProps {
  incorrectList: {
    userId: string;
    subjectId: string;
    unitId: string;
    terms: Flashcard[];
    createdAt: string;
  }[];
}

const IncorrectList = ({ incorrectList }: IncorrectListProps) => {
  const [selectedTerm, setSelectedTerm] = useState<Flashcard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!incorrectList || incorrectList.length === 0) {
    return (
      <Card 
        className="p-6"
        style={{ backgroundColor: '#070D0A', borderColor: '#0E5936', borderWidth: '2px' }}
      >
        <div className="text-center" style={{ color: '#177337' }}>
          No incorrect flashcards found.
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {incorrectList.map((list, index) => (
          <Card 
            key={index} 
            className="p-6"
            style={{ backgroundColor: '#070D0A', borderColor: '#0E5936', borderWidth: '2px' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold" style={{ color: '#03A678' }}>
                Incorrect Words List
              </h2>
              <span className="text-sm" style={{ color: '#177337' }}>
                {format(new Date(list.createdAt), "MMM dd, yyyy")}
              </span>
            </div>

            <div className="divide-y" style={{ borderColor: '#0E5936' }}>
              {list.terms.map((item, termIndex) => (
                <div key={termIndex} className="py-4 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-1" style={{ color: '#48D97A' }}>
                      {item.term}
                    </h3>
                    <p style={{ color: '#177337' }}>
                      {item.definition}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => {
                      setSelectedTerm(item);
                      setIsModalOpen(true);
                    }}
                    style={{
                      borderColor: '#03A678',
                      color: '#03A678'
                    }}
                  >
                    <Wand2 className="h-4 w-4" />
                    Generate Question
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {selectedTerm && (
        <QuestionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTerm(null);
          }}
          term={selectedTerm.term}
          definition={selectedTerm.definition}
        />
      )}
    </>
  );
};

export default IncorrectList;