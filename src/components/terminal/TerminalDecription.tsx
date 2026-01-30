import { Terminal } from "lucide-react";
import { useTerminalSequence } from "../../hooks/useTerminalSequence";
import { MatrixRain } from "./MatrixRain";
import { motion } from "motion/react";
import { div } from "motion/react-client";

interface TerminalDecryptionProps {
  onComplete?: () => void;
}
const TerminalDecription = ({ onComplete }: TerminalDecryptionProps) => {
  const { phase, triggerBreach } = useTerminalSequence(onComplete);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden font-mono text-red-600 selection:bg-red-600/30 selection:text-red-100">
      {/* effects */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%] pointer-events-none" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
        {/* Screen Glow */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,0,0,0.1)]" />
      </div>

      {/* rain background */}
      <MatrixRain />

      {/* details */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        {/* terminal status bar */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center border-b border-red-900/30 bg-black/40 backdrop-blur-sm"
        >
          {/* terminal id */}
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <Terminal className="w-4 h-4" />
            <p>
              TERMINAL_ID: <span className="text-red-300">T0R3N74L_001</span>
            </p>
          </div>

          {/* encryption */}
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline">
              ENCRYPTION: <span className="text-red-300">AES-4096</span>
            </span>
            <span className="animate-pulse text-green-500 font-bold">
              SECURE CONNECTION
            </span>
          </div>
        </motion.header>

        {/* terminal contents */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
          {/* phase 1 boot text */}
          <div className="h-16 flex items-center justify-center">
            {phase !== "boot" && <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TerminalDecription;
