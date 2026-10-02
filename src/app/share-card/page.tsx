'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import { CLUSTER_COLORS, ARCHETYPE_NAMES, parsePattern } from '@/lib/clusterColors';

function getArchetypeColors(profileCode: string, pattern: string) {
  // Use the dynamic cluster colors from the pattern
  const parsed = parsePattern(pattern);
  return {
    primary: parsed.primaryColor,
    secondary: parsed.secondaryColor,
    accent: parsed.primaryColor,
  };
}

type ShareCardSection = { id: string; title: string; description: string; required: boolean };

const AVAILABLE_SECTIONS: ShareCardSection[] = [
  { id: 'archetype-result', title: 'Archetype Result', description: 'Your core result, always included.', required: true },
  { id: 'pattern-snapshot', title: 'Pattern Snapshot', description: 'A quick look at how your pattern shows up.', required: false },
  { id: 'mind-hooked', title: 'When Your Mind Gets Hooked', description: 'What captures your attention and keeps you thinking.', required: false },
  { id: 'around-people', title: "What You're Like Around People", description: "How you show up in conversations and social situations.", required: false },
  { id: 'misread', title: 'People Often Misread You As', description: 'Common misunderstandings and different perspectives.', required: false },
  { id: 'shadow', title: 'Shadow Side', description: 'Patterns that can be more challenging for you.', required: false },
  { id: 'connection', title: 'How You Connect', description: 'What helps you feel closer to others.', required: false },
  { id: 'natural', title: 'What Comes Naturally', description: 'Strengths that show up without you trying.', required: false },
  { id: 'inner-tug', title: 'Your Inner Tug-of-War', description: 'The two sides that keep you moving.', required: false },
  { id: 'future-message', title: 'Future Message', description: "A reminder for what's ahead.", required: false },
];

const SECTION_COPY: Record<string, string> = {
  'mind-hooked': "A contradiction you can't ignore. You keep turning it over, looking for the connection others might miss.",
  misread: "Quietly observant. You may seem distant or hard to read when you're simply taking the time to understand.",
  'inner-tug': "Part of you wants a clear answer; another part knows there is always more to discover.",
  'future-message': "Keep following the questions that matter to you. The connections will become clearer as you go.",
};

