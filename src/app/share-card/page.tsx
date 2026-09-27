'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';

// Archetype-specific color mappings
const ARCHETYPE_COLORS: Record<string, { primary: string; secondary: string; accent: string }> = {
  // Thinker combinations
  'TS': { primary: '#4B3B8C', secondary: '#C4A747', accent: '#8862c7' }, // The Interpreter
  'TB': { primary: '#4B3B8C', secondary: '#1b5dc9', accent: '#4a90e2' }, // Thinker + Builder
  'TN': { primary: '#4B3B8C', secondary: '#8862c7', accent: '#9b72bf' }, // Thinker + Nurturer
  'TK': { primary: '#4B3B8C', secondary: '#efad10', accent: '#ffc107' }, // Thinker + Spark
  'TW': { primary: '#4B3B8C', secondary: '#11978c', accent: '#20c997' }, // Thinker + Wanderer
  
  // Seeker combinations
  'ST': { primary: '#C4A747', secondary: '#4B3B8C', accent: '#8862c7' }, // Seeker + Thinker
  'SB': { primary: '#C4A747', secondary: '#1b5dc9', accent: '#4a90e2' }, // Seeker + Builder
  'SN': { primary: '#C4A747', secondary: '#8862c7', accent: '#9b72bf' }, // Seeker + Nurturer
  'SK': { primary: '#C4A747', secondary: '#efad10', accent: '#ffc107' }, // Seeker + Spark
  'SW': { primary: '#C4A747', secondary: '#11978c', accent: '#20c997' }, // Seeker + Wanderer
  
  // Default fallback
  'default': { primary: '#4B3B8C', secondary: '#C4A747', accent: '#8862c7' },
};

function getArchetypeColors(profileCode: string) {
  // Get the first two characters for primary-secondary mapping
  const codeKey = profileCode.substring(0, 2).toUpperCase();
  return ARCHETYPE_COLORS[codeKey] || ARCHETYPE_COLORS['default'];
}

type ShareCardSection = {
  id: string;
  title: string;
  description: string;
  required: boolean;
};

const AVAILABLE_SECTIONS: ShareCardSection[] = [
  {
    id: 'archetype-result',
    title: 'Archetype Result',
    description: 'Your primary cognitive archetype and pattern code',
    required: true,
  },
  {
    id: 'pattern-snapshot',
    title: 'Pattern Snapshot',
    description: 'Key traits that define your cognitive style',
    required: false,
  },
  {
    id: 'around-people',
    title: 'What You\'re Like Around People',
    description: 'How you naturally interact with others',
    required: false,
  },
  {
    id: 'quote',
    title: 'If Someone Had To Describe You',
    description: 'A quote that captures your essence',
    required: false,
  },
  {
    id: 'natural',
    title: 'What Comes Naturally',
    description: 'Your innate strengths and tendencies',
    required: false,
  },
  {
    id: 'shadow',
    title: 'Shadow Side',
    description: 'Areas where your pattern can create challenges',
    required: false,
  },
  {
    id: 'connection',
    title: 'How You Connect',
    description: 'Your style of building relationships',
    required: false,
  },
];

