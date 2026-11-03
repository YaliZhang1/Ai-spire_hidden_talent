export type Criterion = {
  requirement: string;
  assessment: "supported" | "partial" | "unknown";
  evidence: string | null;
};

export type Candidate = {
  id: string;
  name: string;
  headline: string;
  skills: string[];
  summary: string;
  criteria: Criterion[];
};
