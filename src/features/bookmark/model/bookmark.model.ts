export type BookmarkList = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

export type BookmarkItem = {
  listId: string;
  questionId: string;
  createdAt: number;
};

export type BookmarkRepository = {
  getLists(): Promise<BookmarkList[]>;

  getItems(listId: string): Promise<BookmarkItem[]>;

  isQuestionSaved(questionId: string): Promise<boolean>;

  createList(name: string): Promise<BookmarkList>;

  addQuestion(listId: string, questionId: string): Promise<void>;

  removeQuestion(listId: string, questionId: string): Promise<void>;

  deleteList(listId: string): Promise<void>;

  renameList(listId: string, name: string): Promise<void>;
};
