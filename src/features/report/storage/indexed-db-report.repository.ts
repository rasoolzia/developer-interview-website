import { dbDelete, dbGet, dbGetAll, dbPut } from "@/shared/lib";

import type { ReportItem, ReportRepository } from "../model";

export const indexedDbReportRepository: ReportRepository = {
  getReports(): Promise<ReportItem[]> {
    return dbGetAll<ReportItem>("reports");
  },

  async isQuestionReported(questionId: string): Promise<boolean> {
    const item = await dbGet<ReportItem>("reports", questionId);
    return item !== undefined;
  },

  async addReport(questionId: string): Promise<void> {
    const existing = await dbGet<ReportItem>("reports", questionId);
    if (!existing) {
      await dbPut("reports", { questionId, createdAt: Date.now() });
    }
  },

  removeReport(questionId: string): Promise<void> {
    return dbDelete("reports", questionId);
  },
};
