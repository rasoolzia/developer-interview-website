import { getQuestionsByIds } from "@/entities/search/api/search.actions";
import type { Language, QuestionBase } from "@/shared/types";

import { reportRepository } from "../storage";

export async function getReportedQuestions(
  language: Language,
): Promise<QuestionBase[]> {
  const reports = (await reportRepository.getReports()).sort(
    (a, b) => b.createdAt - a.createdAt,
  );

  return getQuestionsByIds(
    reports.map((report) => report.questionId),
    language,
  );
}
