"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getBookmarkListQuestionCounts,
  resolveBookmarkListContext,
} from "@/features/bookmark/api";
import type {
  BookmarkedQuestion,
  BookmarkList,
} from "@/features/bookmark/model";
import { bookmarkRepository } from "@/features/bookmark/storage";
import type { Language } from "@/shared/types";

export type ListWithCount = BookmarkList & { questionCount: number };

// ---------- Pure fetchers (no React state) ----------

export async function fetchListsWithCounts(
  language: Language,
): Promise<ListWithCount[]> {
  const [storedLists, questionCounts] = await Promise.all([
    bookmarkRepository.getLists(),
    getBookmarkListQuestionCounts(language),
  ]);

  return storedLists.map((list) => ({
    ...list,
    questionCount: questionCounts.get(list.id) ?? 0,
  }));
}

export async function fetchListWithQuestions(
  listId: string,
  language: Language,
): Promise<{ list: BookmarkList; questions: BookmarkedQuestion[] } | null> {
  const context = await resolveBookmarkListContext(listId, language);
  if (!context) return null;
  return { list: context.list, questions: context.questions };
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

export function useBookmarkLists(language: Language) {
  const [state, setState] = useState<ListsState>(listsInitialState);

  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: false }));
    try {
      const lists = await fetchListsWithCounts(language);
      setState({ lists, loading: false, error: false });
    } catch {
      setState((s) => ({ ...s, loading: false, error: true }));
    }
  }, [language]);

  useEffect(() => {
    let ignore = false;
    fetchListsWithCounts(language)
      .then((lists) => {
        if (!ignore) setState({ lists, loading: false, error: false });
      })
      .catch(() => {
        if (!ignore) setState((s) => ({ ...s, loading: false, error: true }));
      });
    return () => {
      ignore = true;
    };
  }, [language]);

  return { ...state, reload };
}

// ---------- Hook: one list + its questions ----------

type ListDetailState = {
  list: BookmarkList | null;
  questions: BookmarkedQuestion[];
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

export function useBookmarkList(listId: string, language: Language) {
  const [state, setState] = useState<ListDetailState>(detailInitialState);

  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: false, notFound: false }));
    try {
      const result = await fetchListWithQuestions(listId, language);
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
  }, [language, listId]);

  useEffect(() => {
    let ignore = false;
    fetchListWithQuestions(listId, language)
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
  }, [listId, language]);

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
