import { useState, ChangeEvent } from 'react';

const TextToSpeech = ({ speechText }: { speechText: string }) => {
    const [text, setText] = useState<string>(speechText);

    // Handle input text change
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    // Handle text-to-speech functionality
    const handleSpeak = () => {
        if (!text) return;

        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-US';  // You can change the language if needed
        speech.volume = 1;      // Volume range (0 to 1)
        speech.rate = 1;        // Speech rate range (0.1 to 10)
        speech.pitch = 1;       // Pitch range (0 to 2)

        // Speak the text
        window.speechSynthesis.speak(speech);
    };

    return (
        <div>
            <button onClick={handleSpeak} className='bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-600'>
                <p className='text-sm text-white'>Listen-To-Text</p>
            </button>
        </div>
    );
};

export default TextToSpeech;
