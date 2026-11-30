"use client";

import { useEffect, useState } from "react";

import { fetchQuestionById } from "@/entities/question/api/question.actions";
import type { Question, QuestionDetails } from "@/entities/question/model";
import { resolveBookmarkListContext } from "@/features/bookmark/api";
import type { BookmarkList } from "@/features/bookmark/model";
import { ROUTES } from "@/shared/config";
import type { Language, QuestionBase } from "@/shared/types";

type ReviewState = {
  loading: boolean;
  error: boolean;
  listNotFound: boolean;
  questionUnavailable: boolean;
  list: BookmarkList | null;
  details: QuestionDetails | null;
};

const initialState: ReviewState = {
  loading: true,
  error: false,
  listNotFound: false,
  questionUnavailable: false,
  list: null,
  details: null,
};

function buildBookmarkNavigation(
  listId: string,
  questions: QuestionBase[],
  questionId: string,
  question: Question,
  listName: string,
): QuestionDetails {
  const index = questions.findIndex((item) => item.id === questionId);

  return {
    question,
    header: {
      backHref: ROUTES.bookmarkList(listId),
      backPage: listName,
    },
    navigation: {
      previousQuestionId: questions[index - 1]?.id,
      nextQuestionId: questions[index + 1]?.id,
      progress: {
        current: index + 1,
        total: questions.length,
      },
    },
  };
}

async function loadBookmarkReview(
  listId: string,
  questionId: string,
  language: Language,
): Promise<ReviewState> {
  if (!listId.trim() || !questionId.trim()) {
    return { ...initialState, loading: false, listNotFound: true };
  }

  try {
    const context = await resolveBookmarkListContext(listId, language);
    if (!context) {
      return { ...initialState, loading: false, listNotFound: true };
    }

    const { list, items, questions } = context;
    const inList = items.some((item) => item.questionId === questionId);
    if (!inList) {
      return {
        ...initialState,
        loading: false,
        questionUnavailable: true,
        list,
      };
    }

    const questionBase = questions.find((item) => item.id === questionId);
    if (!questionBase) {
      return {
        ...initialState,
        loading: false,
        questionUnavailable: true,
        list,
      };
    }

    const question = await fetchQuestionById(
      language,
      questionId,
      questionBase,
    );
    if (!question) {
      return {
        ...initialState,
        loading: false,
        questionUnavailable: true,
        list,
      };
    }

    return {
      loading: false,
      error: false,
      listNotFound: false,
      questionUnavailable: false,
      list,
      details: buildBookmarkNavigation(
        listId,
        questions,
        questionId,
        question,
        list.name,
      ),
    };
  } catch {
    return { ...initialState, loading: false, error: true };
  }
}

type StoredReviewState = {
  requestKey: string;
  value: ReviewState;
};

export function useBookmarkReview(
  listId: string,
  questionId: string,
  language: Language,
) {
  const requestKey = JSON.stringify([language, listId, questionId]);

  const [storedState, setStoredState] = useState<StoredReviewState | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    void loadBookmarkReview(listId, questionId, language).then((next) => {
      if (!cancelled) {
        setStoredState({
          requestKey,
          value: next,
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [language, listId, questionId, requestKey]);

  if (storedState?.requestKey !== requestKey) {
    return initialState;
  }

  return storedState.value;
}