export default function ShareCardBuilder() {
  const router = useRouter();
  const [selectedSections, setSelectedSections] = useState<string[]>(['archetype-result']);
  const [currentStep, setCurrentStep] = useState<'select' | 'preview' | 'share'>('select');
  const [shareCardData, setShareCardData] = useState<any>(null);
  const shareCardPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load share card data from localStorage
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
    const section = AVAILABLE_SECTIONS.find(s => s.id === sectionId);
    if (section?.required) return; // Can't deselect required sections

    setSelectedSections(prev => {
      if (prev.includes(sectionId)) {
        return prev.filter(id => id !== sectionId);
      } else {
        if (prev.length >= 3) return prev; // Max 3 sections (1 required + 2 optional)
        return [...prev, sectionId];
      }
    });
  };

  const getSelectedCount = () => {
    return selectedSections.filter(id => !AVAILABLE_SECTIONS.find(s => s.id === id)?.required).length;
  };

  const canSelectMore = () => {
    return getSelectedCount() < 2;
  };

  const handlePreview = () => {
    if (getSelectedCount() === 2) {
      setCurrentStep('preview');
    }
  };

  const handleBack = () => {
    if (currentStep === 'preview') {
      setCurrentStep('select');
    } else if (currentStep === 'share') {
      setCurrentStep('preview');
    }
  };

  const handleShare = () => {
    setCurrentStep('share');
  };

  const handleDownload = async () => {
    if (shareCardPreviewRef.current) {
      try {
        const canvas = await html2canvas(shareCardPreviewRef.current, {
          backgroundColor: '#faf7f0',
          scale: 2, // Higher scale for better quality
          useCORS: true,
        });
        
        const link = document.createElement('a');
        link.download = `cat-20-share-card-${shareCardData.profileCode}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Failed to generate image:', error);
        alert('Failed to generate image. Please try again.');
      }
    }
  };

  if (!shareCardData) {
    return (
      <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center text-[#171b4f]">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#4f2696] border-t-transparent mx-auto"></div>
          <p>Loading share card data...</p>
        </div>
      </div>
    );
  }

  const colors = getArchetypeColors(shareCardData.profileCode);

  return (
    <main className="min-h-screen bg-[#faf7f0] px-4 py-6 text-[#171b4f] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <header className="mb-8">
          <button 
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#503e90] hover:opacity-80"
          >
            <span className="text-lg">←</span>
            Back to Results
          </button>
          
          <h1 className="font-serif text-[48px] font-bold leading-[0.9] tracking-[-0.08em] text-[#11174d] sm:text-[58px]">
            Create Your Share Card
          </h1>
          <p className="mt-3 max-w-[600px] text-sm leading-6 text-[#3b3a50] sm:text-[15px]">
            Choose two additional sections to share alongside your Archetype Result.
          </p>
        </header>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center gap-4 text-sm font-semibold">
          <div className={`flex items-center gap-2 ${currentStep === 'select' ? 'text-[#4f2696]' : 'text-[#6855a0]'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep === 'select' ? 'bg-[#4f2696] text-white' : 'bg-[#e4ded4] text-[#6855a0]'}`}>
              1
            </span>
            Select Sections
          </div>
          <div className="h-px flex-1 bg-[#e4ded4]" />
          <div className={`flex items-center gap-2 ${currentStep === 'preview' ? 'text-[#4f2696]' : 'text-[#6855a0]'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep === 'preview' ? 'bg-[#4f2696] text-white' : 'bg-[#e4ded4] text-[#6855a0]'}`}>
              2
            </span>
            Preview Card
          </div>
          <div className="h-px flex-1 bg-[#e4ded4]" />
          <div className={`flex items-center gap-2 ${currentStep === 'share' ? 'text-[#4f2696]' : 'text-[#6855a0]'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep === 'share' ? 'bg-[#4f2696] text-white' : 'bg-[#e4ded4] text-[#6855a0]'}`}>
              3
            </span>
            Download & Share
          </div>
        </div>

        {/* Main Content */}
        {currentStep === 'select' && (
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Section Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-[#11174d]">
                  Choose Your Sections
                </h2>
                <div className="text-sm font-semibold text-[#503e90]">
                  {getSelectedCount()} of 2 sections selected
                </div>
              </div>

              <div className="space-y-3">
                {AVAILABLE_SECTIONS.map((section) => {
                  const isSelected = selectedSections.includes(section.id);
                  const isDisabled = !canSelectMore() && !isSelected && !section.required;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      disabled={isDisabled}
                      className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                        isSelected 
                          ? 'border-[#4f2696] bg-[#f0ebf7]' 
                          : isDisabled
                            ? 'border-[#e4ded4] bg-[#faf7f0] opacity-50 cursor-not-allowed'
                            : 'border-[#e4ded4] bg-white/20 hover:border-[#6855a0] hover:bg-[#f0ebf7]'
                      }`}
                      style={isSelected ? { borderColor: colors.primary, backgroundColor: '#f0ebf7' } : {}}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-[#11174d]">
                              {section.title}
                              {section.required && (
                                <span className="ml-2 rounded-full px-2 py-0.5 text-xs font-bold text-white" style={{ backgroundColor: colors.secondary }}>
                                  REQUIRED
                                </span>
                              )}
                            </h3>
                          </div>
                          <p className="mt-1 text-sm text-[#414052]">
                            {section.description}
                          </p>
                        </div>
                        <div className={`h-6 w-6 rounded-full border-2 ${
                          isSelected 
                            ? 'bg-white' 
                            : 'border-[#6855a0]'
                        }`}
                        style={isSelected ? { borderColor: colors.primary, backgroundColor: colors.primary } : { borderColor: '#6855a0' }}
                        >
                          {isSelected && (
                            <svg className="h-full w-full p-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handlePreview}
                disabled={getSelectedCount() !== 2}
                className="w-full rounded-lg px-6 py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:bg-[#e4ded4] disabled:text-[#6855a0] disabled:cursor-not-allowed"
                style={{ backgroundColor: getSelectedCount() === 2 ? colors.primary : '#e4ded4' }}
              >
                Preview Your Card →
              </button>
            </div>

            {/* Live Preview */}
            <div className="lg:sticky lg:top-8">
              <div className="rounded-xl border border-[#e4ded4] bg-white/20 p-6 shadow-sm">
                <h3 className="mb-4 font-serif text-xl font-bold text-[#11174d]">
                  Live Preview
                </h3>
                <div className="rounded-lg border border-[#e4ded4] bg-[#faf7f0] p-4">
                  <div ref={shareCardPreviewRef} className="share-card-content">
                    <ShareCardPreview 
                      data={shareCardData}
                      selectedSections={selectedSections}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'preview' && (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-xl border border-[#e4ded4] bg-white/20 p-8 shadow-sm">
              <h2 className="mb-6 font-serif text-2xl font-bold text-center text-[#11174d]">
                Your Share Card
              </h2>
              <div className="rounded-lg border border-[#e4ded4] bg-[#faf7f0] p-6">
                <div ref={shareCardPreviewRef}>
                  <ShareCardPreview 
                    data={shareCardData}
                    selectedSections={selectedSections}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handleBack}
                  className="rounded-full border border-[#6855a0] px-6 py-3 text-sm font-bold text-[#503e90] transition hover:bg-[#eee8f7]"
                >
                  ← Edit Sections
                </button>
                <button
                  onClick={handleShare}
                  className="rounded-lg px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: colors.primary }}
                >
                  Download & Share →
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'share' && (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-xl border border-[#e4ded4] bg-white/20 p-8 shadow-sm text-center">
              <h2 className="mb-4 font-serif text-2xl font-bold text-[#11174d]">
                Download Your Share Card
              </h2>
              <p className="mb-6 text-sm text-[#414052]">
                Your share card is ready! Download it to share on social media, save to your phone, or send to friends.
              </p>
              
              <div className="mb-6 rounded-lg border border-[#e4ded4] bg-[#faf7f0] p-6">
                <div ref={shareCardPreviewRef}>
                  <ShareCardPreview 
                    data={shareCardData}
                    selectedSections={selectedSections}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={handleDownload}
                  className="rounded-lg px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: colors.primary }}
                >
                  Download Image
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'My CAT-20 Cognitive Profile',
                        text: `I'm a ${shareCardData.primaryNames.join(' + ')} (${shareCardData.profileCode})! Check out my cognitive archetype.`,
                        url: window.location.href
                      });
                    } else {
                      alert('Share functionality not available on this device. Please download the image and share manually.');
                    }
                  }}
                  className="rounded-lg border-2 px-6 py-3 text-sm font-bold transition hover:opacity-90"
                  style={{ borderColor: colors.secondary, color: colors.secondary, backgroundColor: '#fef9f0' }}
                >
                  Share
                </button>
              </div>

              <button
                onClick={handleBack}
                className="mt-6 text-sm font-semibold text-[#503e90] hover:opacity-80"
              >
                ← Back to Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function ShareCardPreview({ data, selectedSections }: { data: any; selectedSections: string[] }) {
  const { primaryNames, secondaryNames, profileCode, result } = data;
  const { primaryRoles, secondaryRoles } = result;
  const colors = getArchetypeColors(profileCode);
  
  // Generate shorter share card content
  const getShareCardContent = (sectionId: string) => {
    switch (sectionId) {
      case 'pattern-snapshot':
        return generateTraits(primaryRoles, secondaryRoles).slice(0, 2).map(t => t.title).join(' • ');
      case 'around-people':
        return generatePeopleTraits(primaryRoles, secondaryRoles)[0]?.text || '';
      case 'quote':
        return generateQuote(primaryRoles, secondaryRoles);
      case 'natural':
        return generateNaturalItems(primaryRoles).slice(0, 2).join(' ');
      case 'shadow':
        return generateShadowItems(primaryRoles).slice(0, 1);
      case 'connection':
        return generateConnectionText(primaryRoles, secondaryRoles).split('.')[0] + '.';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Archetype Result - Always included */}
      <div className="border-b border-[#e4ded4] pb-4">
        <div className="mb-2 text-xs font-bold tracking-wide" style={{ color: colors.primary }}>
          YOUR COGNITIVE ARCHETYPE
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#11174d]">
          The {primaryNames.join(' + ')}{" "}
          <span className="font-sans text-sm tracking-normal">
            ({profileCode})
          </span>
        </h3>
        {secondaryNames.length > 0 && (
          <div className="my-2 flex items-center gap-2 font-serif text-lg">
            {primaryNames.map((name: string, i: number) => (
              <span key={i} className={i === 0 ? '' : '×'}>{name}</span>
            ))}
            {secondaryNames.map((name: string, i: number) => (
              <strong key={i} className="font-normal" style={{ color: colors.secondary }}>{name}</strong>
            ))}
          </div>
        )}
      </div>

      {/* Selected Sections */}
      {selectedSections.filter(id => id !== 'archetype-result').map((sectionId) => {
        const section = AVAILABLE_SECTIONS.find(s => s.id === sectionId);
        if (!section) return null;
        
        return (
          <div key={sectionId} className="border-b border-[#e4ded4] pb-4 last:border-b-0">
            <h4 className="font-semibold" style={{ color: colors.primary }}>
              {section.title}
            </h4>
            <p className="mt-1 text-sm text-[#414052]">
              {getShareCardContent(sectionId)}
            </p>
          </div>
        );
      })}
    </div>
  );
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