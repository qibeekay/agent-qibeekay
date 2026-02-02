import React from "react";
import { motion } from "motion/react";
import {
  Globe,
  Link2,
  ExternalLink,
  Shield,
  Lock,
  X,
  Instagram,
  Twitter,
} from "lucide-react";

// Import icons (you'll need to add these to lucide-react or use another icon set)
// For now, using placeholder icons
import { Github, Linkedin, Send, Signal } from "lucide-react";
import { socialLinks } from "../../utils/contants";

const SocialSection = () => {
  const iconMap = {
    Github: Github,
    Linkedin: Linkedin,
    Twitter: Twitter,
    Instagram: Instagram,
  };

  return (
    <section className="py-24 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* <div className="flex items-center gap-3 text-red-500 mb-4">
          <Globe className="w-5 h-5" />
          <span className="text-sm tracking-[0.3em] font-mono">
            DIGITAL FOOTPRINT // MONITORED CHANNELS
          </span>
        </div> */}

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-red-500" />
            <span className="text-xs font-mono tracking-[0.3em] text-red-500">
              DIGITAL FOOTPRINT // MONITORED CHANNELS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            ESTABLISH CONTACT
          </h2>
          <p className="text-neutral-400 max-w-xl">
            All transmissions are encrypted via 256-bit protocol. Unauthorized
            access will trigger immediate containment procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {socialLinks.map((social, index) => {
            const Icon = iconMap[social.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={social.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-neutral-900/50 border border-white/10 hover:border-red-600/50 transition-all duration-300"
              >
                <div className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-neutral-950 border border-white/10 rotate-45"></div>
                <div className="absolute -top-3 left-4 px-2 py-0.5 bg-neutral-950 border border-white/10 text-[10px] font-mono text-neutral-400">
                  {social.id}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-2 bg-white/5 rounded-sm group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={`text-xs font-mono px-2 py-1 ${
                        social.status === "ENCRYPTED"
                          ? "text-green-500 border-green-500/30"
                          : social.status === "SECURE"
                            ? "text-blue-500 border-blue-500/30"
                            : "text-yellow-500 border-yellow-500/30"
                      } border`}
                    >
                      {social.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                    {social.platform}
                  </h3>

                  <p className="font-mono text-sm text-neutral-300 mb-6 truncate">
                    {social.handle}
                  </p>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    <span className="text-xs text-neutral-500 font-mono">
                      LAST ACTIVE: TODAY
                    </span>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default SocialSection;
