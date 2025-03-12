import React, { useState } from 'react';

const ActiveRecall: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Example question and expected answer for computer science
  const question = 'Explain the concept of a data structure.';
  const expectedAnswer = 'A data structure is a way to store and organize data efficiently.';

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Simple feedback logic (you can make this more complex if needed)
    if (answer.toLowerCase().includes('data') && answer.toLowerCase().includes('structure')) {
      setFeedback('Good job! You included key terms related to data structures.');
    } else {
      setFeedback('Keep trying! Make sure to mention how data is organized or stored.');
    }
  };

  const handleRetry = () => {
    setAnswer('');
    setFeedback('');
    setIsSubmitted(false);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h2>Active Recall: Computer Science</h2>
      <p>{question}</p>
      
      {!isSubmitted ? (
        <>
          <textarea
            value={answer}
            onChange={handleChange}
            placeholder="Write your answer here..."
            rows={4}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}
          />
          <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Submit Answer
          </button>
        </>
      ) : (
        <>
          <p>{feedback}</p>
          <button onClick={handleRetry} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

export default ActiveRecall;
