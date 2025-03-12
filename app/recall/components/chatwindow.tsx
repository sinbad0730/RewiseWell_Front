import { useEffect, useRef } from "react";
import { ScrollArea } from "../../challenge/component/scroll-area";
import { Loader2 } from "lucide-react";
import ChatMessage from "./chatmessage";

export default function ChatWindow({  isLoading, answerResult }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answerResult]);

  return (
    <ScrollArea className="flex-1 h-[calc(100%-120px)]">
      <div className="divide-y divide-gray-700">
        {answerResult?.length > 0 && answerResult.map((question: any, index: any) => (
          <div key={index}>
            <ChatMessage message={question.question} isAI={false} />
            <ChatMessage message={question.feedback} isAI={true} />
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-white-100" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
