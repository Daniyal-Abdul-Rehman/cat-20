export type Cluster = 'thinker' | 'seeker' | 'builder' | 'nurturer' | 'spark' | 'wanderer';

export interface AssessmentAnswer {
  value: string;
  text: string;
  scores: Partial<Record<Cluster, number>>;
}

export interface AssessmentQuestion {
  id: number;
  title: string;
  prompt: string;
  answers: AssessmentAnswer[];
  isActive: boolean;
}

const scoreMaps: Record<number, Partial<Record<string, Partial<Record<Cluster, number>>>>> = {
  1: { A: { nurturer: 1 }, B: { builder: 1, thinker: 1 }, C: { builder: 2 }, D: { wanderer: 1 }, E: { spark: 1 } },
  2: { A: { spark: 1, seeker: 1 }, B: { nurturer: 1 }, C: { thinker: 1, seeker: 1 }, D: { builder: 2 }, E: { wanderer: 1 } },
  3: { A: { nurturer: 1 }, B: { spark: 1, seeker: 1 }, C: { wanderer: 1 }, D: { builder: 2 }, E: { builder: 1, thinker: 1 } },
  4: { A: { spark: 1 }, B: { thinker: 2 }, C: { nurturer: 1 }, D: { thinker: 1, seeker: 1 }, E: { wanderer: 1 } },
  5: { A: { wanderer: 1 }, B: { nurturer: 1 }, C: { builder: 2 }, D: { spark: 1, seeker: 1 }, E: { thinker: 2 } },
  6: { A: { wanderer: 1 }, B: { builder: 2 }, C: { nurturer: 1 }, D: { thinker: 1 }, E: { spark: 1 } },
  7: { A: { wanderer: 1 }, B: { nurturer: 1 }, C: { spark: 1 }, D: { nurturer: 2 }, E: { thinker: 1 } },
  8: { A: { thinker: 2 }, B: { nurturer: 1 }, C: { wanderer: 1 }, D: { thinker: 1, seeker: 1 }, E: { seeker: 1 } },
  9: { A: { seeker: 2 }, B: { builder: 1 }, C: { nurturer: 1 }, D: { builder: 1 }, E: { seeker: 1 } },
  10: { A: { nurturer: 1 }, B: { spark: 1 }, C: { spark: 2 }, D: { thinker: 1 }, E: { seeker: 2 } },
  11: { A: { spark: 1 }, B: { seeker: 1 }, C: { thinker: 2 }, D: { wanderer: 1 }, E: { nurturer: 1 } },
  12: { A: { spark: 1 }, B: { builder: 2 }, C: { nurturer: 1 }, D: { thinker: 2 }, E: { wanderer: 1 } },
  13: { A: { nurturer: 2 }, B: { wanderer: 1 }, C: { seeker: 1 }, D: { builder: 1 }, E: { spark: 1 } },
  14: { A: { spark: 1 }, B: { nurturer: 1 }, C: { seeker: 2 }, D: { builder: 1 }, E: { wanderer: 1 } },
  15: { A: { nurturer: 1 }, B: { wanderer: 1 }, C: { seeker: 1 }, D: { nurturer: 2 }, E: { builder: 1 } },
  16: { A: { spark: 1 }, B: { thinker: 2 }, C: { wanderer: 1 }, D: { nurturer: 1 }, E: { seeker: 1 } },
  17: { A: { nurturer: 1 }, B: { spark: 1 }, C: { thinker: 2 }, D: { seeker: 1 }, E: { spark: 1 } },
  18: { A: { nurturer: 1 }, B: { thinker: 1, builder: 1 }, C: { thinker: 1, seeker: 1 }, D: { wanderer: 1 }, E: { spark: 1 } },
  19: { A: { wanderer: 1 }, B: { thinker: 1 }, C: { nurturer: 1 }, D: { builder: 2 }, E: { builder: 1 } },
  20: { A: { spark: 1 }, B: { spark: 1 }, C: { builder: 1 }, D: { nurturer: 1 }, E: { seeker: 2 } },
};

const questionContent: Array<[string, string]> = [
  ['Repeated Mistake', 'You notice a coworker keeps making the same mistake at work. You usually:'],
  ['Friend Situation', 'Someone says your mutual friend gives up too easily. You:'],
  ['Your Day Off', 'You finally have a free day to yourself, but someone close to you needs help with something. You usually:'],
  ['Quick Assumption', 'You overhear someone making a strong assumption about another person or situation. You usually:'],
  ['Asking for Advice', 'A friend comes to you because they are stuck on a big personal decision. You usually:'],
  ['Seeing Repetition', 'After being around people for a while, you start noticing that certain behaviors keep repeating. You usually:'],
  ['Something Feels Off', 'At a party or social gathering, you notice someone seems fine, but something about them feels off. You usually:'],
  ['In Your Head', 'How often do you find yourself sitting with your own thoughts or replaying things in your mind?'],
  ['A Difficult Choice', 'You realize that bending the truth could protect someone or make a situation easier. You usually:'],
  ['One Thing You\'ve Learned', 'If you had to give someone one real piece of advice about life, it would probably be about:'],
  ['Saying Something Wrong', 'Someone says something that you know is not right. You usually:'],
  ['Something Doesn\'t Add Up', 'You come across something confusing or inconsistent, and it keeps sticking in your mind. You usually:'],
  ['Someone Seems Stressed', 'You can tell someone is stressed or overwhelmed. You usually:'],
  ['Meaning or Enjoyment', 'If you had to choose between helping someone take something meaningful from an experience or just enjoying the moment together, you would usually:'],
  ['Awkward Moment', 'You realize you made a small social mistake or said something awkward. You usually:'],
  ['Being Misunderstood', 'When someone takes what you said the wrong way or misunderstands your intentions, you usually:'],
  ['One Hour Alone', 'If you had a completely uninterrupted hour to yourself, you would probably:'],
  ['Confusing Point in a Group', 'During a group conversation or meeting, someone repeats a point that feels off, confusing, or incomplete to you. You usually:'],
  ['Same Problem Again', 'You notice the same problem happening again. Your first instinct is to:'],
  ['One Last Message', 'If you could leave one last message for someone, it would probably be about:'],
];

export const officialQuestions: AssessmentQuestion[] = questionContent.map(([title, prompt], index) => {
  const id = index + 1;
  return {
    id,
    title,
    prompt,
    isActive: true,
    answers: ['A', 'B', 'C', 'D', 'E'].map((value) => ({
      value,
      text: `Option ${value}`,
      scores: scoreMaps[id][value] || {},
    })),
  };
});
