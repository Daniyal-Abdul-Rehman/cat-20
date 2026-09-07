import { create } from 'zustand';
import { officialQuestions, AssessmentQuestion } from '@/data/assessmentQuestions';

interface Answer {
  questionId: number;
  value: string;
}

interface AssessmentState {
  currentQuestion: number;
  answers: Answer[];
  questions: AssessmentQuestion[];
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
  setCurrentQuestion: (question: number) => void;
  setAnswer: (questionId: number, value: string) => void;
  resetAssessment: () => void;
  completeAssessment: () => void;
  fetchQuestions: () => Promise<void>;
  submitAssessment: () => Promise<void>;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  currentQuestion: 0,
  answers: [],
  questions: [],
  isComplete: false,
  isLoading: false,
  error: null,
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setAnswer: (questionId, value) =>
    set((state) => {
      const existingIndex = state.answers.findIndex((a) => a.questionId === questionId);
      if (existingIndex >= 0) {
        const newAnswers = [...state.answers];
        newAnswers[existingIndex] = { questionId, value };
        return { answers: newAnswers };
      }
      return { answers: [...state.answers, { questionId, value }] };
    }),
  resetAssessment: () => set({ currentQuestion: 0, answers: [], isComplete: false, error: null }),
  completeAssessment: () => set({ isComplete: true }),
  fetchQuestions: async () => {
    set({ isLoading: true, error: null, questions: officialQuestions });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/questions`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length === 20) {
          set({ questions: data.map((item) => ({
            ...item,
            title: item.title || `Question ${item.order || item.id}`,
            prompt: item.prompt || item.text,
            answers: item.answers || [],
          })) });
        }
      }
    } catch {
      // The official client set keeps the assessment available when the API is offline.
    }
    set({ isLoading: false });
  },
  submitAssessment: async () => {
    set({ isLoading: true, error: null });
    try {
      const { answers } = get();
      const response = await fetch('http://localhost:5000/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        set({ isComplete: true, isLoading: false });
      } else {
        set({ error: 'Failed to submit assessment', isLoading: false });
      }
    } catch {
      set({ error: 'Error submitting assessment', isLoading: false });
    }
  },
}));
