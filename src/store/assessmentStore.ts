import { create } from 'zustand';
import { officialQuestions, AssessmentQuestion } from '@/data/assessmentQuestions';
import { submitAssessmentPublic, ScoringResult, getActiveQuestions, Question } from '@/lib/api/scoring';

interface Answer {
  questionId: number; // Keep as number for UI compatibility
  value: string;
}

interface AssessmentState {
  currentQuestion: number;
  answers: Answer[];
  questions: AssessmentQuestion[];
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
  scoringResult: ScoringResult | null;
  assessmentId: string | null;
  setCurrentQuestion: (question: number) => void;
  setAnswer: (questionId: number, value: string) => void;
  resetAssessment: () => void;
  completeAssessment: () => void;
  fetchQuestions: () => Promise<void>;
  submitAssessment: () => Promise<ScoringResult>;
  setScoringResult: (result: ScoringResult) => void;
  setAssessmentId: (id: string) => void;
  clearError: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  currentQuestion: 0,
  answers: [],
  questions: [],
  isComplete: false,
  isLoading: false,
  error: null,
  scoringResult: null,
  assessmentId: null,
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
  resetAssessment: () => set({ 
    currentQuestion: 0, 
    answers: [], 
    isComplete: false, 
    error: null, 
    scoringResult: null,
    assessmentId: null 
  }),
  completeAssessment: () => set({ isComplete: true }),
  setScoringResult: (result) => set({ scoringResult: result }),
  setAssessmentId: (id) => set({ assessmentId: id }),
  clearError: () => set({ error: null }),
  fetchQuestions: async () => {
    set({ isLoading: true, error: null, questions: officialQuestions });
    try {
      const data = await getActiveQuestions();
      if (Array.isArray(data) && data.length > 0) {
        set({ questions: data.map((item: Question) => ({
          id: item.id || item.order,
          title: item.title || `Question ${item.order || item.id}`,
          prompt: item.prompt || item.text,
          answers: (item.answers || []).map((answer) => ({
            value: answer.value,
            text: answer.text,
            scores: {}, // API answers don't include scores, so we use empty object
          })),
          isActive: item.isActive !== undefined ? item.isActive : true,
        })) });
      }
    } catch (error) {
      console.error('Failed to fetch questions from API, using fallback:', error);
      // Keep the official questions as fallback if API fails
    }
    set({ isLoading: false });
  },
  submitAssessment: async () => {
    set({ isLoading: true, error: null });
    try {
      const { answers, questions } = get();
      
      // Ensure all questions are answered by checking each question ID
      // Convert both to strings for comparison to handle type mismatches
      const answeredQuestionIds = new Set(answers.map(a => String(a.questionId)));
      const missingQuestions = questions.filter(q => !answeredQuestionIds.has(String(q.id))).map(q => q.id);
      
      if (missingQuestions.length > 0) {
        const errorMsg = `Please answer all questions before submitting. Missing: ${missingQuestions.join(', ')}`;
        set({ error: errorMsg, isLoading: false });
        throw new Error(errorMsg);
      }

      const result = await submitAssessmentPublic(answers, {
        questionnaireVersion: '1.0',
        scoringVersion: '1.0',
      });
      
      set({ 
        isComplete: true, 
        isLoading: false,
        scoringResult: result,
        assessmentId: result.assessmentId
      });
      
      return result;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error submitting assessment', isLoading: false });
      throw error;
    }
  },
}));
