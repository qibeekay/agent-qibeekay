import { ChevronRight, FileText } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "../../utils/contants";
import PortfolioProject from "./PortfolioProject";
import AgentResume from "./AgentResume";
import { useState } from "react";
import ContactSection from "./ContactSection";
import SocialSection from "./SocialSection";
import TerminalFooter from "./TerminalFooter";
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
              {/* <p className="max-w-xl text-neutral-400 text-lg leading-relaxed">
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
              </button> */}
              <div className="flex flex-col gap-8 items-start ">
                <p className="max-w-xl text-neutral-400 text-sm font-mono leading-relaxed border-l-2 border-red-600 pl-6">
                  Decrypted documentation of active software deployments. All
                  assets listed are under strict version control. Unauthorized
                  access will trigger a{" "}
                  <span className="text-white">Hard-Reset</span> of the local
                  node.
                </p>
                <button
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold transition-all flex items-center gap-3 group"
                  onClick={() => setModal(true)}
                >
                  <FileText className="w-4 h-4" />
                  DOWNLOAD_AGENT_DOSSIER.PDF
                </button>
              </div>
            </div>
            {/* <div className="hidden md:block text-right font-mono text-xs text-neutral-600 space-y-2">
              <p>ID: 8492-XK-29</p>
              <p>STATUS: ACTIVE</p>
              <p>LOC: [REDACTED]</p>
            </div> */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden lg:block relative"
            >
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 border border-red-500/20 rotate-3" />
                <div className="absolute inset-0 border border-white/10 -rotate-3" />
                <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur p-6 font-mono text-xs space-y-2">
                  <div className="flex justify-between text-neutral-500">
                    <span>NO:</span>
                    <span className="text-red-400">+234-706-094-9923</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>STATUS:</span>
                    <span className="text-green-500">ACTIVE</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>EMAIL:</span>
                    <span>mokwechbuike7@gmail.com</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>ROLE:</span>
                    <span>SOFTWARE ENGINEER</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-neutral-600 mb-2">BIOMETRICS</div>
                    <div className="h-16 flex items-end gap-1">
                      {[40, 70, 50, 90, 60, 80, 45, 95].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-red-500/20 hover:bg-red-500/40 transition-colors"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* project section */}
        <PortfolioProject />

        <SocialSection />

        <ContactSection />

        {/* Footer */}
        <TerminalFooter />
      </div>

      {modal && <AgentResume onClose={closeModal} />}
    </div>
  );
};

export default Portfolio;
