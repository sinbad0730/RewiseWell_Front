import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../challenge/component/button";
import { Textarea } from "../../challenge/component/textarea";
import { Input } from "../../challenge/component/input";
import { SendHorizonal, RefreshCw } from "lucide-react";


export default function ChatInput({ userId , keyterms, unitName, messages, setMessages , setSubmits}: any) {

  const [inputValue, setInputValue] = useState(messages);

  const resetChat = () => {
    // Limpa o campo de entrada e o estado principal
    setInputValue("");
    setMessages("");
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return; // Não envia mensagens vazias
    setMessages(inputValue); // Envia a mensagem para o estado principal
    setSubmits(true); // Indica que a mensagem foi enviada
    setInputValue(""); // Limpa o campo de entrada
  };

//   if (!data?.currentTopic && !topic) {
//     return (
//       <form className="p-4 border-t border-white-700 bg-white-900">
//         <div className="flex gap-2">
//           <Input
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             placeholder="Enter a topic to study..."
//             className="bg-white-800 border-white-700 text-white-100 placeholder:text-white-400"
//           />
//           <Button 
//             onClick={() => topic && mutation.mutate("Hello! I'd like to learn about this topic.")}
//             className="bg-purple-600 hover:bg-purple-700"
//             disabled={!topic.trim()}
//           >
//             Start
//           </Button>
//         </div>
//       </form>
//     );
//   }

  return (
    <div className="p-4 border-t border-green-700/30 bg-black">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={resetChat}
          className="self-end border-green-700/30 text-green-400 hover:text-green-300 hover:bg-green-900/20"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask about ${keyterms !== "" ? keyterms : unitName} ...`}
          className="min-h-[80px] bg-green-900/10 border-green-700/30 text-green-100 placeholder:text-green-700 resize-y font-mono"
        />
        <Button
          onClick={handleSubmit}
          className="self-end bg-green-600 hover:bg-green-700"
          disabled={inputValue === ""}
        >
          <SendHorizonal className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
}