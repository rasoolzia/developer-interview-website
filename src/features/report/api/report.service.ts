import { getQuestionsByIdsAction } from "@/entities/search/api/search.actions";
import type { SearchItem } from "@/entities/search/model";
import type { Language } from "@/shared/types";

import type { ReportedQuestion } from "../model";
import { reportRepository } from "../storage";

export async function getReportedQuestions(
  language: Language,
): Promise<ReportedQuestion[]> {
  const reports = (await reportRepository.getReports()).sort(
    (a, b) => b.createdAt - a.createdAt,
  );

  const questions: SearchItem[] = await getQuestionsByIdsAction(
    reports.map((report) => report.questionId),
    language,
  );

  const questionsById = new Map(
    questions.map((question) => [question.id, question]),
  );

  return reports.flatMap((report) => {
    const question = questionsById.get(report.questionId);

    if (!question) {
      return [];
    }

    return [
      {
        ...question,
        reportedAt: report.createdAt,
      },
    ];
  });
}
