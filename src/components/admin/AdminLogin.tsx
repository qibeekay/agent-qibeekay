import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, AlertTriangle, Eye, EyeOff, Terminal } from "lucide-react";
import { useAuth } from "../../hooks/useProjects";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login({ username, password });

    if (!result.success) {
      setError(result.error || "Login failed");
    } else {
      navigate("/admin-path/projects");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-neutral-900/50 border border-white/10 p-8 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 via-red-500 to-transparent" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              OPERATIVE CONTROL
            </h1>
            <p className="text-neutral-400 text-sm font-mono">
              CLEARANCE REQUIRED: LEVEL OMEGA
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-950/30 border border-red-500/20">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-mono">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                OPERATIVE_ID
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Enter operative ID..."
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                ENCRYPTION_KEY
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors pr-12"
                  placeholder="Enter encryption key..."
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-bold tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[size:250%_250%] animate-[shimmer_2s_linear_infinite]" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  "INITIATE SESSION"
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors font-mono"
            >
              <Terminal className="w-4 h-4" />
              RETURN TO PORTFOLIO
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
