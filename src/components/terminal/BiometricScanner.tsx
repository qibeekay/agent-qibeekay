import { Fingerprint } from "lucide-react";
import { motion } from "motion/react";

const BiometricScanner = () => {
  return (
    <div className="relative w-64 h-64 border border-red-600/30 rounded-lg overflow-hidden bg-black/40 flex items-center justify-center">
      {/* background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255, 0, 0, .3) 25%, rgba(255, 0, 0, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, .3) 75%, rgba(255, 0, 0, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 0, 0, .3) 25%, rgba(255, 0, 0, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, .3) 75%, rgba(255, 0, 0, .3) 76%, transparent 77%, transparent)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Fingerprint Icon */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <Fingerprint className="w-32 h-32 text-red-500/50" strokeWidth={1} />
      </motion.div>

      {/* Scanning Line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-2 bg-red-400 shadow-[0_0_15px_rgba(74,222,128,0.8)]"
        initial={{
          top: "0%",
        }}
        animate={{
          top: "100%",
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse",
        }}
      />

      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-500" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-500" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-500" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-500" />

      {/* Status Text */}
      <div className="absolute bottom-4 left-0 w-full text-center">
        <motion.span
          className="text-xs font-mono text-red-600 bg-black/60 px-2 py-1"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          ACQUIRING BIOMETRICS...
        </motion.span>
      </div>
    </div>
  );
};

export default BiometricScanner;
