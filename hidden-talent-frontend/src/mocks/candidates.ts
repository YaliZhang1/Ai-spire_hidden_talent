import type { Candidate } from "../types/candidate";

export const demoCandidates: Candidate[] = [
  {
    id: "demo-001",
    name: "Candidate 001",
    headline: "Electronics Lab Instructor",
    skills: ["Oscilloscope", "Circuit testing", "Troubleshooting"],
    summary:
      "Experience supporting electronics labs, measurements and circuit troubleshooting.",
    criteria: [
      {
        requirement: "Use an oscilloscope",
        assessment: "supported",
        evidence:
          "Guided students in using oscilloscopes to measure circuit signals.",
      },
      {
        requirement: "Troubleshoot electronic circuits",
        assessment: "supported",
        evidence:
          "Identified wiring faults and component issues during lab sessions.",
      },
      {
        requirement: "Production testing experience",
        assessment: "unknown",
        evidence: null,
      },
    ],
  },
  {
    id: "demo-002",
    name: "Candidate 002",
    headline: "Electronics Assembly Technician",
    skills: ["PCB assembly", "Soldering", "Quality checks"],
    summary:
      "Experience assembling electronic products and performing basic quality checks.",
    criteria: [
      {
        requirement: "Use an oscilloscope",
        assessment: "unknown",
        evidence: null,
      },
      {
        requirement: "Troubleshoot electronic circuits",
        assessment: "partial",
        evidence: "Performed visual inspections and basic continuity checks.",
      },
      {
        requirement: "Production testing experience",
        assessment: "supported",
        evidence:
          "Performed functional checks on assembled units in a production team.",
      },
    ],
  },
  {
    id: "demo-003",
    name: "Candidate 003",
    headline: "Technical Support Specialist",
    skills: ["Customer support", "Documentation", "Issue diagnosis"],
    summary:
      "Experience diagnosing customer issues and documenting technical solutions.",
    criteria: [
      {
        requirement: "Use an oscilloscope",
        assessment: "unknown",
        evidence: null,
      },
      {
        requirement: "Troubleshoot electronic circuits",
        assessment: "partial",
        evidence: "Diagnosed equipment issues remotely using customer reports.",
      },
      {
        requirement: "Production testing experience",
        assessment: "unknown",
        evidence: null,
      },
    ],
  },
];
