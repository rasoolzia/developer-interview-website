import { dbDelete, dbGet, dbGetAll, dbPut } from "@/shared/lib";

import type { ReportItem, ReportRepository } from "../model";

export const indexedDbReportRepository: ReportRepository = {
  getReports() {
    return dbGetAll<ReportItem>("reports");
  },

  async isQuestionReported(questionId) {
    const item = await dbGet<ReportItem>("reports", questionId);
    return item !== undefined;
  },

  async addReport(questionId) {
    const existing = await dbGet<ReportItem>("reports", questionId);
    if (!existing) {
      await dbPut("reports", { questionId, createdAt: Date.now() });
    }
  },

  removeReport(questionId) {
    return dbDelete("reports", questionId);
  },
};
