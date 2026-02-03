import React, { useEffect } from "react";
import {
  ChevronRight,
  Database,
  Layout,
  Terminal,
  Loader2,
  AlertCircle,
  ExternalLink,
  Github,
} from "lucide-react";
import { motion } from "motion/react";
import { useProjects } from "../../hooks/useProjects";

const iconMap: Record<string, React.ComponentType<any>> = {
  Database,
  Layout,
  Terminal,
};

const PortfolioProject = () => {
  const { projects, loading, error, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="flex items-center gap-3 text-neutral-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-mono">DECRYPTING PROJECT FILES...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 flex flex-col items-center gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-400 font-mono">TRANSMISSION FAILED: {error}</p>
        <button
          onClick={() => fetchProjects()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-sm transition-colors"
        >
          RETRY CONNECTION
        </button>
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="py-24 text-center">
        <p className="text-neutral-400 font-mono">NO ACTIVE PROJECTS FOUND</p>
        <p className="text-neutral-600 text-sm mt-2">
          AGENT STATUS: STANDING BY
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="pb-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            ACTIVE OPERATIONS{" "}
            <span className="text-red-500">[{projects.length}]</span>
          </h2>
          <div className="text-xs font-mono text-neutral-500">
            LAST SYNC: {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = iconMap[project.icon] || Database;

            return (
              <motion.div
                key={project._id}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                }}
                className="group relative bg-neutral-900/50 border border-white/10 hover:border-red-600/50 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="p-8 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-white/5 rounded-sm text-red-500 group-hover:text-white group-hover:bg-red-600 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-xs text-neutral-500 border border-white/10 px-2 py-1">
                        {project.id}
                      </span>
                      <span
                        className={`text-xs font-mono px-2 py-1 ${
                          project.status === "Active"
                            ? "text-green-500 bg-green-500/10"
                            : project.status === "Completed"
                              ? "text-blue-500 bg-blue-500/10"
                              : project.status === "Declassified"
                                ? "text-yellow-500 bg-yellow-500/10"
                                : "text-neutral-500 bg-neutral-500/10"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
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
                          className="text-xs font-mono text-neutral-500 bg-white/5 px-2 py-1 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-default"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 text-xs font-mono border border-white/10 px-4 py-2 hover:border-red-600 hover:text-red-500 transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                          LIVE_DEMO
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 text-xs font-mono border border-white/10 px-4 py-2 hover:border-red-600 hover:text-red-500 transition-all"
                        >
                          <Github className="w-3 h-3" />
                          SOURCE
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PortfolioProject;
