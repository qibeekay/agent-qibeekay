import React, { useEffect, useMemo } from "react";
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

  // Sort projects by ID with OP-001 first, then numeric order
  const sortedProjects = useMemo(() => {
    if (!projects) return [];

    return [...projects].sort((a, b) => {
      // Extract numeric part from IDs like "OP-001"
      const getNumericPart = (id: string) => {
        const match = id.match(/OP-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      };

      const numA = getNumericPart(a.id);
      const numB = getNumericPart(b.id);

      return numA - numB;
    });
  }, [projects]);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="pb-24">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-64 bg-neutral-800/50 animate-pulse rounded"></div>
        <div className="h-4 w-32 bg-neutral-800/50 animate-pulse rounded"></div>
      </div>

      {/* Projects Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="relative bg-neutral-900/30 border border-white/5 animate-pulse"
          >
            {/* Top shimmer effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-neutral-700 to-transparent"></div>

            <div className="p-8 h-full flex flex-col">
              {/* Icon and Status Skeleton */}
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-neutral-800/50 rounded-sm"></div>
                <div className="flex flex-col items-end gap-1">
                  <div className="w-16 h-4 bg-neutral-800/50 rounded"></div>
                  <div className="w-20 h-6 bg-neutral-800/50 rounded"></div>
                </div>
              </div>

              {/* Title Skeleton */}
              <div className="h-7 w-3/4 bg-neutral-800/50 rounded mb-4"></div>

              {/* Type Skeleton */}
              <div className="h-4 w-1/3 bg-neutral-800/50 rounded mb-6"></div>

              {/* Description Skeleton */}
              <div className="space-y-2 mb-8">
                <div className="h-3 w-full bg-neutral-800/50 rounded"></div>
                <div className="h-3 w-5/6 bg-neutral-800/50 rounded"></div>
                <div className="h-3 w-4/6 bg-neutral-800/50 rounded"></div>
                <div className="h-3 w-3/4 bg-neutral-800/50 rounded"></div>
              </div>

              {/* Tech Stack Skeleton */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="h-6 w-16 bg-neutral-800/50 rounded"></div>
                <div className="h-6 w-20 bg-neutral-800/50 rounded"></div>
                <div className="h-6 w-14 bg-neutral-800/50 rounded"></div>
                <div className="h-6 w-18 bg-neutral-800/50 rounded"></div>
              </div>

              {/* Button Skeleton */}
              <div className="flex gap-3">
                <div className="flex-1 h-10 bg-neutral-800/50 rounded"></div>
                <div className="flex-1 h-10 bg-neutral-800/50 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decryption Text with Animation */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="relative">
          <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
          <div className="absolute inset-0 bg-neutral-900/30 blur-sm"></div>
        </div>
        <div className="font-mono text-sm text-neutral-500">
          <span className="inline-block animate-pulse">D</span>
          <span className="inline-block animate-pulse delay-75">E</span>
          <span className="inline-block animate-pulse delay-100">C</span>
          <span className="inline-block animate-pulse delay-150">R</span>
          <span className="inline-block animate-pulse delay-200">Y</span>
          <span className="inline-block animate-pulse delay-250">P</span>
          <span className="inline-block animate-pulse delay-300">T</span>
          <span className="inline-block animate-pulse delay-350">I</span>
          <span className="inline-block animate-pulse delay-400">N</span>
          <span className="inline-block animate-pulse delay-450">G</span>
          <span className="inline-block"> </span>
          <span className="inline-block animate-pulse delay-500">P</span>
          <span className="inline-block animate-pulse delay-550">R</span>
          <span className="inline-block animate-pulse delay-600">O</span>
          <span className="inline-block animate-pulse delay-650">J</span>
          <span className="inline-block animate-pulse delay-700">E</span>
          <span className="inline-block animate-pulse delay-750">C</span>
          <span className="inline-block animate-pulse delay-800">T</span>
          <span className="inline-block animate-pulse delay-850">S</span>
          <span className="inline-block animate-pulse delay-900">.</span>
          <span className="inline-block animate-pulse delay-950">.</span>
          <span className="inline-block animate-pulse delay-1000">.</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
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
          {sortedProjects.map((project, index) => {
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
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

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
