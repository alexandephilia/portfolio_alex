import { useEffect, useState } from "react";

const TerminalLoader = () => {
    const [lines, setLines] = useState<Array<{ char: string; revealed: boolean }[]>>([[]]);
    const loadingText = [

        "$ establishing_connection",
    ];
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    // Handle typing and immediate reveal of characters
    useEffect(() => {
        if (currentLineIndex >= loadingText.length) return;
        const currentLine = loadingText[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timer = setTimeout(() => {
                // Add new character as revealed
                setLines(prev => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = [
                        ...newLines[currentLineIndex],
                        { char: currentLine[currentCharIndex], revealed: false }
                    ];

                    // Reveal the character after a brief delay
                    setTimeout(() => {
                        setLines(prevLines => {
                            const updatedLines = [...prevLines];
                            updatedLines[currentLineIndex][currentCharIndex].revealed = true;
                            return updatedLines;
                        });
                    }, 100); // Adjust this delay to control when the character reveals after typing

                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            }, 35); // Typing speed
            return () => clearTimeout(timer);
        } else {
            // Move to next line after current line is complete
            const nextLineTimer = setTimeout(() => {
                if (currentLineIndex < loadingText.length - 1) {
                    setCurrentLineIndex(prev => prev + 1);
                    setCurrentCharIndex(0);
                    setLines(prev => [...prev, []]);
                }
            }, 400); // Delay before next line
            return () => clearTimeout(nextLineTimer);
        }
    }, [currentLineIndex, currentCharIndex]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <pre className="font-mono text-sm sm:text-base text-foreground">
                {lines.map((line, lineIndex) => (
                    <div key={lineIndex}>
                        {line.map((char, charIndex) => (
                            <span
                                key={charIndex}
                                className={`inline-block transition-all duration-300
                  ${char.revealed ? 'blur-none opacity-100' : 'blur-[4px] opacity-40'}`}
                            >
                                {char.char}
                            </span>
                        ))}
                        {lineIndex === currentLineIndex && (
                            <span className="animate-pulse inline-block">_</span>
                        )}
                    </div>
                ))}
            </pre>
        </div>
    );
};

export default TerminalLoader; 