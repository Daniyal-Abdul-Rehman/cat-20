'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAssessmentStore } from '@/store/assessmentStore';
import { useAuthStore } from '@/store/authStore';
import { ScoringResult, getAssessmentResultPublic } from '@/lib/api/scoring';
import AccountHeader from '@/components/AccountHeader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CLUSTER_DISPLAY_NAMES, CLUSTER_CODES, CLUSTER_COLORS, ARCHETYPE_NAMES } from '@/lib/clusterColors';

function SectionHeading({ icon, title, primaryColor }: { icon?: string; title: string; primaryColor?: string }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 font-serif text-xl text-[#17164d]">
      {icon && <span className="text-2xl" style={{ color: primaryColor || '#4f3394' }}>{icon}</span>}
      {title}
    </h2>
  );
}

export default function AssessmentResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { scoringResult, assessmentId, isComplete } = useAssessmentStore();
  const { user, isAuthenticated, refreshUserData, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publicResult, setPublicResult] = useState<ScoringResult | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (hasLoaded) return;

    const loadPage = async () => {
      setHasLoaded(true);

      // Refresh user data if authenticated to get latest subscription status
      if (isAuthenticated) {
        try {
          await refreshUserData();

          // Check if there's a guest assessment to assign
          const guestAssessmentId = localStorage.getItem('guest_assessment_id');
          if (guestAssessmentId) {
            try {
              const { assessmentApi } = await import('@/lib/api');
              await assessmentApi.assignAssessmentToUser(guestAssessmentId);
              console.log('Guest assessment assigned to user');
              localStorage.removeItem('guest_assessment_id');
            } catch (err) {
              console.error('Failed to assign guest assessment:', err);
            }
          }
        } catch (err) {
          console.error('Failed to refresh user data:', err);
        }
      } else {
        checkAuth();
      }

      // Check if assessment ID is provided in URL for public access
      const urlAssessmentId = searchParams.get('assessmentId');

      if (urlAssessmentId && urlAssessmentId !== 'null') {
        // Public access - fetch result using public endpoint
        getAssessmentResultPublic(urlAssessmentId)
          .then((result) => {
            setPublicResult(result);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error('Failed to fetch public result:', err);
            setError(err instanceof Error ? err.message : 'Failed to load results');
            setIsLoading(false);
          });
      } else if (isComplete && scoringResult) {
        // Use the store result if assessment is complete
        console.log('Using store result for completed assessment');
        setIsLoading(false);
      } else if (isAuthenticated && user?.assessmentResults) {
        // User is authenticated and has assessment results - redirect to account page
        // Only do this if no URL assessmentId was provided
        console.log('User is authenticated with assessment results, redirecting to account');
        router.push('/account');
      } else {
        // If assessment is not complete and no valid public ID, redirect to assessment page
        console.log('No valid assessment data, redirecting to assessment');
        router.push('/assessment');
      }
    };

    loadPage();
  }, []); // Empty dependency array - only run once on mount

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

  // Check if user has purchased this specific assessment
  const currentAssessmentId = result?.assessmentId || assessmentId || searchParams.get('assessmentId') || '';
  const hasPurchasedThisAssessment = isAuthenticated && currentAssessmentId && user?.purchasedAssessments?.includes(currentAssessmentId);
  const hasPremiumAccess = hasPurchasedThisAssessment || (isAuthenticated && user?.subscriptionTier === 'premium');

  console.log('Premium access check:', {
    isAuthenticated,
    currentAssessmentId,
    storeAssessmentId: assessmentId,
    urlAssessmentId: searchParams.get('assessmentId'),
    resultAssessmentId: result?.assessmentId,
    purchasedAssessments: user?.purchasedAssessments,
    hasPurchasedThisAssessment,
    subscriptionTier: user?.subscriptionTier,
    hasPremiumAccess,
  });

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

  // Generate profile code based on Primary + Secondary only (two-letter type)
  // Take first primary and first secondary if multiple exist
  const primaryCluster = primaryRoles[0];
  const secondaryCluster = secondaryRoles[0] || primaryRoles[1] || null;
  
  const primaryCode = CLUSTER_CODES[primaryCluster];
  const secondaryCode = secondaryCluster ? CLUSTER_CODES[secondaryCluster] : '';
  const profileCode = secondaryCluster ? `${primaryCode}${secondaryCode}` : primaryCode;

  // Get archetype name from mapping
  const archetypeName = ARCHETYPE_NAMES[profileCode] || 'Your Pattern';

  // Get colors for primary and secondary clusters
  const primaryColor = CLUSTER_COLORS[primaryCluster];
  const secondaryColor = secondaryCluster ? CLUSTER_COLORS[secondaryCluster] : primaryColor;

  // Get display names
  const primaryNames = primaryRoles.map((role: string) => CLUSTER_DISPLAY_NAMES[role]);
  const secondaryNames = secondaryRoles.map((role: string) => CLUSTER_DISPLAY_NAMES[role]);

  // Generate dynamic content based on primary/secondary colors
  const traits = generateTraits(primaryRoles as string[], secondaryRoles as string[], primaryColor, secondaryColor);
  const people = generatePeopleTraits(primaryRoles as string[], secondaryRoles as string[], primaryColor, secondaryColor);
  const naturalItems = generateNaturalItems(primaryRoles as string[]);
  const shadowItems = generateShadowItems(primaryRoles as string[]);

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#1a1a1a]" style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {isAuthenticated ? <AccountHeader /> : <Navigation />}
      <main className="px-4 py-4 sm:px-12 sm:py-5">
        <div className="mx-auto max-w-[1200px]">
          <section className="relative border-b border-[#cbc3c0] py-4 sm:py-6">
          {/* Primary color dominates - taller left line */}
          <div className="absolute left-[-10px] top-5 h-48 w-px" style={{ backgroundColor: primaryColor }} />
          {/* Secondary color supports - shorter right line */}
          <div className="absolute right-[-10px] top-32 h-16 w-px" style={{ backgroundColor: secondaryColor }} />
          <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em]"><span className="text-[17px]" style={{ color: primaryColor }}>✧</span>Your CAT-20 archetype</p>
          <h1 className="max-w-[720px] font-serif text-[58px] font-bold leading-[0.77] tracking-[-0.09em] text-[#17164d] sm:text-[93px]">The<br />{archetypeName} <span className="font-sans text-xl tracking-normal text-[#17164d] sm:text-[30px]">({profileCode})</span></h1>
          <div className="mt-5 flex flex-wrap items-center gap-2 font-serif text-[34px] italic leading-none sm:text-[41px]"><span style={{ color: primaryColor }}>{primaryNames[0]}</span><span className="not-italic text-[#17164d]">×</span><span style={{ color: secondaryColor }}>{secondaryNames[0] || primaryNames[1] || ''}</span></div>
          <div className="mt-3 h-px w-14" style={{ backgroundColor: primaryColor }} />
          <p className="mt-5 max-w-[900px] text-[14px] leading-[1.45] text-[#383653] sm:text-[16px]">You have a hard time leaving something at “good enough” when you know there&apos;s more to understand. Even after something starts making sense, your mind often keeps turning it over—looking at it from another angle, noticing what still doesn&apos;t fit, or wondering what else might be there.</p>
        </section>

        <section className="border-b border-[#cbc3c0] py-4 sm:py-6"><SectionHeading icon="✦" title="Pattern Snapshot" primaryColor={primaryColor} /><div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#d8d1cd]">{traits.map((trait, i) => <div key={trait.title} className="flex min-h-[50px] sm:min-h-[65px] flex-col items-center justify-center gap-1 sm:gap-2 text-center"><span className="text-[16px] sm:text-[20px]" style={{ color: trait.color }}>{trait.icon}</span><b className="font-serif text-[13px] sm:text-[16px]">{trait.title}</b></div>)}</div></section>

        <section className="border-b border-[#cbc3c0] px-2 py-6 sm:px-3 sm:py-12 text-center"><div className="mx-auto h-8 w-px" style={{ backgroundColor: primaryColor }} /><span className="block" style={{ color: primaryColor }}>·</span><h2 className="mt-3 sm:mt-4 font-serif text-[24px] sm:text-[31px] font-bold leading-[0.9] tracking-[-0.05em] text-[#17164d]">Beneath<br />the Surface</h2><p className="mx-auto mt-3 sm:mt-5 max-w-[500px] sm:max-w-[600px] text-[11px] sm:text-[15px] leading-4 text-[#514d70]">The first half described what this pattern looks like in everyday life.<br />The second half explores the mental pull that naturally creates<br />those experiences.</p><span className="mt-3 sm:mt-4 block" style={{ color: primaryColor }}>·</span><div className="mt-8 sm:mt-12 text-left"><h3 className="font-serif text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.11em] text-[#17164d]">Your Inner Tug-of-War</h3><div className="mt-2 h-px w-8" style={{ backgroundColor: primaryColor }} /><div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 text-center gap-4 sm:gap-0"><div className="px-2 sm:px-4 sm:border-r" style={{ borderColor: primaryColor }}><h4 className="font-serif text-[20px] sm:text-[27px]" style={{ color: primaryColor }}>{primaryNames[0] || 'Thinker'}</h4><p className="mx-auto mt-2 sm:mt-3 max-w-[100px] sm:max-w-[130px] text-[13px] sm:text-[16px] leading-4 text-[#625e7a]">Naturally wants things<br />to make sense.</p></div><div className="px-2 sm:px-4"><h4 className="font-serif text-[20px] sm:text-[27px]" style={{ color: secondaryColor }}>{secondaryNames[0] || primaryNames[1] || ''}</h4><p className="mx-auto mt-2 sm:mt-3 max-w-[100px] sm:max-w-[130px] text-[13px] sm:text-[16px] leading-4 text-[#625e7a]">Naturally keeps exploring<br />what might still be missing.</p></div></div><div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"><span className="h-px" style={{ backgroundColor: primaryColor }} /><span className="h-px" style={{ backgroundColor: secondaryColor }} /></div><p className="mx-auto mt-4 sm:mt-5 max-w-[240px] sm:max-w-[270px] text-[14px] sm:text-[16px] leading-4 text-[#55516e]">Together, they create a mind that rarely feels finished after the first answer.</p></div></section>

        <section className="border-b border-[#cbc3c0] py-8 sm:py-12"><div className="flex gap-4"><div className="w-px" style={{ backgroundColor: primaryColor }} /><div><h2 className="font-serif text-[20px] sm:text-[27px] font-bold leading-[0.9] tracking-[-0.04em]">When Your Mind<br />Gets Hooked</h2><div className="mt-3 h-px w-8" style={{ backgroundColor: primaryColor }} /><p className="mt-3 text-[13px] sm:text-[16px] text-[#514d70]">Your attention naturally sticks to things like:</p><div className="mt-4 space-y-3 sm:space-y-4 text-[13px] sm:text-[16px] leading-4 text-[#514d70]"><p className="ml-4 sm:ml-5 border-l pl-2 sm:pl-3" style={{ borderColor: primaryColor }}>A contradiction you can&apos;t ignore.</p><p className="ml-12 sm:ml-16 border-l pl-2 sm:pl-3" style={{ borderColor: secondaryColor }}>Realizing two things you thought were unrelated might actually connect.</p><p className="ml-8 sm:ml-10 border-l pl-2 sm:pl-3" style={{ borderColor: primaryColor }}>Someone giving a confident explanation that doesn&apos;t quite add up to you.</p><p className="ml-16 sm:ml-20 border-l pl-2 sm:pl-3" style={{ borderColor: secondaryColor }}>Hearing a completely different take on something you thought you already understood.</p></div><h2 className="mt-8 sm:mt-12 font-serif text-[20px] sm:text-[26px] font-bold leading-[0.9] tracking-[-0.04em]">What Makes Your<br />Pattern Unique</h2><div className="mt-3 h-px w-8" style={{ backgroundColor: primaryColor }} /><p className="mt-3 max-w-[600px] sm:max-w-[700px] text-[13px] sm:text-[16px] leading-4 text-[#514d70]">Your mind rarely stops after finding an answer. It naturally starts testing whether that answer actually explains everything.</p><p className="mt-3 text-[13px] sm:text-[16px] text-[#514d70]">You often find yourself asking:</p><div className="mt-3 space-y-3 font-serif text-[14px] sm:text-[16px] italic text-[#514d70]"><p className="ml-6 sm:ml-8 border-l pl-3 sm:pl-4" style={{ borderColor: primaryColor }}>What am I still missing?</p><p className="ml-10 sm:ml-14 border-l pl-3 sm:pl-4" style={{ borderColor: secondaryColor }}>Does this explanation actually fit?</p><p className="ml-6 sm:ml-8 border-l pl-3 sm:pl-4" style={{ borderColor: primaryColor }}>What doesn&apos;t make sense yet?</p></div></div></div></section>

        <section className="border-b border-[#cbc3c0] py-7"><div className="mt-7 grid gap-8 border-t border-[#cbc3c0] pt-7 grid-cols-1 sm:grid-cols-[1.1fr_0.9fr]"><div><h2 className="font-serif text-[20px] font-bold leading-[0.9] text-[#17164d]">What You&apos;re Like<br />Around People</h2><div className="mt-3 h-px w-8" style={{ backgroundColor: primaryColor }} /><div className="mt-5 space-y-4">{people.map(item => <div key={item.number} className="flex gap-4"><span className="font-serif text-[21px]" style={{ color: item.color }}>{item.number}</span><p className="border-l border-[#d4cdd1] pl-3 text-[13px] leading-4 text-[#514d70]">{item.text}</p></div>)}</div></div><div className="border-t border-[#cbc3c0] pt-7 sm:border-l sm:border-t-0 sm:pl-8"><h3 className="font-serif text-[14px] font-bold uppercase text-[#17164d]">If someone had to<br />describe you...</h3><blockquote className="mt-8 font-serif text-[17px] italic leading-5">“{generateQuote(primaryRoles, secondaryRoles)}”</blockquote></div></div><div className="mt-8 grid gap-8 border-t border-[#cbc3c0] pt-7 grid-cols-1 sm:grid-cols-2"><InfoCard icon="" title="What Comes Naturally" items={naturalItems} bulletColor={primaryColor} /><InfoCard icon="" title="Shadow Side" items={shadowItems} bulletColor={secondaryColor} /></div><div className="mt-7 border-t border-[#cbc3c0] pt-7"><SectionHeading title="How You Connect" primaryColor={primaryColor} /><p className="mt-4 max-w-[900px] text-[14px] leading-5 text-[#514d70]">{generateConnectionText(primaryRoles, secondaryRoles)}</p></div></section>

        <section className="border-b border-[#cbc3c0] py-10">
          <div className="flex gap-4">
            <div className="w-px" style={{ backgroundColor: primaryColor }} />
            <div>
              {hasPremiumAccess ? (
                <div className="p-6">
                  <h3 className="mb-3 font-serif text-base font-bold leading-5">
                    Your Premium Insights
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl text-[#cd775d]">♡</span>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#1a1a1a' }}>Love & Relationships</h4>
                        <p className="text-sm text-gray-600">
                          {generateLoveRelationshipsText(primaryRoles, secondaryRoles)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl text-[#cd775d]">▣</span>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#1a1a1a' }}>Career & Direction</h4>
                        <p className="text-sm text-gray-600">
                          {generateCareerDirectionText(primaryRoles, secondaryRoles)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl text-[#cd775d]">♧</span>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#1a1a1a' }}>Social & Communication</h4>
                        <p className="text-sm text-gray-600">
                          {generateSocialCommunicationText(primaryRoles, secondaryRoles)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
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

                  <button
                    onClick={() => {
                      const currentAssessmentId = result.assessmentId || assessmentId || '';
                      if (isAuthenticated) {
                        // User is already authenticated, go directly to payment
                        router.push(`/payment?assessmentId=${currentAssessmentId}`);
                      } else {
                        // User needs to sign in first - mark as guest assessment
                        router.push(`/auth/signin?redirect=/payment&assessmentId=${currentAssessmentId}&isGuest=true`);
                      }
                    }}
                    className="w-full rounded-lg bg-[#4f2696] px-3 py-3 text-xs font-bold text-white transition hover:bg-[#3d1d78]"
                  >
                    Unlock Full Profile — $10 <span className="ml-2 text-base">→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-[#cbc3c0] py-10"><div className="flex gap-4"><div className="w-px" style={{ backgroundColor: primaryColor }} /><div><p className="font-serif text-[11px] font-bold uppercase tracking-[0.2em] text-[#17164d]">People Often</p><h2 className="mt-3 font-serif text-[29px] font-bold leading-[0.88] text-[#17164d]">Misread You As...</h2><div className="mt-3 h-px w-8" style={{ backgroundColor: primaryColor }} /><p className="mt-4 max-w-[450px] text-[14px] leading-4 text-[#514d70]">They believe they are simply being thoughtful...<br />but others may view them as:</p><div className="mt-7 grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#d8d1cd] text-center font-serif text-[13px] font-bold"><span className="px-2">distant</span><span className="px-2">overthinking</span><span className="px-2">hard to read</span><span className="px-2">slow to respond</span></div><div className="mt-10 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.2em]"><span className="text-lg" style={{ color: primaryColor }}>✦</span>Future message<span className="h-px flex-1" style={{ backgroundColor: primaryColor }} /></div><h2 className="mt-7 font-serif text-[33px] font-bold leading-[0.9] text-[#17164d]">Not every question that<br />pops into your head<br /><em className="font-normal" style={{ color: secondaryColor }}>needs an answer.</em></h2><div className="mt-5 h-px w-10" style={{ backgroundColor: primaryColor }} /><p className="mt-4 max-w-[540px] text-[14px] leading-4 text-[#514d70]">Some things are worth digging into, and others are just interesting enough to keep you thinking. Learning which is which can save you a lot of time without making you any less curious.</p></div></div></section>

        <footer className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 py-4 sm:py-6"><span className="text-[7px] sm:text-[8px] uppercase tracking-[0.2em]">CAT-20</span><div className="flex gap-2"><button onClick={() => { useAssessmentStore.getState().resetAssessment(); router.push('/assessment'); }} className="border border-[#6855a0] px-3 py-2 text-[11px] sm:text-[15px] font-bold text-[#503e90]">← Retake Test</button>{isAuthenticated && <button onClick={() => router.push('/account')} className="bg-[#4f2696] px-3 py-2 text-[11px] sm:text-[15px] font-bold text-white">Dashboard →</button>}</div><button onClick={() => { localStorage.setItem('shareCardData', JSON.stringify({ primaryRoles, secondaryRoles, profileCode, primaryNames, secondaryNames, result })); router.push('/share-card'); }} className="border border-[#cd775d] px-3 py-2 text-[11px] sm:text-[15px] font-bold text-[#cd775d]">✦ Share Card</button></footer>
        </div>
      </main>
      <Footer />
    </div>
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
      <h2 className="mb-4 flex items-center gap-3 font-serif text-xl text-[#17164d]">
        <span className="text-2xl" style={{ color: bulletColor }}>{icon}</span>
        {title}
      </h2>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="relative pl-5 text-sm leading-5 text-[#414052]"
          >
            <span
              className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: bulletColor }}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

// Helper functions to generate content based on roles
function generateTraits(primaryRoles: string[], secondaryRoles: string[], primaryColor: string, secondaryColor: string): Array<{ icon: string; title: string; color: string }> {
  const allRoles = [...primaryRoles, ...secondaryRoles];
  const traitMap: Record<string, Array<{ icon: string; title: string }>> = {
    thinker: [
      { icon: "✎", title: "Analytical" },
      { icon: "◉", title: "Deep" },
    ],
    seeker: [
      { icon: "♡", title: "Curious" },
      { icon: "♨", title: "Exploratory" },
    ],
    builder: [
      { icon: "⚒", title: "Practical" },
      { icon: "◉", title: "Constructive" },
    ],
    nurturer: [
      { icon: "♡", title: "Empathetic" },
      { icon: "☾", title: "Supportive" },
    ],
    spark: [
      { icon: "✨", title: "Creative" },
      { icon: "♨", title: "Inspiring" },
    ],
    wanderer: [
      { icon: "♧", title: "Independent" },
      { icon: "◉", title: "Adaptable" },
    ],
  };

  const traits: Array<{ icon: string; title: string; color: string }> = [];
  allRoles.forEach((role: string, index: number) => {
    if (traitMap[role]) {
      traitMap[role].forEach((trait) => {
        if (traits.length < 4) {
          // Primary color dominates: first 3 traits use primary, last uses secondary
          // This ensures visual hierarchy where primary is clearly dominant
          const usePrimary = traits.length < 3;
          traits.push({
            ...trait,
            color: usePrimary ? primaryColor : secondaryColor,
          });
        }
      });
    }
  });

  // Ensure we have exactly 4 traits
  while (traits.length < 4) {
    // Always use primary for fallback to maintain dominance
    traits.push({ icon: "✦", title: "Unique", color: primaryColor });
  }
  return traits.slice(0, 4);
}

function generatePeopleTraits(primaryRoles: string[], secondaryRoles: string[], primaryColor: string, secondaryColor: string): Array<{ number: string; text: string; color: string }> {
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

  allRoles.forEach((role: string, index: number) => {
    if (peopleMap[role]) {
      peopleMap[role].forEach((text: string, i: number) => {
        if (people.length < 3) {
          // Primary color dominates: first 2 items use primary, last uses secondary
          const usePrimary = people.length < 2;
          people.push({
            number: String(people.length + 1).padStart(2, '0'),
            text,
            color: usePrimary ? primaryColor : secondaryColor,
          });
        }
      });
    }
  });

  // Ensure we have exactly 3 people traits
  while (people.length < 3) {
    // Always use primary for fallback to maintain dominance
    people.push({
      number: String(people.length + 1).padStart(2, '0'),
      text: "You bring a unique perspective to every situation.",
      color: primaryColor,
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

function generateLoveRelationshipsText(primaryRoles: string[], secondaryRoles: string[]): string {
  const loveMap: Record<string, string> = {
    thinker: "In relationships, you need intellectual stimulation and deep conversations. You feel most connected when you can analyze life's questions together and explore ideas without judgment.",
    seeker: "You thrive in relationships that offer constant discovery and growth. You need a partner who enjoys exploring new ideas and experiences alongside you.",
    builder: "You value practical support and reliability in relationships. You feel most connected when you can build a life together and turn shared dreams into reality.",
    nurturer: "Emotional intimacy is essential for you. You thrive in relationships where you can be vulnerable and provide mutual support and care.",
    spark: "You need creativity and excitement in relationships. You feel most alive with a partner who shares your enthusiasm and inspires you to see the world differently.",
    wanderer: "You need independence and freedom within relationships. You feel most connected when you have space to be yourself while sharing your journey with someone who respects your autonomy.",
  };

  if (primaryRoles.length > 0) {
    const role = primaryRoles[0] as keyof typeof loveMap;
    if (loveMap[role]) {
      return loveMap[role];
    }
  }
  return "You bring unique insights and depth to your relationships, valuing authentic connections that honor your individual perspective.";
}

function generateCareerDirectionText(primaryRoles: string[], secondaryRoles: string[]): string {
  const careerMap: Record<string, string> = {
    thinker: "You excel in roles that require deep analysis, research, and strategic thinking. Careers in research, analysis, philosophy, or complex problem-solving will suit you well.",
    seeker: "You thrive in dynamic environments that offer continuous learning and exploration. Careers in innovation, research, consulting, or fields that require constant discovery will energize you.",
    builder: "You're drawn to practical, hands-on work where you can see tangible results. Careers in construction, engineering, project management, or entrepreneurship will allow you to thrive.",
    nurturer: "You excel in people-focused roles where you can support and guide others. Careers in counseling, healthcare, education, or human resources will allow you to use your natural gifts.",
    spark: "You shine in creative fields where you can generate new ideas and inspire others. Careers in design, marketing, entertainment, or innovation will allow your creativity to flourish.",
    wanderer: "You're suited for flexible careers that offer variety and independence. Roles in consulting, freelancing, travel, or entrepreneurship will allow you to maintain your freedom.",
  };

  if (primaryRoles.length > 0) {
    const role = primaryRoles[0] as keyof typeof careerMap;
    if (careerMap[role]) {
      return careerMap[role];
    }
  }
  return "Your unique cognitive pattern offers valuable strengths that can be applied across many career paths. Seek roles that honor your natural way of thinking and working.";
}

function generateSocialCommunicationText(primaryRoles: string[], secondaryRoles: string[]): string {
  const socialMap: Record<string, string> = {
    thinker: "You communicate best through thoughtful, analytical conversations. You prefer depth over breadth and enjoy discussions that explore complex ideas and systems.",
    seeker: "You're an engaging conversationalist who loves asking questions and exploring new perspectives. You naturally draw people into interesting discussions and discoveries.",
    builder: "You communicate clearly and practically, focusing on actionable information. You're most effective when discussing concrete plans and real-world applications.",
    nurturer: "You're a natural listener who creates safe spaces for others to share. You communicate with empathy and are skilled at understanding and responding to emotional needs.",
    spark: "You bring energy and enthusiasm to conversations, naturally inspiring those around you. You excel at brainstorming and getting people excited about new possibilities.",
    wanderer: "You communicate authentically and directly, valuing genuine connections over social conventions. You're comfortable in diverse social situations and adapt easily to different communication styles.",
  };

  if (primaryRoles.length > 0) {
    const role = primaryRoles[0] as keyof typeof socialMap;
    if (socialMap[role]) {
      return socialMap[role];
    }
  }
  return "Your communication style brings a unique perspective to social interactions. You connect best with people who appreciate authenticity and depth in conversation.";
}