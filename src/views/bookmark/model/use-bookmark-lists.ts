"use client";

import { useCallback, useEffect, useState } from "react";

import { getBookmarkedQuestions } from "@/features/bookmark/api";
import type { BookmarkList } from "@/features/bookmark/model";
import { bookmarkRepository } from "@/features/bookmark/storage";
import type { QuestionBase } from "@/shared/types";

export type ListWithCount = BookmarkList & { questionCount: number };

// ---------- Pure fetchers (no React state) ----------

export async function fetchListsWithCounts(): Promise<ListWithCount[]> {
  const storedLists = await bookmarkRepository.getLists();
  return Promise.all(
    storedLists.map(async (list) => ({
      ...list,
      questionCount: (await bookmarkRepository.getItems(list.id)).length,
    })),
  );
}

export async function fetchListWithQuestions(
  listId: string,
): Promise<{ list: BookmarkList; questions: QuestionBase[] } | null> {
  const lists = await bookmarkRepository.getLists();
  const list = lists.find((item) => item.id === listId);
  if (!list) return null;
  const questions = await getBookmarkedQuestions(listId);
  return { list, questions };
}

// ---------- Hook: all lists ----------

type ListsState = {
  lists: ListWithCount[];
  loading: boolean;
  error: boolean;
};

const listsInitialState: ListsState = {
  lists: [],
  loading: true,
  error: false,
};

export function useBookmarkLists() {
  const [state, setState] = useState<ListsState>(listsInitialState);

  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: false }));
    try {
      const lists = await fetchListsWithCounts();
      setState({ lists, loading: false, error: false });
    } catch {
      setState((s) => ({ ...s, loading: false, error: true }));
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    fetchListsWithCounts()
      .then((lists) => {
        if (!ignore) setState({ lists, loading: false, error: false });
      })
      .catch(() => {
        if (!ignore) setState((s) => ({ ...s, loading: false, error: true }));
      });
    return () => {
      ignore = true;
    };
  }, []);

  return { ...state, reload };
}

// ---------- Hook: one list + its questions ----------

type ListDetailState = {
  list: BookmarkList | null;
  questions: QuestionBase[];
  loading: boolean;
  error: boolean;
  notFound: boolean;
};

const detailInitialState: ListDetailState = {
  list: null,
  questions: [],
  loading: true,
  error: false,
  notFound: false,
};

export function useBookmarkList(listId: string) {
  const [state, setState] = useState<ListDetailState>(detailInitialState);

  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: false, notFound: false }));
    try {
      const result = await fetchListWithQuestions(listId);
      if (!result) {
        setState({ ...detailInitialState, loading: false, notFound: true });
        return;
      }
      setState({
        list: result.list,
        questions: result.questions,
        loading: false,
        error: false,
        notFound: false,
      });
    } catch {
      setState((s) => ({ ...s, loading: false, error: true }));
    }
  }, [listId]);

  useEffect(() => {
    let ignore = false;
    fetchListWithQuestions(listId)
      .then((result) => {
        if (ignore) return;
        if (!result) {
          setState({ ...detailInitialState, loading: false, notFound: true });
          return;
        }
        setState({
          list: result.list,
          questions: result.questions,
          loading: false,
          error: false,
          notFound: false,
        });
      })
      .catch(() => {
        if (!ignore) setState((s) => ({ ...s, loading: false, error: true }));
      });
    return () => {
      ignore = true;
    };
  }, [listId]);

  const removeQuestionLocal = useCallback((questionId: string) => {
    setState((s) => ({
      ...s,
      questions: s.questions.filter((q) => q.id !== questionId),
    }));
  }, []);

  const applyRename = useCallback((name: string) => {
    setState((s) => (s.list ? { ...s, list: { ...s.list, name } } : s));
  }, []);

  return { ...state, reload, removeQuestionLocal, applyRename };
}
