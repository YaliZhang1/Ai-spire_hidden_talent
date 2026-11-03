import type { Candidate } from "../types/candidate";
import { demoCandidates } from "../mocks/candidates";

export type CandidateSearchRequest = {
  jobTitle: string;
  jobDescription: string;
};

export type DemoScenario = "success" | "empty" | "error";

// 当前模拟后端请求。
// 明天拿到真实接口后，在这个函数中接入 fetch。
export async function searchCandidates(
  request: CandidateSearchRequest,
  scenario: DemoScenario = "success",
): Promise<Candidate[]> {
  if (!request.jobTitle.trim() || !request.jobDescription.trim()) {
    throw new Error("Please enter a job title and description.");
  }

  // 模拟等待后端响应。
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 1000);
  });

  if (scenario === "error") {
    throw new Error("Unable to load candidates. Please try again.");
  }

  if (scenario === "empty") {
    return [];
  }

  // 固定演示资料，不根据岗位进行真实匹配。
  return demoCandidates;
}
