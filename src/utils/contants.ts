import { Database, Layout, Terminal } from "lucide-react";

export const projects = [
  {
    id: "OP-001",
    title: "Project: NEBULA",
    type: "Full Stack Architecture",
    status: "Declassified",
    description:
      "Advanced cloud infrastructure management system with real-time telemetry and orbital tracking capabilities.",
    tech: ["React", "Node.js", "WebGL"],
    icon: Database,
  },
  {
    id: "OP-002",
    title: "Project: PHANTOM",
    type: "Stealth Interface",
    status: "Active",
    description:
      "High-security fintech dashboard featuring biometric authentication and encrypted data visualization.",
    tech: ["TypeScript", "Next.js", "Tailwind"],
    icon: Layout,
  },
  {
    id: "OP-003",
    title: "Project: CYPHER",
    type: "Cryptographic Tool",
    status: "Restricted",
    description:
      "Decentralized communication protocol designed for zero-knowledge proof verification and secure messaging.",
    tech: ["Rust", "WASM", "Solidity"],
    icon: Terminal,
  },
];

export const skills = [
  {
    name: "Cryptography",
    level: 95,
  },
  {
    name: "Infiltration",
    level: 90,
  },
  {
    name: "Hand-to-Hand",
    level: 85,
  },
  {
    name: "Demolitions",
    level: 80,
  },
];

export const missions = [
  {
    id: "OP-429",
    title: "Operation Skyfall",
    status: "COMPLETED",
    date: "14 NOV 2024",
    desc: "Recovered stolen encryption keys from high-security facility in the Alps.",
    tags: ["Stealth", "Recon"],
  },
  {
    id: "OP-881",
    title: "Project Chimera",
    status: "CLASSIFIED",
    date: "03 FEB 2025",
    desc: "Neutralized rogue AI threat before global network propagation.",
    tags: ["Cyber", "Defense"],
  },
  {
    id: "OP-102",
    title: "The Syndicate",
    status: "ONGOING",
    date: "PRESENT",
    desc: "Deep cover surveillance of international arms dealing ring.",
    tags: ["Intel", "Surveillance"],
  },
];
