import { useState } from "react";
import "./style.css"

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface SpeechToTextProps {
    onTranscriptChange: (transcript: string) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscriptChange }) => {
    const [transcript, setTranscript] = useState<string>("");
    const [isListening, setIsListening] = useState<boolean>(false);

    const handleStart = () => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition =
                (window as any).SpeechRecognition ||
                (window as any).webkitSpeechRecognition;

            const recognition = new SpeechRecognition();
            recognition.lang = "en-US";
            recognition.interimResults = false;
            recognition.continuous = true;

            recognition.onstart = () => {
                setIsListening(true);
                console.log("Voice recognition started");
            };

            recognition.onresult = (event: any) => {
                const results = event.results;
                const lastResult = results[results.length - 1];
                const currentTranscript = lastResult[0].transcript;
                setTranscript((prev) => prev + currentTranscript);
                onTranscriptChange?.(currentTranscript);
            };

            recognition.onerror = (event: any) => {
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
                console.log("Voice recognition stopped");
            };

            recognition.start();
        } else {
            alert("Speech recognition not supported in this browser.");
        }
    };

    const handleStop = () => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition =
                (window as any).SpeechRecognition ||
                (window as any).webkitSpeechRecognition;

            const recognition = new SpeechRecognition();
            recognition.stop();
            setIsListening(false);
        }
    };

    return (
        <div>
            {
                !isListening ? (
                    <button className="bg-blue-500 rounded px-4 py-2 text-white hover:bg-blue-700" onClick={handleStart}>
                        Speech-To-Text
                    </button>
                ) : (<button className="bg-green-500 rounded px-4 py-2 text-white hover:bg-green-700" onClick={handleStop}>
                    Stop Recording
                </button>)
            }
            {/* <input
                id="checkboxInput"
                type="checkbox"
                checked={isListening}
                onChange={(e) => e.target.checked ? handleStart() : handleStop()}
            />
            <label className="toggleSwitch" htmlFor="checkboxInput">
                <div className="speaker">
                    <svg viewBox="0 0 75 75" version="1.0" xmlns="http://www.w3.org/2000/svg">
                        <path
                            style={{ stroke: "#fff", strokeWidth: 5, strokeLinejoin: "round", fill: "#fff" }}
                            d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                        ></path>
                        <path
                            style={{ fill: "none", stroke: "#fff", strokeWidth: 5, strokeLinecap: "round" }}
                            d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                        ></path>
                    </svg>
                </div>

                <div className="mute-speaker">
                    <svg strokeWidth="5" stroke="#fff" viewBox="0 0 75 75" version="1.0">
                        <path
                            style={{ strokeLinejoin: "round", fill: "#fff" }}
                            fill="#fff"
                            d="m39,14-17,15H6V48H22l17,15z"
                        ></path>
                        <path
                            style={{ strokeLinecap: "round", fill: "#fff" }}
                            d="m49,26 20,24m0-24-20,24"
                        ></path>
                    </svg>
                   
                </div>
            </label> */}
        </div>
    );
};

export default SpeechToText;
