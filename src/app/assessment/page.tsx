'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock3, ShieldCheck } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAssessmentStore } from '@/store/assessmentStore';

export default function Assessment() {
  const { currentQuestion, answers, questions, isLoading, setCurrentQuestion, setAnswer, fetchQuestions, submitAssessment } = useAssessmentStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'previous'>('next');

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const question = questions[currentQuestion];
  const selectedValue = question ? answers.find((answer) => answer.questionId === question.id)?.value : undefined;
  const progress = questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const chooseAnswer = (value: string) => {
    if (question) setAnswer(question.id, value);
  };

  const moveNext = async () => {
    if (!selectedValue) return;
    if (!isLastQuestion) {
      setTransitionDirection('next');
      setCurrentQuestion(currentQuestion + 1);
      return;
    }
    setIsSubmitting(true);
    await submitAssessment();
    window.location.href = '/results';
  };

  const moveToQuestion = (index: number) => {
    if (index === currentQuestion) return;
    setTransitionDirection(index > currentQuestion ? 'next' : 'previous');
    setCurrentQuestion(index);
  };

  if (isLoading || !question) {
    return <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center text-[#4B3B8C]">Preparing your reflection...</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAF6EF] text-[#1a1a1a]">
      <Navigation />
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-75">
        <img src="/hero-bg.png" alt="" className="absolute right-0 top-20 h-[620px] w-[62%] object-cover object-left opacity-50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#FAF6EF_15%,rgba(250,246,239,.78)_42%,rgba(250,246,239,.08)_100%)]" />
        <div className="absolute -right-28 top-32 h-[420px] w-[420px] rounded-full border border-[#C4A747]/20" />
        <div className="absolute -right-12 top-48 h-[290px] w-[290px] rounded-full border border-[#4B3B8C]/10" />
      </div>
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-16">
        <div className="mb-12 flex items-start justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#C4A747]">Discover your pattern</p>
            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">The CAT-20 assessment</h1>
            <p className="mt-3 max-w-xl text-[#666666]">There are no right answers. Choose the response that feels most like your natural instinct.</p>
          </div>
          <div className="hidden items-center gap-2 border-l border-[#D9D0C0] pl-6 text-sm text-[#666666] sm:flex"><Clock3 className="h-4 w-4 text-[#C4A747]" /> About 5 minutes</div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="lg:pt-2">
            <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#666666]">Your journey</p><p className="mt-1 text-2xl font-bold text-[#4B3B8C]">{String(currentQuestion + 1).padStart(2, '0')} <span className="text-sm font-normal text-[#999999]">of {String(questions.length).padStart(2, '0')}</span></p></div><span className="text-sm font-semibold text-[#C4A747]">{Math.round(progress)}%</span></div>
            <div className="relative py-2">
              <div className="absolute left-[13px] right-[13px] top-[21px] h-px bg-[#D9D0C0]" />
              <div className="absolute left-[13px] top-[21px] h-px bg-[#C4A747] transition-all duration-700" style={{ width: `calc(${Math.max(progress - 5, 0)}% - 13px)` }} />
              <div className="relative grid grid-cols-10 gap-1 lg:grid-cols-5">
                {questions.map((item, index) => <button key={item.id} onClick={() => moveToQuestion(index)} aria-label={`Go to question ${item.id}`} className="group flex flex-col items-center gap-2"><span className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all duration-300 ${index === currentQuestion ? 'scale-125 border-[#4B3B8C] bg-[#4B3B8C] text-white shadow-[0_0_0_5px_rgba(75,59,140,.12)]' : index < currentQuestion || answers.some((answer) => answer.questionId === item.id) ? 'border-[#C4A747] bg-[#D9C98D] text-[#1a1a1a]' : 'border-[#D9D0C0] bg-[#FAF6EF] text-[#77716A] group-hover:border-[#4B3B8C]'}`}>{index + 1}</span><span className={`text-[10px] transition-colors ${index === currentQuestion ? 'font-bold text-[#4B3B8C]' : 'text-transparent group-hover:text-[#77716A]'}`}>{index === currentQuestion ? 'Now' : ' '}</span></button>)}
              </div>
            </div>
            <div className="mt-10 hidden items-start gap-3 border-t border-[#D9D0C0] pt-5 text-xs leading-5 text-[#77716A] lg:flex"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#C4A747]" />Your responses are private and saved as you move through the assessment.</div>
          </aside>

          <section key={question.id} className={`border border-[#D9D0C0] bg-white/95 p-6 shadow-[0_24px_70px_rgba(73,54,32,0.12)] backdrop-blur-sm sm:p-10 lg:p-14 ${transitionDirection === 'next' ? 'assessment-question-next' : 'assessment-question-previous'}`}>
            <p className="mb-5 text-sm font-semibold text-[#C4A747]">Question {String(question.id).padStart(2, '0')} <span className="mx-2 text-[#D9D0C0]">/</span> {question.title}</p>
            <h2 className="max-w-3xl text-2xl font-bold leading-snug lg:text-4xl">{question.prompt}</h2>
            <div className="mt-10 space-y-3">
              {question.answers.map((answer) => <button key={answer.value} onClick={() => chooseAnswer(answer.value)} className={`assessment-answer flex w-full items-start gap-4 border p-4 text-left transition-all sm:p-5 ${selectedValue === answer.value ? 'border-[#4B3B8C] bg-[#F1EEF8] shadow-[inset_4px_0_0_#4B3B8C]' : 'border-[#E5DED1] hover:border-[#C4A747] hover:bg-[#FFFCF6]'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold ${selectedValue === answer.value ? 'bg-[#4B3B8C] text-white' : 'bg-[#F3EFE8] text-[#4B3B8C]'}`}>{answer.value}</span><span className="pt-1 text-sm leading-6 text-[#444444]">{answer.text}</span>{selectedValue === answer.value && <Check className="ml-auto mt-1 h-5 w-5 shrink-0 text-[#4B3B8C]" />}</button>)}
              <button onClick={() => chooseAnswer('N/A')} className={`assessment-answer flex w-full items-center gap-4 border p-4 text-left transition-all sm:p-5 ${selectedValue === 'N/A' ? 'border-[#4B3B8C] bg-[#F1EEF8]' : 'border-dashed border-[#D9D0C0] hover:border-[#C4A747]'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold ${selectedValue === 'N/A' ? 'bg-[#4B3B8C] text-white' : 'bg-[#F3EFE8] text-[#77716A]'}`}>N/A</span><span className="text-sm text-[#77716A]">None of these feel like me</span></button>
            </div>
            <div className="mt-10 flex items-center justify-between border-t border-[#E5DED1] pt-6"><button onClick={() => { setTransitionDirection('previous'); setCurrentQuestion(Math.max(0, currentQuestion - 1)); }} disabled={currentQuestion === 0} className="flex items-center gap-2 text-sm font-semibold text-[#666666] transition-colors hover:text-[#4B3B8C] disabled:cursor-not-allowed disabled:opacity-30"><ArrowLeft className="h-4 w-4" /> Previous</button><button onClick={moveNext} disabled={!selectedValue || isSubmitting} className="flex items-center gap-2 bg-[#4B3B8C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3C2E72] disabled:cursor-not-allowed disabled:opacity-40">{isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit assessment' : 'Next question'}<ArrowRight className="h-4 w-4" /></button></div>
          </section>
        </div>
      </main>
    </div>
  );
}
