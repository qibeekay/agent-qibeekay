import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Terminal,
  Cpu,
  Shield,
  Wifi,
  Database,
  Clock,
  Eye,
  Cpu as Server,
} from "lucide-react";

const TerminalFooter = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [logs, setLogs] = useState([
    {
      id: 1,
      time: "12:45:23",
      message: "System encryption initialized...",
      type: "system",
    },
    {
      id: 2,
      time: "12:45:24",
      message: "Portfolio connection established...",
      type: "success",
    },
    {
      id: 3,
      time: "12:45:25",
      message: "Firewall active - all ports secured",
      type: "security",
    },
    {
      id: 4,
      time: "12:45:26",
      message: "Visitor detected on secure channel...",
      type: "alert",
    },
  ]);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Simulate occasional connection status changes
    const connectionInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsOnline(false);
        setTimeout(() => setIsOnline(true), 1000);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(connectionInterval);
    };
  }, []);

  // Add new log entries periodically
  useEffect(() => {
    const logInterval = setInterval(() => {
      const newLogs = [
        {
          id: Date.now(),
          time: currentTime,
          message: "Security scan complete - no threats detected",
          type: "security",
        },
        {
          id: Date.now() + 1,
          time: currentTime,
          message: "Data packet transmission verified",
          type: "system",
        },
        {
          id: Date.now() + 2,
          time: currentTime,
          message: "Connection latency: 24ms",
          type: "info",
        },
        {
          id: Date.now() + 3,
          time: currentTime,
          message: "Encryption protocols active",
          type: "security",
        },
      ];

      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];

      setLogs((prev) => {
        const newLogs = [...prev.slice(-3), randomLog];
        return newLogs;
      });
    }, 8000);

    return () => clearInterval(logInterval);
  }, [currentTime]);

  return (
    <footer className="mt-auto border-t border-white/10 bg-neutral-900/30">
      {/* Terminal Header */}
      <div className="px-6 py-3 border-b border-white/10 bg-neutral-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-green-500" />
          <span className="font-mono text-xs text-neutral-300">
            SYSTEM CONSOLE
          </span>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
            ></div>
            <span className="font-mono text-[10px] text-neutral-500">
              {isOnline ? "CONNECTED" : "DISCONNECTED"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-neutral-500" />
            <span className="font-mono text-xs text-neutral-400">
              {currentTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-3 h-3 text-neutral-500" />
            <span className="font-mono text-xs text-neutral-400">
              OPERATIVE_OS
            </span>
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Status Indicators */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-xs text-neutral-300">
                ENCRYPTION
              </span>
            </div>
            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-blue-500" />
              <span className="font-mono text-xs text-neutral-300">
                CPU LOAD
              </span>
            </div>
            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.floor(Math.random() * 30) + 10}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Wifi className="w-3 h-3 text-purple-500" />
              <span className="font-mono text-xs text-neutral-300">
                NETWORK
              </span>
            </div>
            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: "92%" }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-red-500" />
              <span className="font-mono text-xs text-neutral-300">
                SECURITY
              </span>
            </div>
            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Live Logs */}
        <div className="bg-black/50 border border-white/10 rounded-sm p-4 font-mono">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3 text-green-500" />
              <span className="text-xs text-neutral-400">LIVE SYSTEM LOGS</span>
            </div>
            <span className="text-[10px] text-neutral-600">
              LAST UPDATE: {currentTime}
            </span>
          </div>

          <div className="space-y-1">
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 text-xs py-1"
              >
                <span className="text-neutral-600 flex-shrink-0">
                  [{log.time}]
                </span>
                <span
                  className={`${
                    log.type === "success"
                      ? "text-green-500"
                      : log.type === "alert"
                        ? "text-yellow-500"
                        : log.type === "security"
                          ? "text-red-500"
                          : "text-neutral-300"
                  }`}
                >
                  {log.message}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Blinking cursor */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-green-500 text-sm">{">"}</span>
            <motion.div
              className="w-3 h-4 bg-green-500"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-neutral-600 text-sm">
              awaiting_command...
            </span>
          </div>
        </div>

        {/* Copyright / Status */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Server className="w-3 h-3 text-neutral-600" />
              <span className="font-mono text-[10px] text-neutral-600">
                SERVER: operative-server-01.secure.net
              </span>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-[10px] text-neutral-700">//</span>
            </div>
            <span className="font-mono text-[10px] text-neutral-600">
              UPTIME: 24d 16h 32m
            </span>
          </div>

          <div className="text-center md:text-right">
            <p className="font-mono text-[10px] text-neutral-600">
              © {new Date().getFullYear()} OPERATIVE_PORTFOLIO // CLASSIFIED
            </p>
            <p className="font-mono text-[10px] text-neutral-700 mt-1">
              UNAUTHORIZED ACCESS PROHIBITED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TerminalFooter;
