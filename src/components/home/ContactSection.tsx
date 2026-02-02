import { useState } from "react";
import { motion } from "motion/react";
import { Send, Lock, Shield, AlertTriangle, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    codename: "",
    secureLine: "",
    clearance: "",
    intel: "",
  });
  const [status, setStatus] = useState("idle"); // idle, encrypting, transmitted, error

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setStatus("encrypting");
    // Simulate transmission
    setTimeout(() => {
      setStatus("transmitted");
      setFormData({ codename: "", secureLine: "", clearance: "", intel: "" });
    }, 2000);
  };

  return (
    <section className="pb-24 relative overflow-hidden">
      {/* Background Effects */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" /> */}

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Intel */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-neutral-900/50 border border-white/10 p-6">
              <h3 className="text-xs font-mono text-neutral-500 mb-4 tracking-widest">
                DIRECT CHANNELS
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-neutral-600 font-mono mb-1">
                    EMAIL_DEAD_DROP
                  </p>
                  <a
                    href="mailto:contact@example.com"
                    className="text-sm text-white hover:text-red-500 transition-colors"
                  >
                    contact@example.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 font-mono mb-1">
                    ENCRYPTED_LINE
                  </p>
                  <p className="text-sm text-white font-mono">+1 [REDACTED]</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 font-mono mb-1">
                    CURRENT_LOC
                  </p>
                  <p className="text-sm text-white">Available Worldwide</p>
                </div>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-500/20 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-red-500 mb-2">
                    SECURITY NOTICE
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Response time: 24-48 hours. For urgent matters, use secure
                    line with clearance code OMEGA.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transmission Form */}
          <div className="md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-900/30 border border-white/10 p-8 relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 via-red-500 to-transparent" />

              {status === "transmitted" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    TRANSMISSION COMPLETE
                  </h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    Your intel has been encrypted and queued for review.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-xs font-mono text-red-500 hover:text-red-400"
                  >
                    [ SEND_NEW_TRANSMISSION ]
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                        CODENAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.codename}
                        onChange={(e) =>
                          setFormData({ ...formData, codename: e.target.value })
                        }
                        className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors"
                        placeholder="Enter identifier..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                        SECURE_LINE (EMAIL)
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.secureLine}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            secureLine: e.target.value,
                          })
                        }
                        className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors"
                        placeholder="user@domain.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                      CLEARANCE_LEVEL (SUBJECT)
                    </label>
                    <select
                      value={formData.clearance}
                      onChange={(e) =>
                        setFormData({ ...formData, clearance: e.target.value })
                      }
                      className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select priority level...</option>
                      <option value="omega">OMEGA - Critical Mission</option>
                      <option value="alpha">ALPHA - Project Inquiry</option>
                      <option value="beta">BETA - Collaboration</option>
                      <option value="gamma">GAMMA - General Intel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                      INTEL_CONTENT (MESSAGE)
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.intel}
                      onChange={(e) =>
                        setFormData({ ...formData, intel: e.target.value })
                      }
                      className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors resize-none"
                      placeholder="Classified details..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "encrypting"}
                    className="w-full group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white py-4 font-bold tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-size-[250%_250%] animate-shimmer" />
                    <span className="relative flex items-center justify-center gap-2">
                      {status === "encrypting" ? (
                        <>
                          <Shield className="w-4 h-4 animate-pulse" />
                          ENCRYPTING...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          TRANSMIT INTEL
                        </>
                      )}
                    </span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
