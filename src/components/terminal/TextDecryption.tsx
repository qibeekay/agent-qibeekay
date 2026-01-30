import { useEffect, useState } from "react";
import type { DecryptTextProps } from "../../types";
import { motion } from "motion/react";

const CHARS = "ANUGOCHIBUIKEMOKWE07060949923!@#$%^&*()_+-=[]{}|;:,.<>?";
const TextDecryption = ({
  text,
  speed = 50,
  className = "",
  reveal = true,
}: DecryptTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!reveal) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => {
        const result = text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        return result;
      });
      if (iteration >= text.length) {
        setIsComplete(true);
        clearInterval(interval);
      }
      iteration += 1 / 3; // Slow down the reveal relative to the scramble
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, reveal]);
  return (
    <div>
      <motion.span
        className={`font-mono ${className}`}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        {displayText}
        {!isComplete && reveal && (
          <span className="inline-block w-2 h-4 bg-red-600 ml-1 animate-pulse" />
        )}
      </motion.span>
    </div>
  );
};

export default TextDecryption;
