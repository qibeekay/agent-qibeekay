import { ChevronRight, FileText } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "../../utils/contants";
import PortfolioProject from "./PortfolioProject";
import AgentResume from "./AgentResume";
import { useState } from "react";
const Portfolio = () => {
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-red-900 selection:text-white overflow-x-hidden">
      {/* background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-white/5 bg-white/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <motion.header
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
          className="mb-24 border-b border-white/10 pb-12"
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 text-red-500 mb-4">
                <FileText className="w-5 h-5" />
                <span className="text-sm tracking-[0.3em] font-mono">
                  OPERATIVE MISSION FILE // {new Date().getFullYear()}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                OPERATIVE
                <br />
                PORTFOLIO
              </h1>
              <p className="max-w-xl text-neutral-400 text-lg leading-relaxed">
                The following files contain classified records of past
                operations. Clearance level:{" "}
                <span className="text-red-500 font-bold">OMEGA</span>. Proceed
                with caution.
              </p>

              <button
                className="font-bold text-red-500 cursor-pointer"
                onClick={() => setModal(true)}
              >
                View Resume
              </button>
            </div>
            <div className="hidden md:block text-right font-mono text-xs text-neutral-600 space-y-2">
              <p>ID: 8492-XK-29</p>
              <p>STATUS: ACTIVE</p>
              <p>LOC: [REDACTED]</p>
            </div>
          </div>
        </motion.header>

        {/* project section */}
        <PortfolioProject />
      </div>

      {modal && <AgentResume onClose={closeModal} />}
    </div>
  );
};

export default Portfolio;
