export interface Archetype {
  id: string;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
  bestEnvironments: string[];
  decisionStyle: string;
  communicationStyle: string;
}

export const archetypes: Archetype[] = [
  {
    id: 'visionary',
    name: 'The Visionary',
    tagline: 'Seeing Possibilities in Every Challenge',
    description: 'Visionaries naturally see the big picture and identify patterns others miss. You think in terms of future possibilities and are driven by ideas of what could be rather than what is. Your mind excels at connecting seemingly unrelated concepts to create innovative solutions.',
    strengths: [
      'Exceptional at seeing long-term implications and trends',
      'Creative problem-solving through pattern recognition',
      'Inspires others with compelling visions of the future',
      'Adaptable and open to new perspectives',
      'Thrives in ambiguous and rapidly changing environments'
    ],
    growthAreas: [
      'May overlook practical details in pursuit of grand ideas',
      'Can struggle with routine, repetitive tasks',
      'Sometimes moves too quickly for others to follow',
      'May need to ground ideas in actionable steps'
    ],
    bestEnvironments: [
      'Strategic planning and innovation teams',
      'Entrepreneurial ventures and startups',
      'Research and development',
      'Creative industries and design'
    ],
    decisionStyle: 'You make decisions based on future potential and pattern recognition, often trusting your intuition about where trends are heading.',
    communicationStyle: 'You communicate through stories and visions, painting pictures of what could be to inspire and motivate others.'
  },
  {
    id: 'analyst',
    name: 'The Analyst',
    tagline: 'Finding Truth Through Deep Inquiry',
    description: 'Analysts approach the world with systematic precision and logical rigor. You naturally break down complex problems into their component parts, examining each piece before reconstructing the whole. Your mind excels at identifying inconsistencies and finding the most efficient path forward.',
    strengths: [
      'Exceptional at critical thinking and logical analysis',
      'Thorough and detail-oriented in problem-solving',
      'Identifies patterns in data and information',
      'Reliable and consistent in decision-making',
      'Excels at creating systems and processes'
    ],
    growthAreas: [
      'May overanalyze and delay decisions',
      'Can struggle with emotional or subjective factors',
      'Sometimes misses the human element in solutions',
      'May need to embrace uncertainty and ambiguity'
    ],
    bestEnvironments: [
      'Data analysis and research',
      'Quality assurance and compliance',
      'Financial planning and analysis',
      'Technical and engineering roles'
    ],
    decisionStyle: 'You make decisions based on careful analysis of available data, weighing pros and cons methodically before acting.',
    communicationStyle: 'You communicate through facts, evidence, and logical arguments, preferring clear, precise language over emotional appeals.'
  },
  {
    id: 'connector',
    name: 'The Connector',
    tagline: 'Building Bridges Between People and Ideas',
    description: 'Connectors naturally understand and navigate social dynamics with ease. You sense the emotional undercurrents in any situation and excel at bringing people together around shared goals. Your mind thrives on relationships and the complex web of human interactions.',
    strengths: [
      'Exceptional at reading people and emotional intelligence',
      'Builds strong, lasting relationships',
      'Mediates conflicts and finds common ground',
      'Inspires trust and cooperation in others',
      'Excels at team collaboration and leadership'
    ],
    growthAreas: [
      'May prioritize relationships over objective analysis',
      'Can take others\' emotions too personally',
      'Sometimes struggles with difficult conversations',
      'May need to set clearer boundaries'
    ],
    bestEnvironments: [
      'Team leadership and management',
      'Human resources and talent development',
      'Sales and business development',
      'Community building and social services'
    ],
    decisionStyle: 'You make decisions considering the impact on people and relationships, often weighing how choices will affect team dynamics and morale.',
    communicationStyle: 'You communicate through empathy and understanding, adapting your message to resonate with different audiences and building consensus.'
  }
];

export function getArchetypeById(id: string): Archetype | undefined {
  return archetypes.find(archetype => archetype.id === id);
}
