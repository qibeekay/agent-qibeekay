import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Lock, Fingerprint, ShieldAlert } from "lucide-react";
import { useTerminalSequence } from "../../hooks/useTerminalSequence";
interface MissionBriefingProps {
  onExplode: () => void;
}
export function MissionBriefing({ onExplode }: MissionBriefingProps) {
  const { phase, triggerBreach } = useTerminalSequence();

  const [count, setCount] = useState(10.0);
  const [status, setStatus] = useState<"idle" | "accelerating">("idle");
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  // Normal countdown
  useEffect(() => {
    if (status === "idle") {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev <= 0) return 0;
          return Math.max(0, prev - 0.01);
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [status]);
  // Accelerated countdown sequence
  useEffect(() => {
    if (status === "accelerating" && phase === "breach") {
      const duration = 1500; // 1.5s to reach zero
      const startValue = count;
      const startTime = performance.now();
      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Exponential decay for dramatic effect
        const current = startValue * (1 - progress);
        setCount(current);
        if (progress < 1) {
          requestRef.current = requestAnimationFrame(animate);
        } else {
          setCount(0);
          onExplode();
        }
      };
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }
  }, [status, onExplode]);

  const handleAccept = () => {
    setStatus("accelerating");
    triggerBreach();
  };
  // Shake variants
  const containerVariants = {
    idle: {
      x: 0,
      y: 0,
      rotate: 0,
    },
    accelerating: {
      x: [0, -10, 10, -10, 10, 0],
      y: [0, -10, 10, -5, 5, 0],
      rotate: [0, -1, 1, -1, 1, 0],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };
  return (
    <motion.div
      className="fixed inset-0 bg-black text-red-600 font-mono overflow-hidden flex flex-col items-center justify-center z-10"
      variants={containerVariants}
      animate={status}
    >
      {/* Background Grid & Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,0,0,0.5)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] pointer-events-none" />

      {/* Flashing Warning Borders */}
      <motion.div
        className="absolute inset-0 border-20 border-red-900/30 pointer-events-none"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />

      {/* Corner Markers */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-red-600" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-red-600" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-red-600" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-red-600" />

      {/* Top Secret Header */}
      <div className="absolute top-12 w-full text-center space-y-2">
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="inline-flex items-center gap-2 border border-red-600/50 px-4 py-1 bg-red-950/20"
        >
          <Lock className="w-4 h-4" />
          <span className="tracking-[0.5em] text-sm font-bold">
            TOP SECRET // EYES ONLY
          </span>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full px-4">
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          className="mb-12 text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-3 text-red-500 mb-4">
            <ShieldAlert className="w-8 h-8 animate-pulse" />
            <h1 className="text-3xl font-bold tracking-tighter">
              MISSION BRIEFING
            </h1>
            <ShieldAlert className="w-8 h-8 animate-pulse" />
          </div>

          <p className="text-red-400/80 text-lg leading-relaxed max-w-lg mx-auto border-l-2 border-red-900/50 pl-6 text-left font-sans">
            AGENT, YOUR OBJECTIVE IS TO INFILTRATE THE PORTFOLIO SECTOR. TARGET
            CONTAINS HIGH-VALUE DESIGN ASSETS AND CLASSIFIED CODEBASES.
            <br />
            <br />
            <span className="text-white font-bold">WARNING:</span> THIS MESSAGE
            WILL SELF-DESTRUCT IN...
          </p>
        </motion.div>

        {/* The Countdown */}
        <div className="relative mb-16">
          <div className="text-[120px] md:text-[180px] leading-none font-bold tabular-nums tracking-tighter text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]">
            00:{count.toFixed(2).padStart(5, "0")}
          </div>
          <div className="absolute -bottom-4 left-0 w-full flex justify-between text-xs text-red-800 tracking-widest">
            <span>SYS.OVERLOAD</span>
            <span>CRITICAL</span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleAccept}
          disabled={status === "accelerating"}
          className="group relative px-12 py-6 bg-red-600 text-black font-bold text-xl tracking-widest uppercase overflow-hidden clip-path-polygon cursor-pointer"
          animate={
            status === "idle"
              ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(220, 38, 38, 0.4)",
                    "0 0 0 20px rgba(220, 38, 38, 0)",
                  ],
                }
              : {
                  scale: 0.95,
                  opacity: 0.8,
                }
          }
          transition={
            status === "idle"
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                }
              : {}
          }
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center gap-3">
            <Fingerprint className="w-6 h-6" />
            {status === "idle" ? "ACCEPT MISSION" : "ARMING SEQUENCE..."}
          </span>
        </motion.button>
      </div>

      {/* Footer Status */}
      <div className="absolute bottom-8 w-full px-12 flex justify-between text-xs text-red-800 tracking-widest uppercase">
        <div className="flex gap-4">
          <span>Loc: Unknown</span>
          <span>Enc: AES-256</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
          <span>Connection Unstable</span>
        </div>
      </div>
    </motion.div>
  );
}
