import { create } from 'zustand';

interface Answer {
  questionId: number;
  value: number;
}

interface Question {
  id: number;
  text: string;
  category?: string;
  clusterMapping?: Map<string, string>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AssessmentState {
  currentQuestion: number;
  answers: Answer[];
  questions: Question[];
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
  setCurrentQuestion: (question: number) => void;
  setAnswer: (questionId: number, value: number) => void;
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
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();
      
      if (data.success) {
        set({ questions: data.data, isLoading: false });
      } else {
        set({ error: 'Failed to fetch questions', isLoading: false });
      }
    } catch (error) {
      set({ error: 'Error fetching questions', isLoading: false });
    }
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
    } catch (error) {
      set({ error: 'Error submitting assessment', isLoading: false });
    }
  },
}));
