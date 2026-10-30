export type ReportItem = {
  questionId: string;
  createdAt: number;
};

export type ReportRepository = {
  getReports(): Promise<ReportItem[]>;

  isQuestionReported(questionId: string): Promise<boolean>;

  addReport(questionId: string): Promise<void>;

  removeReport(questionId: string): Promise<void>;
};
