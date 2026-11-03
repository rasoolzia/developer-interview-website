"use client";

import { useCallback, useEffect, useState } from "react";

import { getReportedQuestions } from "@/features/report/api";
import type { QuestionBase } from "@/shared/types";

type State = {
  questions: QuestionBase[];
  loading: boolean;
  error: boolean;
};

const initialState: State = { questions: [], loading: true, error: false };

export function useReportedQuestions() {
  const [state, setState] = useState<State>(initialState);

  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: false }));
    try {
      const questions = await getReportedQuestions();
      setState({ questions, loading: false, error: false });
    } catch {
      setState((s) => ({ ...s, loading: false, error: true }));
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    getReportedQuestions()
      .then((questions) => {
        if (!ignore) setState({ questions, loading: false, error: false });
      })
      .catch(() => {
        if (!ignore) setState((s) => ({ ...s, loading: false, error: true }));
      });

    return () => {
      ignore = true;
    };
  }, []);

  const removeLocal = useCallback((questionId: string) => {
    setState((s) => ({
      ...s,
      questions: s.questions.filter((q) => q.id !== questionId),
    }));
  }, []);

  return { ...state, reload, removeLocal };
}
