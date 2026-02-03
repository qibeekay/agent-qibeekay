import { AnimatePresence, motion } from "motion/react";
import { missions, skills } from "../../utils/contants";
import { Briefcase, Shield, Target } from "lucide-react";
import Redacted from "./Redacted";
import img from "../../assets/img.jpeg";
import { useProjects } from "../../hooks/useProjects";
import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
}

const AgentResume = ({ onClose }: ModalProps) => {
  const { projects, loading, error, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-80 h-screen bg-[#2a1a0f]/50 backdrop-blur-sm flex justify-center items-start overflow-y-auto"
        onClick={onClose}
        variants={backdropVariants}
      >
        <motion.div
          className="w-5xl bg-[#f4e8d0] text-[#1a1a1a] rounded-sm shadow-2xl relative overflow-y-auto my-8 h-207.5"
          initial={{
            y: 50,
            rotateX: 10,
          }}
          animate={{
            y: 0,
            rotateX: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          style={{
            transformOrigin: "top",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Paper Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]"></div>

          {/* Top Secret Stamp Background */}
          <div className="absolute top-60 ms:top-1/2 left-1/2 transform -translate-x-1/2 ms:-translate-y-1/2 opacity-5 pointer-events-none rotate-[-30deg] border-8 border-red-900 text-red-900 text-3xl sm:text-5xl ms:text-7xl lg:text-9xl font-black p-4 uppercase tracking-widest whitespace-nowrap">
            Top Secret
          </div>

          {/* Header Tab */}
          <div className="absolute top-0 right-8 w-48 h-12 bg-[#E8DCC0] rounded-b-lg shadow-md border-b border-l border-r border-[#D4C8B0] flex items-center justify-center">
            <span className="font-mono text-sm tracking-widest text-[#5C4033] font-bold">
              IMF-892-X
            </span>
          </div>

          {/* body */}
          <div className="p-8 md:p-12 relative z-10">
            {/* Header */}
            <header className="border-b-4 border-[#3D2817] pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                  className="inline-block border-4 border-[#C41E3A] text-[#C41E3A] px-4 py-1 text-xl font-black uppercase tracking-widest transform -rotate-2 mb-4"
                >
                  Confidential
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black text-[#1a1a1a] tracking-tighter uppercase font-serif">
                  Anugo Mokwe
                </h1>
                <p className="font-mono text-[#5C4033] mt-2 tracking-widest">
                  CODENAME: QI_BEEKAY
                </p>
              </div>
              <div className="text-right font-mono text-sm text-[#5C4033]">
                <p>CLEARANCE: SOFTWARE ENGINEER</p>
                <p>ORIGIN: WORLDWIDE</p>
                <p>STATUS: ACTIVE</p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Left Column: Profile */}
              <div className="md:col-span-4 space-y-8">
                {/* Photo */}
                <motion.div
                  className="relative bg-white p-2 shadow-lg transform rotate-1"
                  initial={{
                    scale: 0.9,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.8,
                  }}
                >
                  <div className="aspect-3/4 bg-gray-200 relative overflow-hidden grayscale contrast-125">
                    <div className="absolute inset-0 bg-cover bg-center opacity-80">
                      <img src={img} alt="" />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-mono text-xs">
                      NO: 234-706-094-9923
                      <br />
                      LOC: [REDACTED]
                    </div>
                    <div className="absolute top-4 -right-5 bg-[#C41E3A] text-white text-xs font-bold px-8 py-1 transform rotate-45 shadow-md">
                      CLASSIFIED
                    </div>
                  </div>
                  {/* Paperclip */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-16 border-4 border-gray-400 rounded-full z-20"></div>
                </motion.div>

                {/* Skills */}
                <div className="bg-[#E8DCC0] p-6 rounded shadow-inner border border-[#D4C8B0]">
                  <h3 className="font-bold text-[#3D2817] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Operational Skills
                  </h3>
                  <div className="space-y-4">
                    {skills.map((skill, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-xs font-mono mb-1 font-bold">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-[#D4C8B0] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#3D2817]"
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${skill.level}%`,
                            }}
                            transition={{
                              delay: 1 + idx * 0.2,
                              duration: 1,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Content */}
              <div className="md:col-span-8 space-y-10">
                {/* Biography with Redactions */}
                <section>
                  <h3 className="font-bold text-[#3D2817] uppercase tracking-widest mb-4 border-b border-[#D4C8B0] pb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Background Check
                  </h3>
                  <div className="font-mono text-sm leading-relaxed text-[#333] space-y-4">
                    <div className="font-mono text-sm leading-relaxed text-[#333] space-y-4">
                      <p>
                        Subject <strong>ANUGO MOKWE</strong> operates as a
                        primary architect in Frontend and
                        <Redacted>Backend </Redacted> Synchronicity. High
                        proficiency in React-based tactical interfaces and PHP
                        server-side intelligence.
                      </p>
                      <p>
                        Intelligence suggests involvement in the dismantling of
                        <span className="bg-black text-black px-1">
                          Technical Debt Syndicates
                        </span>
                        . Field reports confirm Subject specializes in{" "}
                        <Redacted>Clean Code Protocol</Redacted>
                        and architectural integrity.
                      </p>
                      <p>
                        Status:{" "}
                        <span className="font-bold text-[#C41E3A]">
                          DEPLOYMENT READY
                        </span>
                        . Clearance level grants access to all repositories and
                        root-level administrative functions.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Mission Reports */}
                <section>
                  <h3 className="font-bold text-[#3D2817] uppercase tracking-widest mb-6 border-b border-[#D4C8B0] pb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Mission Log
                  </h3>

                  <div className="grid grid-cols-1 gap-6">
                    {projects.slice(0, 3).map((mission, idx) => (
                      <motion.div
                        key={mission.id}
                        className="bg-white p-6 shadow-md border-l-4 border-[#3D2817] relative group cursor-pointer"
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 1.5 + idx * 0.2,
                        }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg font-serif">
                            {mission.title}
                          </h4>
                        </div>
                        <div className="font-mono text-xs text-[#C41E3A] mb-3">
                          {mission.id} // {mission.status.toUpperCase()}
                        </div>

                        <p className="text-sm text-gray-700 mb-4 font-mono">
                          {mission.description}
                        </p>
                        <div className="flex gap-2">
                          {mission.tech.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] uppercase tracking-wider bg-gray-100 px-2 py-1 text-gray-600 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 rotate-[-15deg] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none border-4 border-[#C41E3A] text-[#C41E3A] p-2 font-black text-2xl uppercase">
                          {mission.status}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgentResume;
