"use client";
import { useState } from "react";
import Faq from "./Faq";

export default function FaqBox() {
  const [universalCloseTrigger, setUniversalCloseTrigger] = useState(0);

  return (
    <div className="flex flex-col gap-2 max-w-[800px] mx-auto mb-20 p-6">
      <Faq
        index={1}
        universalClose={universalCloseTrigger}
        onChange={(index) => setUniversalCloseTrigger(index)}
        title="1. How does ReviseWell help students?"
        description={`ReviseWell provides instant feedback on past paper questions, helping students quickly assess their understanding and identify areas for improvement.`}
      />
      <Faq
        index={2}
        universalClose={universalCloseTrigger}
        onChange={(index) => setUniversalCloseTrigger(index)}
        title="2. What features are available for teachers?"
        description={`Teachers can create tests, receive instant AI marking, and use grade analysis tools to monitor student progress.`}
      />
      <Faq
        index={3}
        universalClose={universalCloseTrigger}
        onChange={(index) => setUniversalCloseTrigger(index)}
        title="3. How can I join the ReviseWell community?"
        description={`Simply enter your email to join our community and stay updated with the latest features and tools.`}
      />
      <Faq
        index={4}
        universalClose={universalCloseTrigger}
        onChange={(index) => setUniversalCloseTrigger(index)}
        title="4. How does the AI marking feature work?"
        description={`Our AI marking system provides accurate and instant feedback on submitted answers, saving teachers time and effort.`}
      />
      <Faq
        index={5}
        universalClose={universalCloseTrigger}
        onChange={(index) => setUniversalCloseTrigger(index)}
        title="5. Is there support for language learning?"
        description={`Yes, we offer advanced features for English and MFL to help students practice and improve their language skills.`}
      />
    </div>
  );
}
