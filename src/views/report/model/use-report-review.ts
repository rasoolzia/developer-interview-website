"use client";

import { useEffect, useState } from "react";

import { fetchQuestionById } from "@/entities/question/api/question.actions";
import type { QuestionDetails } from "@/entities/question/model";
import { getReportedQuestions } from "@/features/report/api";
import type { Language } from "@/shared/types";

type ReviewState = {
  loading: boolean;
  error: boolean;
  questionUnavailable: boolean;
  questionNotFound: boolean;
  details: QuestionDetails | null;
};

const initialState: ReviewState = {
  loading: true,
  error: false,
  questionUnavailable: false,
  questionNotFound: false,
  details: null,
};

async function loadReportReview(
  questionId: string,
  language: Language,
): Promise<ReviewState> {
  if (!questionId.trim()) {
    return { ...initialState, loading: false, questionUnavailable: true };
  }

  try {
    const questions = await getReportedQuestions(language);
    const index = questions.findIndex((item) => item.id === questionId);
    if (index === -1) {
      return { ...initialState, loading: false, questionUnavailable: true };
    }

    const question = await fetchQuestionById(
      language,
      questionId,
      questions[index],
    );
    if (!question) {
      return { ...initialState, loading: false, questionNotFound: true };
    }

    return {
      loading: false,
      error: false,
      questionUnavailable: false,
      questionNotFound: false,
      details: {
        question,
        domain: questions[index].domain,
        topic: questions[index].topic,
        navigation: {
          previousQuestionId: questions[index - 1]?.id,
          nextQuestionId: questions[index + 1]?.id,
          progress: {
            current: index + 1,
            total: questions.length,
          },
        },
      },
    };
  } catch {
    return { ...initialState, loading: false, error: true };
  }
}

type StoredReviewState = {
  requestKey: string;
  value: ReviewState;
};

export function useReportReview(questionId: string, language: Language) {
  const requestKey = JSON.stringify([language, questionId]);
  const [storedState, setStoredState] = useState<StoredReviewState | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    void loadReportReview(questionId, language).then((next) => {
      if (!cancelled) {
        setStoredState({ requestKey, value: next });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [language, questionId, requestKey]);

  if (storedState?.requestKey !== requestKey) {
    return initialState;
  }

  return storedState.value;
}
