'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAssessmentStore } from '@/store/assessmentStore';
import { ScoringResult, getAssessmentResultPublic } from '@/lib/api/scoring';

const CLUSTER_DISPLAY_NAMES: Record<string, string> = {
  thinker: 'Thinker',
  seeker: 'Seeker',
  builder: 'Builder',
  nurturer: 'Nurturer',
  spark: 'Spark',
  wanderer: 'Wanderer',
};

const CLUSTER_CODES: Record<string, string> = {
  thinker: 'T',
  seeker: 'S',
  builder: 'B',
  nurturer: 'N',
  spark: 'K',
  wanderer: 'W',
};

export default function AssessmentResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { scoringResult, assessmentId, isComplete } = useAssessmentStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publicResult, setPublicResult] = useState<ScoringResult | null>(null);

  useEffect(() => {
    // Check if assessment ID is provided in URL for public access
    const urlAssessmentId = searchParams.get('assessmentId');
    
    if (urlAssessmentId) {
      // Public access - fetch result using public endpoint
      setIsLoading(true);
      getAssessmentResultPublic(urlAssessmentId)
        .then((result) => {
          setPublicResult(result);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : 'Failed to load results');
          setIsLoading(false);
        });
    } else if (!isComplete || !scoringResult) {
      // If assessment is not complete and no public ID, redirect to assessment page
      router.push('/assessment');
      return;
    } else {
      setIsLoading(false);
    }
  }, [isComplete, scoringResult, router, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center text-[#171b4f]">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#4f2696] border-t-transparent mx-auto"></div>
          <p>Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center text-[#171b4f]">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/assessment')}
            className="rounded-lg bg-[#4f2696] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#3d1d78]"
          >
            Return to Assessment
          </button>
        </div>
      </div>
    );
  }

  const result = publicResult || scoringResult;
  
  if (!result) {
    return (
      <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center text-[#171b4f]">
        <div className="text-center">
          <p>No results found. Please complete the assessment first.</p>
          <button 
            onClick={() => router.push('/assessment')}
            className="mt-4 rounded-lg bg-[#4f2696] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#3d1d78]"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const { primaryRoles, secondaryRoles, influenceRoles, percentages, rawScores } = result;
  
  // Generate profile code based on roles
  const primaryCode = primaryRoles.map((role: string) => CLUSTER_CODES[role]).join('');
  const secondaryCode = secondaryRoles.length > 0 ? secondaryRoles.map((role: string) => CLUSTER_CODES[role]).join('') : '';
  const profileCode = `${primaryCode}${secondaryCode}`;
  
  // Get display names
  const primaryNames = primaryRoles.map((role: string) => CLUSTER_DISPLAY_NAMES[role]);
  const secondaryNames = secondaryRoles.map((role: string) => CLUSTER_DISPLAY_NAMES[role]);
  
  // Generate traits based on primary roles
  const traits = generateTraits(primaryRoles as string[], secondaryRoles as string[]);
  const people = generatePeopleTraits(primaryRoles as string[], secondaryRoles as string[]);
  const naturalItems = generateNaturalItems(primaryRoles as string[]);
  const shadowItems = generateShadowItems(primaryRoles as string[]);

  return (
    <main className="min-h-screen bg-[#faf7f0] px-4 py-6 text-[#171b4f] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[910px]">
        {/* Hero Section */}
        <section className="grid min-h-[390px] items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 flex items-center gap-3 text-xs font-bold tracking-wide text-[#252361]">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#51408f] text-2xl">
                ♧
              </span>
              <span>YOUR COGNITIVE ARCHETYPE</span>
            </div>

            <h1 className="font-serif text-[58px] font-bold leading-[0.83] tracking-[-0.08em] text-[#11174d] sm:text-[78px]">
              The {primaryNames.join(' + ')}{" "}
              <span className="font-sans text-xl tracking-normal sm:text-2xl">
                ({profileCode})
              </span>
            </h1>

            {secondaryNames.length > 0 && (
              <div className="my-5 flex items-center gap-3 font-serif text-2xl sm:text-[28px]">
                {primaryNames.map((name, i) => (
                  <span key={i} className={i === 0 ? '' : '×'}>{name}</span>
                ))}
                {secondaryNames.map((name, i) => (
                  <strong key={i} className="font-normal text-[#c7652e]">{name}</strong>
                ))}
              </div>
            )}

            <p className="max-w-[510px] text-sm leading-6 text-[#3b3a50] sm:text-[15px]">
              Your cognitive pattern combines {primaryNames.join(' and ')}{secondaryNames.length > 0 ? ` with ${secondaryNames.join(' and ')}` : ''}. 
              This unique combination shapes how you process information, make decisions, and interact with the world around you.
            </p>
          </div>

          {/* Character Illustration */}
          <div className="relative flex min-h-[330px] items-center justify-center">
            <div className="relative mt-[-30px] h-[270px] w-[125px] rounded-[48%_48%_12px_12px] border-4 border-dashed border-[#3c236d] bg-[#9b72bf] shadow-[inset_0_0_0_5px_rgba(64,29,110,0.13)]">
              <div className="absolute -top-3 left-1 h-[54px] w-[37px] -rotate-12 rounded-t-full border-4 border-b-0 border-dashed border-[#3c236d] bg-[#9b72bf]" />
              <div className="absolute -top-3 right-1 h-[54px] w-[37px] rotate-12 rounded-t-full border-4 border-b-0 border-dashed border-[#3c236d] bg-[#9b72bf]" />

              <div className="absolute left-[22px] top-[77px] h-[42px] w-[33px] rounded-full border-2 border-[#2d1a67] bg-white">
                <span className="absolute right-1 top-3 h-[17px] w-3 rounded-full bg-[#15205b]" />
              </div>

              <div className="absolute right-[21px] top-[77px] h-[42px] w-[33px] rounded-full border-2 border-[#2d1a67] bg-white">
                <span className="absolute left-1 top-3 h-[17px] w-3 rounded-full bg-[#15205b]" />
              </div>

              <div className="absolute left-[59px] top-[123px] rotate-12 text-3xl text-[#302062]">
                ⌣
              </div>

              <div className="absolute -left-[59px] top-[142px] h-[26px] w-[73px] rotate-[57deg] rounded-b-full border-4 border-b-0 border-[#2a2369]" />
              <div className="absolute -right-[59px] top-[142px] h-[26px] w-[73px] -rotate-[57deg] rounded-b-full border-4 border-b-0 border-[#2a2369]" />

              <div className="absolute -bottom-[70px] left-[37px] h-[76px] w-[5px] rotate-1 rounded-full bg-[#25246b] after:absolute after:-bottom-0.5 after:-left-5 after:h-[11px] after:w-[31px] after:-rotate-8 after:rounded-full after:bg-[#25246b] after:content-['']" />
              <div className="absolute -bottom-[70px] right-[32px] h-[76px] w-[5px] -rotate-1 rounded-full bg-[#25246b] after:absolute after:-bottom-0.5 after:-right-5 after:rotate-8 after:rounded-full after:bg-[#25246b] after:content-['']" />
            </div>

            <div className="absolute right-0 top-[105px] rotate-[-5deg] font-serif text-[17px] italic leading-5 text-[#75618e] sm:right-5">
              Unique combination.
              Deeper understanding.
              <span className="mt-4 block pl-3 text-2xl">—</span>
            </div>
          </div>
        </section>

        {/* Pattern Snapshot Section */}
        <section className="mt-4 rounded-xl border border-[#e4ded4] bg-white/20 px-5 py-4 shadow-sm">
          <h2 className="mb-4 flex items-center gap-3 font-serif text-xl">
            <span className="text-2xl text-[#4d319b]">✦</span>
            Pattern Snapshot
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-8">
            {traits.map((trait) => (
              <div
                key={trait.title}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold ${trait.color}`}
              >
                <span>{trait.icon}</span>
                {trait.title}
              </div>
            ))}
          </div>
        </section>

        {/* Score Breakdown */}
        <section className="mt-4 rounded-xl border border-[#e4ded4] bg-white/20 px-5 py-4 shadow-sm">
          <h2 className="mb-4 flex items-center gap-3 font-serif text-xl">
            <span className="text-2xl text-[#4d319b]">📊</span>
            Your Score Breakdown
          </h2>

          <div className="space-y-3">
            {Object.entries(percentages).map(([cluster, percentage]) => (
              <div key={cluster} className="flex items-center gap-4">
                <div className="w-24 text-sm font-semibold text-[#414052]">
                  {CLUSTER_DISPLAY_NAMES[cluster]}
                </div>
                <div className="flex-1 h-3 rounded-full bg-[#e4ded4] overflow-hidden">
                  <div 
                    className="h-full bg-[#4f2696] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-16 text-right text-sm font-bold text-[#414052]">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Around People Section */}
        <section className="mt-4 rounded-xl border border-[#e4ded4] bg-white/20 px-5 py-4 shadow-sm">
          <h2 className="mb-4 flex items-center gap-3 font-serif text-xl">
            <span className="text-2xl text-[#4f3394]">♧</span>
            What You&apos;re Like Around People
          </h2>

          <div className="grid gap-0 sm:grid-cols-3">
            {people.map((item, index) => (
              <article
                key={item.number}
                className={`py-3 sm:px-5 sm:py-0 ${
                  index !== 2
                    ? "border-b border-[#e2ddd8] sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <div className={`mb-2 text-[22px] ${item.color}`}>
                  {item.number}
                </div>
                <p className="text-sm leading-5 text-[#414052]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="mt-4 rounded-xl border border-[#e4ded4] bg-[#f4edf8] px-5 py-4">
          <h2 className="mb-2 flex items-center gap-3 font-serif text-xl">
            <span className="text-2xl text-[#4f3394]">☏</span>
            If Someone Had To Describe You...
          </h2>

          <blockquote className="font-serif text-2xl italic leading-tight text-[#14194d] sm:ml-11 sm:text-3xl">
            "{generateQuote(primaryRoles, secondaryRoles)}"
          </blockquote>
        </section>

        {/* Natural and Shadow Sections */}
        <section className="mt-4 grid gap-4 sm:grid-cols-2">
          <InfoCard
            icon="⚙"
            title="What Comes Naturally"
            items={naturalItems}
            bulletColor="bg-[#56309a]"
          />

          <InfoCard
            icon="☾"
            title="Shadow Side"
            items={shadowItems}
            bulletColor="bg-[#d77617]"
          />
        </section>

        {/* Connection Section */}
        <section className="mt-4 rounded-xl border border-[#e4ded4] bg-white/20 px-5 py-4 shadow-sm">
          <h2 className="mb-3 flex items-center gap-3 font-serif text-xl">
            <span className="text-3xl text-[#4f3394]">♡</span>
            How You Connect
          </h2>

          <p className="text-sm leading-5 text-[#414052] sm:ml-11">
            {generateConnectionText(primaryRoles, secondaryRoles)}
          </p>
        </section>

        {/* Beneath the Surface Section */}
        <section className="mt-4 grid overflow-hidden rounded-xl border border-[#e4ded4] bg-[#f2ebf7] sm:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-[#d3c7db] p-6 sm:border-b-0 sm:border-r">
            <h2 className="mb-4 flex items-center gap-3 font-serif text-xl">
              <span className="text-2xl text-[#4f3394]">♙</span>
              Beneath the Surface
            </h2>

            <p className="text-sm leading-5 text-[#414052]">
              The first half described what this pattern looks like in everyday life.
              The second half explores the mental pull that naturally creates those experiences.
            </p>
          </div>

          <div className="p-6">
            <h3 className="mb-3 font-serif text-base font-bold leading-5">
              You know your drivers.
              Now see what&apos;s underneath.
            </h3>

            <p className="mb-2 text-xs text-[#414052]">
              Unlock the rest of your profile, including:
            </p>

            <ul className="mb-3 space-y-1 text-sm text-[#3d3b4f]">
              <li>
                <span className="mr-2 text-lg text-[#cd775d]">♡</span>
                Love &amp; Relationships
              </li>
              <li>
                <span className="mr-2 text-lg text-[#cd775d]">▣</span>
                Career &amp; Direction
              </li>
              <li>
                <span className="mr-2 text-lg text-[#cd775d]">♧</span>
                Social &amp; Communication
              </li>
            </ul>

            <button className="w-full rounded-lg bg-[#4f2696] px-3 py-3 text-xs font-bold text-white transition hover:bg-[#3d1d78]">
              Unlock Full Profile — $7 <span className="ml-2 text-base">→</span>
            </button>
          </div>
        </section>

        {/* Footer Actions */}
        <footer className="flex items-center justify-between gap-4 px-2 pt-6">
          <button 
            onClick={() => {
              useAssessmentStore.getState().resetAssessment();
              router.push('/assessment');
            }}
            className="rounded-full border border-[#6855a0] px-4 py-3 text-xs font-bold text-[#503e90] transition hover:bg-[#eee8f7] sm:px-6"
          >
            <span className="mr-2 text-base">←</span>
            Retake Test
          </button>

          <button 
            onClick={() => router.push('/account')}
            className="rounded-lg bg-[#4f2696] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#3d1d78] sm:px-6"
          >
            Go to Dashboard <span className="ml-2 text-base">→</span>
          </button>
        </footer>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  items,
  bulletColor,
}: {
  icon: string;
  title: string;
  items: string[];
  bulletColor: string;
}) {
  return (
    <section className="rounded-xl border border-[#e4ded4] bg-white/20 px-5 py-4 shadow-sm">
      <h2 className="mb-4 flex items-center gap-3 font-serif text-xl">
        <span className="text-2xl text-[#4f3394]">{icon}</span>
        {title}
      </h2>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="relative pl-5 text-sm leading-5 text-[#414052]"
          >
            <span
              className={`absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full ${bulletColor}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

// Helper functions to generate content based on roles
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

  // Ensure we have exactly 4 traits
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

  // Ensure we have exactly 3 people traits
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