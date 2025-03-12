import { cn } from "../../../utils/utils";
import { Bot, User2 } from "lucide-react";

export default function ChatMessage({ message, isAI }: any) {
  return (
    <div
      className={cn(
        "flex gap-4 p-4 transition-colors font-mono"
      )}
    >
      <div className={cn(
        "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
        isAI ? "bg-green-500/20" : "bg-green-700/20"
      )}>
        {isAI ? (
          <Bot className="h-5 w-5 text-green-400" />
        ) : (
          <User2 className="h-5 w-5 text-green-500" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium text-green-400">
          {isAI ? "Agent" : "You"}
        </p>
        <div className="prose prose-sm max-w-none text-white opacity-65">
          {message}
        </div>
      </div>
    </div>
  );
}