export default function ShareCardBuilder() {
  const router = useRouter();
  const [selectedSections, setSelectedSections] = useState<string[]>(['archetype-result', 'mind-hooked', 'misread']);
  const [currentStep, setCurrentStep] = useState<'select' | 'preview' | 'share'>('select');
  const [previewMode, setPreviewMode] = useState<'card' | 'mobile'>('card');
  const [shareCardData, setShareCardData] = useState<any>(null);
  const shareCardPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('shareCardData');
    if (storedData) {
      try {
        setShareCardData(JSON.parse(storedData));
      } catch (error) {
        console.error('Failed to parse share card data:', error);
        router.push('/assessment');
      }
    } else {
      router.push('/assessment');
    }
  }, [router]);

  const toggleSection = (sectionId: string) => {
    const section = AVAILABLE_SECTIONS.find((item) => item.id === sectionId);
    if (section?.required) return;
    setSelectedSections((previous) => {
      if (previous.includes(sectionId)) return previous.filter((id) => id !== sectionId);
      if (previous.length >= 3) return previous;
      return [...previous, sectionId];
    });
  };

  const getSelectedCount = () => selectedSections.filter((id) => !AVAILABLE_SECTIONS.find((item) => item.id === id)?.required).length;
  const canSelectMore = () => getSelectedCount() < 2;
  const handlePreview = () => { if (getSelectedCount() === 2) setCurrentStep('preview'); };
  const handleBack = () => setCurrentStep(currentStep === 'preview' ? 'select' : 'preview');
  const handleDownload = async () => {
    if (!shareCardPreviewRef.current || !shareCardData) return;
    try {
      const canvas = await html2canvas(shareCardPreviewRef.current, { backgroundColor: '#fbf8f0', scale: 2, useCORS: true });
      const link = document.createElement('a');
      link.download = `cat-20-share-card-${shareCardData.profileCode}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Failed to generate image. Please try again.');
    }
  };

  if (!shareCardData) {
    return <div className="flex min-h-screen items-center justify-center bg-[#fbf8f0] text-[#171b4f]"><div className="text-center"><div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#4f2696] border-t-transparent" /><p>Loading share card data...</p></div></div>;
  }

  const pattern = shareCardData.primaryRoles?.join(', ') || '';
  const colors = getArchetypeColors(shareCardData.profileCode || '', pattern);
  const card = <ShareCardPreview data={shareCardData} selectedSections={selectedSections} />;

  return (
    <main className="min-h-screen bg-[#fbf8f0] px-5 py-6 text-[#171b4f] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1540px] border-t-2 border-[#b4a8d1] pt-6">
        {currentStep === 'select' ? (
          <div className="grid gap-9 lg:grid-cols-[minmax(0,1.18fr)_minmax(440px,0.82fr)] lg:gap-10">
            <section className="min-w-0 lg:pr-1">
              {/* Existing page header retained, with the reference's small eyebrow label. */}
              <header className="mb-6">
                <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-sm font-medium text-[#282744] transition hover:text-[#4f2696]">
                  <span aria-hidden="true" className="text-xl leading-none">←</span> Back to Results
                </button>
                <div className="mb-2 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#31356f]">
                  <span className="h-px w-9 bg-[#e68a75]" /> Share your results
                </div>
                <h1 className="font-serif text-[46px] font-bold leading-[0.91] tracking-[-0.055em] text-[#11174d] sm:text-[58px] xl:text-[68px]">
                  Create Your<br />Share Card
                </h1>
                <p className="mt-4 max-w-[590px] text-base leading-7 text-[#343348] sm:text-lg">
                  Choose two additional sections to share alongside your Archetype Result.
                </p>
              </header>

              <ProgressSteps currentStep={currentStep} />

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {AVAILABLE_SECTIONS.map((section) => {
                  const isSelected = selectedSections.includes(section.id);
                  const isDisabled = !canSelectMore() && !isSelected && !section.required;
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      disabled={isDisabled}
                      aria-pressed={isSelected}
                      className={`min-h-[83px] rounded-lg border px-4 py-3 text-left transition-all ${isSelected ? 'border-[#9384bd] bg-[#f0edf5]' : 'border-[#e4dfd4] bg-white/25 hover:border-[#b6a9d1] hover:bg-[#f7f3ef]'} ${isDisabled ? 'cursor-not-allowed opacity-55' : ''}`}
                      style={isSelected ? { borderColor: `${colors.primary}70` } : undefined}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`mt-0.5 flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-transparent text-white' : 'border-[#b7b5b2] bg-[#fbf8f0]'}`} style={isSelected ? { backgroundColor: colors.primary } : undefined}>
                          {isSelected ? <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m4 10 4 4 8-8" /></svg> : null}
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 font-semibold leading-5 text-[#18182e]">
                            {section.title}
                            {section.required && <svg aria-label="Always included" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M5 6V4a3 3 0 1 1 6 0v2h1.2c.44 0 .8.36.8.8v6.4c0 .44-.36.8-.8.8H3.8a.8.8 0 0 1-.8-.8V6.8c0-.44.36-.8.8-.8H5Zm1.5 0h3V4a1.5 1.5 0 0 0-3 0v2Z" /></svg>}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-[1.35] text-[#676575]">{section.description}</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-sm font-semibold text-[#5c4a91]">{getSelectedCount()} of 2 sections selected</p>
                <button onClick={handlePreview} disabled={getSelectedCount() !== 2} className="flex w-full items-center justify-center gap-4 rounded-xl bg-[#151a3d] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#272d5b] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto">
                  Preview Your Card <span aria-hidden="true" className="text-lg">→</span>
                </button>
              </div>
            </section>

            <aside className="min-w-0 border-t border-[#c9c1d6] pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="font-sans text-lg font-semibold text-[#19192d]">Live Preview</h2>
                <div className="flex items-center gap-1 rounded-full border border-[#e5dfd5] bg-white/35 p-1 text-sm">
                  <button onClick={() => setPreviewMode('card')} className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${previewMode === 'card' ? 'text-[#171b4f]' : 'text-[#777582]'}`} aria-pressed={previewMode === 'card'}>
                    <svg className="h-4 w-5" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="1.5" y="1.5" width="17" height="10" rx="1"/><path d="M7 14h6M10 11.5V14"/></svg>Card
                  </button>
                  <button onClick={() => setPreviewMode('mobile')} className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${previewMode === 'mobile' ? 'text-[#171b4f]' : 'text-[#777582]'}`} aria-pressed={previewMode === 'mobile'}>
                    <svg className="h-4 w-4" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2.5" y="1" width="11" height="18" rx="2"/><path d="M6.5 3h3M7 16.5h2"/></svg>Mobile
                  </button>
                </div>
              </div>
              <div className={`mx-auto transition-all ${previewMode === 'mobile' ? 'max-w-[340px] rounded-[32px] border-[7px] border-[#23233a] bg-[#23233a] p-2 shadow-xl' : 'w-full'}`}>
                {previewMode === 'mobile' && <div className="mx-auto mb-2 h-4 w-20 rounded-full bg-[#23233a]" />}
                <div ref={shareCardPreviewRef} className={`overflow-hidden rounded-[15px] border border-[#e4dfd6] bg-[#fcf9f2] shadow-[0_8px_28px_rgba(32,27,58,0.07)] ${previewMode === 'mobile' ? 'max-h-[650px] overflow-y-auto rounded-[23px]' : ''}`}>
                  {card}
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="mx-auto max-w-[760px]">
            <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-sm font-medium text-[#282744] hover:text-[#4f2696]"><span aria-hidden="true">←</span> Back to Results</button>
            <div className="mb-5 text-center"><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#31356f]">Share your results</p><h1 className="font-serif text-4xl font-bold text-[#11174d]">{currentStep === 'preview' ? 'Preview Your Card' : 'Download & Share'}</h1></div>
            <ProgressSteps currentStep={currentStep} />
            <div className="rounded-2xl border border-[#e4dfd6] bg-white/30 p-4 shadow-sm sm:p-7">
              <div ref={shareCardPreviewRef} className="overflow-hidden rounded-xl border border-[#e4dfd6] bg-[#fcf9f2] shadow-sm">{card}</div>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                {currentStep === 'preview' ? <>
                  <button onClick={() => setCurrentStep('select')} className="rounded-xl border border-[#8676ae] px-6 py-3 text-sm font-semibold text-[#503e90] hover:bg-[#f0ebf7]">← Edit Sections</button>
                  <button onClick={() => setCurrentStep('share')} className="rounded-xl bg-[#151a3d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#272d5b]">Download & Share →</button>
                </> : <>
                  <button onClick={handleDownload} className="rounded-xl bg-[#151a3d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#272d5b]">Download Image</button>
                  <button onClick={() => { if (navigator.share) { void navigator.share({ title: 'My CAT-20 Cognitive Profile', text: `I'm a ${shareCardData.primaryNames.join(' + ')} (${shareCardData.profileCode})! Check out my cognitive archetype.`, url: window.location.href }); } else { alert('Share functionality is not available on this device. Download the image to share it manually.'); } }} className="rounded-xl border-2 border-[#b28c4e] bg-[#fcf9f2] px-6 py-3 text-sm font-semibold text-[#8e6b36] hover:bg-[#f7f0e5]">Share</button>
                  <button onClick={() => setCurrentStep('preview')} className="rounded-xl border border-[#8676ae] px-6 py-3 text-sm font-semibold text-[#503e90] hover:bg-[#f0ebf7]">← Back to Preview</button>
                </>}
              </div>
            </div>
          </div>
        )}
        <footer className="mt-8 hidden items-center justify-between border-t border-[#b4a8d1] pt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#31356f] sm:flex"><span>CAT-20</span><span>Same questions. A deeper you.</span></footer>
      </div>
    </main>
  );
}

function ProgressSteps({ currentStep }: { currentStep: 'select' | 'preview' | 'share' }) {
  const steps = [{ id: 'select', number: '1', title: 'Select 2 sections' }, { id: 'preview', number: '2', title: 'Preview your card' }, { id: 'share', number: '3', title: 'Download & share' }];
  const activeIndex = steps.findIndex((step) => step.id === currentStep);
  return <div className="mb-6 flex items-center gap-2.5 text-[11px] sm:gap-3 sm:text-sm">
    {steps.map((step, index) => <div key={step.id} className="contents">
      <div className={`flex shrink-0 items-center gap-2 ${index === activeIndex ? 'font-semibold text-[#171b4f]' : 'text-[#777582]'}`}>
        <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${index === activeIndex ? 'border-[#171b4f] bg-[#171b4f] text-white' : 'border-[#b8b5b5] bg-transparent text-[#45445a]'}`}>{step.number}</span>
        <span className="hidden sm:inline">{step.title}</span>
      </div>
      {index < steps.length - 1 && <div className="h-px min-w-3 flex-1 bg-[#d8d2c8]" />}
    </div>)}
  </div>;
}

function ShareCardPreview({ data, selectedSections }: { data: any; selectedSections: string[] }) {
  const { primaryNames = [], secondaryNames = [], profileCode = '', result = {} } = data;
  const pattern = primaryNames?.join(', ') || '';
  const colors = getArchetypeColors(profileCode, pattern);
  const primaryRoles: string[] = result.primaryRoles || [];
  const secondaryRoles: string[] = result.secondaryRoles || [];
  const displayTitle = primaryNames.join(' + ') || 'Your Archetype';
  const selected = selectedSections.filter((id) => id !== 'archetype-result').map((id) => AVAILABLE_SECTIONS.find((section) => section.id === id)).filter(Boolean) as ShareCardSection[];
  const getContent = (id: string) => {
    if (id === 'pattern-snapshot') return generateTraits(primaryRoles, secondaryRoles).slice(0, 2).map((trait) => trait.title).join(' · ');
    if (id === 'around-people') return generatePeopleTraits(primaryRoles, secondaryRoles)[0]?.text || '';
    if (id === 'quote') return generateQuote(primaryRoles, secondaryRoles);
    if (id === 'natural') return generateNaturalItems(primaryRoles)[0] || '';
    if (id === 'shadow') return generateShadowItems(primaryRoles)[0] || '';
    if (id === 'connection') return generateConnectionText(primaryRoles, secondaryRoles).split('.')[0] + '.';
    return SECTION_COPY[id] || '';
  };

  return <article className="relative overflow-hidden bg-[#fcf9f2] px-6 py-6 sm:px-8 sm:py-7" style={{ color: '#171b4f' }}>
    {/* Decorative side lines - using cluster colors */}
    <div className="pointer-events-none absolute bottom-[20%] left-0 top-[5%] w-[3px]" style={{ backgroundColor: colors.primary }} />
    <div className="pointer-events-none absolute right-0 top-[12%] h-32 w-[2px]" style={{ backgroundColor: colors.secondary }} />
    <div className="pointer-events-none absolute right-0 top-[26%] h-28 w-[2px]" style={{ backgroundColor: colors.primary }} />

    <header className="mb-6 flex items-start justify-between gap-4">
      <div>
        <div className="font-serif text-[28px] leading-none tracking-[-0.04em]" style={{ color: colors.primary }}>CAT-20</div>
        <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.22em]" style={{ color: colors.primary }}>Cognitive Archetype Taxonomy</div>
      </div>
      <p className="pt-1 text-right text-[8px] font-semibold uppercase leading-[1.5] tracking-[0.2em] text-[#4a4957]">Same questions.<br />A deeper you.</p>
    </header>

    <section className="px-2 pb-5 sm:px-4">
      <p className="font-serif text-[18px] leading-none text-[#171b4f]">THE</p>
      <h2 className="mt-1 font-serif text-[clamp(42px,6vw,64px)] leading-[0.88] tracking-[-0.05em] text-[#11174d]">
        {displayTitle.toUpperCase()}<br />
        <span className="text-[0.65em]">({profileCode})</span>
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 font-serif text-[24px] italic leading-tight">
        {primaryNames.map((name: string, index: number) => (
          <span key={`primary-${name}-${index}`} style={{ color: index === 0 ? colors.primary : colors.secondary }}>
            {index > 0 ? '× ' : ''}{name}
          </span>
        ))}
        {secondaryNames.map((name: string, index: number) => (
          <span key={`secondary-${name}-${index}`} style={{ color: colors.secondary }}>
            × {name}
          </span>
        ))}
      </div>
      <div className="mt-4 h-[3px] w-20" style={{ backgroundColor: colors.primary }} />
      <p className="mt-6 max-w-[520px] font-serif text-[18px] leading-[1.45] text-[#29283a]">
        {getArchetypeSummary(primaryRoles, secondaryRoles)}
      </p>
    </section>

    <div className="my-2 h-px" style={{ backgroundColor: `${colors.primary}40` }} />

    {selected.length > 0 && (
      <section className={`grid gap-0 pt-6 ${selected.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {selected.map((section, index) => (
          <div
            key={section.id}
            className={`min-w-0 px-4 pb-3 ${index > 0 ? 'border-l pl-5 sm:pl-6' : ''}`}
            style={index > 0 ? { borderColor: `${colors.primary}30` } : undefined}
          >
            <h3 className="max-w-[240px] font-serif text-[13px] font-bold uppercase leading-[1.25] tracking-[0.08em] text-[#171b4f]">
              {section.title}
            </h3>
            <div className="mt-2 h-[2px] w-10" style={{ backgroundColor: colors.primary }} />
            <p className="mt-3 font-serif text-[14px] leading-[1.45] text-[#323143]">
              {getContent(section.id)}
            </p>
          </div>
        ))}
      </section>
    )}

    <footer className="mt-6 flex items-end justify-between gap-3 border-t pt-4" style={{ borderColor: `${colors.primary}30` }}>
      <div className="text-center">
        <p className="font-serif text-[15px]">What's your CAT-20?</p>
        <p className="mt-1 text-[8px] font-semibold tracking-[0.28em] text-[#514f60]">CAT20.COM</p>
      </div>
      <p className="max-w-[120px] rotate-[-7deg] text-right font-serif text-[14px] italic leading-[1.1] text-[#716a7d]">
        Different<br />Minds. Belong Here.
      </p>
    </footer>
  </article>;
}

function getArchetypeSummary(primaryRoles: string[], secondaryRoles: string[]) {
  const roles = [...primaryRoles, ...secondaryRoles].map((role) => role.toLowerCase());
  if (roles.includes('thinker') && roles.includes('seeker')) return 'You have a hard time leaving something at "good enough" when you know there\'s more to understand.';
  if (roles.includes('thinker')) return 'You notice the details, patterns, and questions that other people might pass by.';
  if (roles.includes('seeker')) return 'You\'re drawn to what\'s possible, always looking for the next meaningful connection.';
  if (roles.includes('builder')) return 'You\'re at your best when ideas become something real, useful, and lasting.';
  if (roles.includes('nurturer')) return 'You notice what people need and help create space for them to feel understood.';
  if (roles.includes('spark')) return 'You bring imagination and energy to the things that could be, not just the things that are.';
  if (roles.includes('wanderer')) return 'You find your own way forward, staying open to unexpected paths and possibilities.';
  return 'Your perspective brings together a distinctive way of noticing, understanding, and moving through the world.';
}


// Helper functions for share card content (shorter versions)
function generateTraits(primaryRoles: string[], secondaryRoles: string[]): Array<{ icon: string; title: string; color: string }> {
  const allRoles = [...primaryRoles, ...secondaryRoles];
  const traitMap: Record<string, Array<{ icon: string; title: string; color: string }>> = {
    thinker: [
      { icon: "✎", title: "Analytical", color: "bg-[#f0ebf7] text-[#50348e]" },
      { icon: "◉", title: "Deep", color: "bg-[#fbf1e2] text-[#b66a2d]" },
    ],
    seeker: [
      { icon: "♡", title: "Curious", color: "bg-[#f0ebf7] text-[#50348e]" },
      { icon: "♨", title: "Exploratory", color: "bg-[#fbf1e2] text-[#b66a2d]" },
    ],
    builder: [
      { icon: "⚒", title: "Practical", color: "bg-[#f0ebf7] text-[#50348e]" },
      { icon: "◉", title: "Constructive", color: "bg-[#fbf1e2] text-[#b66a2d]" },
    ],
    nurturer: [
      { icon: "♡", title: "Empathetic", color: "bg-[#f0ebf7] text-[#50348e]" },
      { icon: "☾", title: "Supportive", color: "bg-[#fbf1e2] text-[#b66a2d]" },
    ],
    spark: [
      { icon: "✨", title: "Creative", color: "bg-[#f0ebf7] text-[#50348e]" },
      { icon: "♨", title: "Inspiring", color: "bg-[#fbf1e2] text-[#b66a2d]" },
    ],
    wanderer: [
      { icon: "♧", title: "Independent", color: "bg-[#f0ebf7] text-[#50348e]" },
      { icon: "◉", title: "Adaptable", color: "bg-[#fbf1e2] text-[#b66a2d]" },
    ],
  };

  const traits: Array<{ icon: string; title: string; color: string }> = [];
  allRoles.forEach((role: string) => {
    if (traitMap[role]) {
      traits.push(...traitMap[role].slice(0, 2));
    }
  });

  while (traits.length < 4) {
    traits.push({ icon: "✦", title: "Unique", color: "bg-[#f0ebf7] text-[#50348e]" });
  }
  return traits.slice(0, 4);
}

function generatePeopleTraits(primaryRoles: string[], secondaryRoles: string[]): Array<{ number: string; text: string; color: string }> {
  const allRoles = [...primaryRoles, ...secondaryRoles];
  const peopleMap: Record<string, string[]> = {
    thinker: [
      "Can accidentally turn a simple conversation into a deep one.",
      "Someone can tell you a story and you'll sometimes get stuck on one little detail they barely thought was important.",
      "You can ask one follow-up question and somehow end up asking three more.",
    ],
    seeker: [
      "Always looking for the next interesting thing to explore.",
      "You tend to ask 'why' more than most people.",
      "Your conversations often branch into unexpected directions.",
    ],
    builder: [
      "You're often the one who turns ideas into reality.",
      "When others are still discussing, you're already planning the implementation.",
      "You notice practical issues that others miss.",
    ],
    nurturer: [
      "You naturally pick up on how others are feeling.",
      "People often come to you when they need support.",
      "You're the one who remembers the small details about people.",
    ],
    spark: [
      "You often see possibilities that others miss.",
      "Your energy can shift the mood of a room.",
      "You're good at finding creative solutions to problems.",
    ],
    wanderer: [
      "You prefer to keep your options open.",
      "You're comfortable with uncertainty and change.",
      "You often find your own path rather than following others.",
    ],
  };

  const people: Array<{ number: string; text: string; color: string }> = [];
  const colors = ['text-[#8064cf]', 'text-[#cf8966]', 'text-[#8064cf]'];
  
  allRoles.forEach((role: string, index: number) => {
    if (peopleMap[role]) {
      peopleMap[role].forEach((text: string, i: number) => {
        if (people.length < 3) {
          people.push({
            number: String(people.length + 1).padStart(2, '0'),
            text,
            color: colors[people.length % colors.length],
          });
        }
      });
    }
  });

  while (people.length < 3) {
    people.push({
      number: String(people.length + 1).padStart(2, '0'),
      text: "You bring a unique perspective to every situation.",
      color: colors[people.length % colors.length],
    });
  }
  return people.slice(0, 3);
}

function generateNaturalItems(primaryRoles: string[]): string[] {
  const naturalMap: Record<string, string[]> = {
    thinker: [
      "Asking questions that make people pause and think.",
      "Connecting something you're hearing now with something you noticed much earlier.",
      "Naturally notices motives, systems, and cause-and-effect.",
    ],
    seeker: [
      "Naturally curious about new ideas and perspectives.",
      "Good at finding connections between seemingly unrelated things.",
      "Often sees potential where others see limitations.",
    ],
    builder: [
      "Takes practical steps to turn ideas into reality.",
      "Good at breaking down complex problems into manageable parts.",
      "Naturally focuses on what can be accomplished.",
    ],
    nurturer: [
      "Naturally attuned to the emotional needs of others.",
      "Good at creating supportive environments.",
      "Often knows what people need before they ask.",
    ],
    spark: [
      "Naturally generates creative ideas and solutions.",
      "Good at inspiring others with enthusiasm.",
      "Often sees innovative approaches to problems.",
    ],
    wanderer: [
      "Naturally comfortable with ambiguity and change.",
      "Good at adapting to new situations.",
      "Often finds unique paths that others miss.",
    ],
  };

  if (primaryRoles.length > 0) {
    const role = primaryRoles[0] as keyof typeof naturalMap;
    if (naturalMap[role]) {
      return naturalMap[role];
    }
  }
  return [
    "Brings a unique perspective to every situation.",
    "Adapts well to changing circumstances.",
    "Finds innovative solutions to problems.",
  ];
}

function generateShadowItems(primaryRoles: string[]): string[] {
  const shadowMap: Record<string, string[]> = {
    thinker: [
      "May seem emotionally distant when they're simply thinking.",
      "You can keep looking for an explanation even when there may not be enough information to find one.",
      "They can struggle to stay interested when a conversation feels vague, surface-level, or empty.",
    ],
    seeker: [
      "May jump between interests before fully exploring any one.",
      "Can sometimes lose focus on practical details while chasing new ideas.",
      "May appear indecisive when weighing multiple options.",
    ],
    builder: [
      "May prioritize efficiency over emotional considerations.",
      "Can become frustrated when others want to spend more time discussing.",
      "May overlook the human element in pursuit of practical solutions.",
    ],
    nurturer: [
      "May take on too much emotional responsibility for others.",
      "Can struggle to set boundaries with people they care about.",
      "May neglect their own needs while caring for others.",
    ],
    spark: [
      "May struggle with follow-through on long-term projects.",
      "Can become bored with routine tasks quickly.",
      "May have trouble focusing on details when excited about the big picture.",
    ],
    wanderer: [
      "May appear unreliable to those who value consistency.",
      "Can struggle with commitment to long-term plans.",
      "May seem disconnected from group norms and expectations.",
    ],
  };

  if (primaryRoles.length > 0) {
    const role = primaryRoles[0] as keyof typeof shadowMap;
    if (shadowMap[role]) {
      return shadowMap[role];
    }
  }
  return [
    "May seem detached from group expectations.",
    "Can struggle with long-term planning.",
    "May appear unreliable to those who value consistency.",
  ];
}

function generateQuote(primaryRoles: string[], secondaryRoles: string[]): string {
  const quoteMap: Record<string, string> = {
    thinker: "They always seem to notice something everyone else missed.",
    seeker: "They're always asking questions that make you think differently.",
    builder: "They're the one who actually makes things happen.",
    nurturer: "They make everyone feel seen and understood.",
    spark: "They bring energy and creativity to everything they do.",
    wanderer: "They always seem to find their own unique path.",
  };

  if (primaryRoles.length > 0) {
    const role = primaryRoles[0] as keyof typeof quoteMap;
    if (quoteMap[role]) {
      return quoteMap[role];
    }
  }
  return "They bring a unique and valuable perspective to every situation.";
}

function generateConnectionText(primaryRoles: string[], secondaryRoles: string[]): string {
  const connectionMap: Record<string, string> = {
    thinker: "You tend to feel closer to people you can genuinely explore ideas with—someone you can question, analyze, and think deeply with without feeling like you need to simplify your thoughts.",
    seeker: "You tend to feel closer to people who are open to exploration and discovery—someone you can wonder with, question assumptions, and discover new perspectives together.",
    builder: "You tend to feel closer to people who are practical and action-oriented—someone you can plan with, build with, and turn ideas into reality together.",
    nurturer: "You tend to feel closer to people who are emotionally open and supportive—someone you can be vulnerable with, care for, and build meaningful connections with.",
    spark: "You tend to feel closer to people who are creative and enthusiastic—someone you can brainstorm with, inspire, and explore new possibilities with.",
    wanderer: "You tend to feel closer to people who respect your independence—someone you can explore freely with, who doesn't try to constrain your natural need for autonomy.",
  };

  if (primaryRoles.length > 0) {
    const role = primaryRoles[0] as keyof typeof connectionMap;
    if (connectionMap[role]) {
      return connectionMap[role];
    }
  }
  return "You tend to feel closer to people who appreciate your unique perspective and approach to life.";
}
