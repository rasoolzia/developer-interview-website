import { getQuestionsByIds } from "@/entities/search/api/search.actions";
import type { QuestionBase } from "@/shared/types";

import { reportRepository } from "../storage";

export async function getReportedQuestions(): Promise<QuestionBase[]> {
  const reports = await reportRepository.getReports();
  return getQuestionsByIds(reports.map((report) => report.questionId));
}
