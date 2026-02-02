import React from "react";
import { projects } from "../../utils/contants";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const PortfolioProject = () => {
  return (
    <>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1 + index * 0.2,
              duration: 0.6,
            }}
            className="group relative bg-neutral-900/50 border border-white/10 hover:border-red-600/50 transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="p-8 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-white/5 rounded-sm text-red-500 group-hover:text-white group-hover:bg-red-600 transition-colors duration-300">
                  <project.icon className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-neutral-500 border border-white/10 px-2 py-1">
                  {project.id}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-red-400 font-mono mb-4">
                {project.type}
              </p>
              <p className="text-neutral-400 mb-8 grow leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-neutral-500 bg-white/5 px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button className="w-full flex items-center justify-between text-sm font-bold tracking-widest uppercase py-3 border-t border-white/10 group-hover:border-red-600/30 group-hover:text-red-500 transition-all cursor-pointer">
                  <span>Access File</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default PortfolioProject;
