import { useState, useEffect } from "react";

export type TerminalPhase =
  | "boot"
  | "security"
  | "biometric"
  | "briefing"
  | "ready"
  | "breach"
  | "complete";

export function useTerminalSequence(onComplete?: () => void) {
  const [phase, setPhase] = useState<TerminalPhase>("boot");

  useEffect(() => {
    // Sequence timing
    const sequence = [
      { phase: "boot", duration: 2000 },
      { phase: "security", duration: 3000 },
      { phase: "biometric", duration: 3000 },
      { phase: "briefing", duration: 1000 }, // Briefing stays until user interaction
    ];

    let currentIndex = 0;

    const runSequence = () => {
      if (currentIndex >= sequence.length) {
        setPhase("briefing"); // Stop at briefing, wait for user
        return;
      }

      const step = sequence[currentIndex];
      setPhase(step.phase as TerminalPhase);

      // If it's the last auto-step (briefing), we don't auto-advance
      if (step.phase === "briefing") {
        setTimeout(() => {
          setPhase("ready"); // Enable the button
        }, step.duration);
        return;
      }

      currentIndex++;
      setTimeout(runSequence, step.duration);
    };

    runSequence();
  }, []);

  const triggerBreach = () => {
    setPhase("breach");
    // Breach animation duration
    setTimeout(() => {
      setPhase("complete");
      if (onComplete) {
        setTimeout(onComplete, 2000); // Wait a bit in 'complete' state before switching
      }
    }, 2500);
  };

  return { phase, triggerBreach };
}
