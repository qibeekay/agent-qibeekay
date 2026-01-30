import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Server, Database } from "lucide-react";
export function SecurityChecks() {
  const [items, setItems] = useState([
    {
      id: 1,
      label: "ENCRYPTION KEY",
      status: "pending",
      icon: Lock,
    },
    {
      id: 2,
      label: "FIREWALL BYPASS",
      status: "pending",
      icon: ShieldCheck,
    },
    {
      id: 3,
      label: "MAINFRAME ACCESS",
      status: "pending",
      icon: Server,
    },
    {
      id: 4,
      label: "DATA INTEGRITY",
      status: "pending",
      icon: Database,
    },
  ]);
  useEffect(() => {
    const runChecks = async () => {
      for (let i = 0; i < items.length; i++) {
        await new Promise((r) => setTimeout(r, 400));
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? {
                  ...item,
                  status: "active",
                }
              : item,
          ),
        );
        await new Promise((r) => setTimeout(r, 400));
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? {
                  ...item,
                  status: "complete",
                }
              : item,
          ),
        );
      }
    };
    runChecks();
  }, []);
  return (
    <div className="w-full max-w-md space-y-4 p-4 border border-red-900/50 bg-black/80 backdrop-blur-sm rounded">
      <div className="flex justify-between items-center border-b border-red-900/50 pb-2 mb-4">
        <h3 className="text-red-500 font-mono text-sm tracking-widest">
          SECURITY PROTOCOLS
        </h3>
        <span className="text-xs text-red-700 animate-pulse">
          SYSTEM_CHECK_ACTIVE
        </span>
      </div>

      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4">
          <item.icon
            className={`w-4 h-4 ${item.status === "complete" ? "text-red-400" : item.status === "active" ? "text-yellow-400" : "text-red-900"}`}
          />

          <div className="flex-1">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span
                className={
                  item.status === "pending" ? "text-red-900" : "text-red-500"
                }
              >
                {item.label}
              </span>
              <span
                className={
                  item.status === "complete"
                    ? "text-red-400"
                    : item.status === "active"
                      ? "text-yellow-400"
                      : "text-red-900"
                }
              >
                {item.status === "complete"
                  ? "OK"
                  : item.status === "active"
                    ? "SCANNING..."
                    : "WAITING"}
              </span>
            </div>

            <div className="h-1 bg-red-900/30 w-full overflow-hidden">
              {item.status !== "pending" && (
                <motion.div
                  className={`h-full ${item.status === "complete" ? "bg-red-500" : "bg-yellow-500"}`}
                  initial={{
                    width: "0%",
                  }}
                  animate={{
                    width: item.status === "complete" ? "100%" : "60%",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
