'use client';

import { useEffect, useState } from 'react';
import { Edit3, Eye, EyeOff, Plus, RefreshCw, Save, Trash2 } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';
import { ImportedQuestion, readQuestionDocument } from '@/lib/questionImport';

type Cluster = 'thinker' | 'seeker' | 'builder' | 'nurturer' | 'spark' | 'wanderer';
type Option = { value: string; text: string; scores: Record<string, number> };
type AdminQuestion = { _id: string; text: string; category?: string; order: number; isActive: boolean; answers?: Option[] };
const clusters: Cluster[] = ['thinker', 'seeker', 'builder', 'nurturer', 'spark', 'wanderer'];
const blankOptions = (): Option[] => ['A', 'B', 'C', 'D', 'E'].map((value) => ({ value, text: '', scores: {} }));
const emptyForm = (order = 1) => ({ text: '', category: 'CAT-20', order, isActive: true, answers: blankOptions() });

export default function QuestionsManagement() {
  const { isAuthenticated, tokens } = useAuthStore();
  const { questions, questionsLoading, questionsError, fetchQuestions, createQuestion, updateQuestion, deleteQuestion, clearQuestionsError } = useAdminStore();
  const [editingQuestion, setEditingQuestion] = useState<AdminQuestion | null>(null);
  const [formData, setFormData] = useState(emptyForm());
  const [isModalOpen, setIsModalOpen] = useState(() => typeof window !== 'undefined' && window.location.search.includes('action=add'));
  const [importedDrafts, setImportedDrafts] = useState<ImportedQuestion[]>([]);
  const [importStatus, setImportStatus] = useState('');

  useEffect(() => {
    // Only fetch questions when authenticated and token is available
    if (isAuthenticated && tokens?.access?.token) {
      console.log('[QuestionsManagement] Auth ready, fetching questions');
      fetchQuestions();
    }
  }, [isAuthenticated, tokens, fetchQuestions]);

  const openEditor = (question?: AdminQuestion) => {
    setEditingQuestion(question || null);
    setFormData(question ? { text: question.text, category: question.category || 'CAT-20', order: question.order, isActive: question.isActive, answers: question.answers?.length ? question.answers : blankOptions() } : emptyForm(questions.length + 1));
    setIsModalOpen(true);
  };
  const updateOption = (index: number, patch: Partial<Option>) => setFormData((current) => ({ ...current, answers: current.answers.map((answer, answerIndex) => answerIndex === index ? { ...answer, ...patch } : answer) }));
  const updateScore = (index: number, cluster: Cluster, value: string) => {
    const scores = { ...formData.answers[index].scores };
    if (value === '') delete scores[cluster]; else scores[cluster] = Number(value);
    updateOption(index, { scores });
  };
  const saveQuestion = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { ...formData, minValue: 0, maxValue: 0 };
    // Only include isActive for updates, not for creates
    if (editingQuestion) {
      await updateQuestion(editingQuestion._id, payload);
    } else {
      const { isActive, ...createPayload } = payload;
      await createQuestion(createPayload);
    }
    setIsModalOpen(false);
  };
  const importDocument = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setImportStatus('Reading locally...');
    try {
      const drafts = await readQuestionDocument(file);
      setImportedDrafts(drafts);
      if (drafts[0]) {
        setEditingQuestion(null);
        setFormData(drafts[0]);
        setIsModalOpen(true);
      }
      setImportStatus(drafts.length ? `${drafts.length} draft question${drafts.length === 1 ? '' : 's'} imported locally. Review before saving; the file was not uploaded.` : 'No question blocks were detected. Use headings such as QUESTION 1 and answer labels A. through E., then try again. The file was not uploaded.');
    } catch (error) {
      setImportStatus(error instanceof Error ? error.message : 'Could not read that document.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-col justify-between gap-5 border-b border-[#D9D0C0] pb-7 md:flex-row md:items-end">
        <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C4A747]">Assessment content</p><h1 className="text-4xl font-bold text-[#1a1a1a]">Question library</h1><p className="mt-2 text-sm text-[#666666]">Build the 20 prompts and their per-answer CAT-20 scoring maps.</p></div>
        <div className="flex flex-wrap gap-3"><label className="flex cursor-pointer items-center gap-2 border border-[#D9D0C0] bg-white px-4 py-3 text-sm font-semibold text-[#4B3B8C] hover:bg-[#FFFCF6]"><input type="file" accept=".pdf,.doc,.docx" onChange={importDocument} className="hidden" /> Import PDF / Word</label><button onClick={fetchQuestions} className="flex items-center gap-2 border border-[#D9D0C0] px-4 py-3 text-sm font-semibold text-[#4B3B8C] hover:bg-white"><RefreshCw className="h-4 w-4" /> Refresh</button><button onClick={() => openEditor()} className="flex items-center gap-2 bg-[#4B3B8C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3C2E72]"><Plus className="h-4 w-4" /> Add question</button></div>
      </header>
      {questionsError && <div className="flex justify-between border border-red-200 bg-red-50 p-4 text-sm text-red-700">{questionsError}<button onClick={clearQuestionsError}>Dismiss</button></div>}
      {importStatus && <div className="border border-[#D9D0C0] bg-[#F3EFE8] p-4 text-sm text-[#4B3B8C]">{importStatus} <span className="text-[#77716A]">The file stayed in your browser.</span></div>}
      {importedDrafts.length > 1 && <div className="border border-[#D9D0C0] bg-white p-5"><p className="mb-3 text-sm font-bold text-[#1a1a1a]">Imported drafts</p><div className="flex flex-wrap gap-2">{importedDrafts.map((draft) => <button key={draft.order} onClick={() => { setEditingQuestion(null); setFormData(draft); setIsModalOpen(true); }} className="border border-[#D9D0C0] px-3 py-2 text-xs font-semibold text-[#4B3B8C] hover:border-[#4B3B8C]">Edit question {draft.order}</button>)}</div></div>}
      <div className="grid gap-4 sm:grid-cols-3"><div className="border border-[#D9D0C0] bg-white p-5"><p className="text-xs uppercase tracking-widest text-[#77716A]">Questions</p><p className="mt-2 text-3xl font-bold text-[#1a1a1a]">{questions.length}<span className="text-base font-normal text-[#999999]"> / 20</span></p></div><div className="border border-[#D9D0C0] bg-white p-5"><p className="text-xs uppercase tracking-widest text-[#77716A]">Published</p><p className="mt-2 text-3xl font-bold text-[#C4A747]">{questions.filter((question) => question.isActive).length}</p></div><div className="border border-[#D9D0C0] bg-white p-5"><p className="text-xs uppercase tracking-widest text-[#77716A]">Clusters</p><p className="mt-2 text-3xl font-bold text-[#4B3B8C]">6</p></div></div>
      <div className="overflow-hidden border border-[#D9D0C0] bg-white">{questionsLoading ? <div className="p-12 text-center text-[#666666]">Loading question library...</div> : questions.map((question, index) => <div key={question._id} className="flex items-center gap-5 border-b border-[#EEE8DD] p-5 last:border-0 hover:bg-[#FFFCF6]"><span className="w-8 text-lg font-bold text-[#C4A747]">{String(question.order || index + 1).padStart(2, '0')}</span><div className="min-w-0 flex-1"><div className="mb-1 flex flex-wrap items-center gap-2"><span className={`text-xs font-bold uppercase tracking-wider ${question.isActive ? 'text-[#4B3B8C]' : 'text-[#999999]'}`}>{question.isActive ? 'Published' : 'Draft'}</span><span className="text-xs text-[#999999]">{question.answers?.length || 0} answer options</span></div><p className="truncate font-semibold text-[#1a1a1a]">{question.text}</p></div><div className="flex gap-1"><button title={question.isActive ? 'Unpublish' : 'Publish'} onClick={() => updateQuestion(question._id, { isActive: !question.isActive })} className="p-2 text-[#C4A747] hover:bg-[#F3EFE8]">{question.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button><button title="Edit" onClick={() => openEditor(question)} className="p-2 text-[#4B3B8C] hover:bg-[#F3EFE8]"><Edit3 className="h-4 w-4" /></button><button title="Delete" onClick={() => confirm('Delete this question?') && deleteQuestion(question._id)} className="p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button></div></div>)}</div>

      {isModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/60 p-4"><form onSubmit={saveQuestion} className="max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-[#D9D0C0] bg-[#FAF6EF] p-6 shadow-2xl sm:p-9"><div className="mb-7 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#C4A747]">{editingQuestion ? 'Edit content' : 'New content'}</p><h2 className="mt-2 text-3xl font-bold text-[#1a1a1a]">{editingQuestion ? `Question ${editingQuestion.order}` : 'Add question'}</h2></div><button type="button" onClick={() => setIsModalOpen(false)} className="text-2xl text-[#77716A]">×</button></div><div className="grid gap-4 sm:grid-cols-[1fr_120px]"><label className="text-sm font-semibold text-[#1a1a1a]">Prompt<textarea required rows={3} value={formData.text} onChange={(event) => setFormData({ ...formData, text: event.target.value })} className="mt-2 w-full border border-[#D9D0C0] bg-white p-3 font-normal outline-none focus:border-[#4B3B8C]" placeholder="Enter the question prompt" /></label><label className="text-sm font-semibold text-[#1a1a1a]">Order<input required type="number" min="1" max="20" value={formData.order} onChange={(event) => setFormData({ ...formData, order: Number(event.target.value) })} className="mt-2 w-full border border-[#D9D0C0] bg-white p-3 font-normal" /></label></div><div className="mt-7 flex items-center justify-between"><div><h3 className="font-bold text-[#1a1a1a]">Answer options</h3><p className="text-xs text-[#77716A]">Add copy and score each response against the six clusters.</p></div><label className="flex items-center gap-2 text-sm font-semibold text-[#4B3B8C]"><input type="checkbox" checked={formData.isActive} onChange={(event) => setFormData({ ...formData, isActive: event.target.checked })} /> Published</label></div><div className="mt-4 space-y-3">{formData.answers.map((answer, index) => <div key={answer.value} className="border border-[#D9D0C0] bg-white p-4"><div className="flex gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F3EFE8] font-bold text-[#4B3B8C]">{answer.value}</span><input required value={answer.text} onChange={(event) => updateOption(index, { text: event.target.value })} className="min-w-0 flex-1 border-b border-[#D9D0C0] p-2 text-sm outline-none focus:border-[#4B3B8C]" placeholder={`Answer ${answer.value}`} /></div><div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">{clusters.map((cluster) => <label key={cluster} className="text-[10px] font-bold uppercase tracking-wider text-[#77716A]">{cluster}<input type="number" min="0" max="2" value={answer.scores[cluster] ?? ''} onChange={(event) => updateScore(index, cluster, event.target.value)} className="mt-1 w-full border border-[#E5DED1] p-2 text-sm font-normal text-[#1a1a1a]" placeholder="0" /></label>)}</div></div>)}</div><div className="mt-8 flex justify-end gap-3 border-t border-[#D9D0C0] pt-6"><button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 text-sm font-semibold text-[#666666]">Cancel</button><button type="submit" className="flex items-center gap-2 bg-[#4B3B8C] px-5 py-3 text-sm font-semibold text-white"><Save className="h-4 w-4" /> Save question</button></div></form></div>}
    </div>
  );
}
