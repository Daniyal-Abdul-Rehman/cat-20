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
    id: 'thinker',
    name: 'The Thinker',
    tagline: 'Deep Understanding Through Reflection',
    description: 'Thinkers approach the world with careful analysis and deep contemplation. You naturally examine ideas from multiple angles before forming conclusions, valuing precision and logical consistency. Your mind excels at uncovering underlying principles and creating systematic frameworks for understanding complex phenomena.',
    strengths: [
      'Exceptional at critical thinking and logical analysis',
      'Thorough and methodical in problem-solving',
      'Identifies patterns and underlying principles',
      'Reliable and consistent in decision-making',
      'Excels at creating conceptual frameworks'
    ],
    growthAreas: [
      'May overanalyze and delay decisions',
      'Can struggle with rapid, intuitive responses',
      'Sometimes misses emotional or social factors',
      'May need to embrace uncertainty and ambiguity'
    ],
    bestEnvironments: [
      'Research and academic settings',
      'Strategic planning and analysis',
      'Technical and engineering roles',
      'Quality assurance and compliance'
    ],
    decisionStyle: 'You make decisions based on careful analysis and logical reasoning, weighing all available information before acting.',
    communicationStyle: 'You communicate through precise language and logical arguments, preferring clarity and accuracy over emotional appeals.'
  },
  {
    id: 'seeker',
    name: 'The Seeker',
    tagline: 'Exploring New Horizons and Possibilities',
    description: 'Seekers are driven by curiosity and the desire to discover what lies beyond the familiar. You naturally gravitate toward new experiences and ideas, constantly expanding your understanding of the world. Your mind thrives on exploration and the pursuit of knowledge, always asking "what if?" and "why not?"',
    strengths: [
      'Exceptional curiosity and love of learning',
      'Adaptable and open to new perspectives',
      'Inspires others with enthusiasm for discovery',
      'Excels at identifying emerging opportunities',
      'Thrives in dynamic, changing environments'
    ],
    growthAreas: [
      'May struggle with routine and repetition',
      'Can lose focus by pursuing too many interests',
      'Sometimes moves on before completing projects',
      'May need to develop deeper expertise in specific areas'
    ],
    bestEnvironments: [
      'Research and development',
      'Innovation and creative industries',
      'Entrepreneurial ventures',
      'Education and training'
    ],
    decisionStyle: 'You make decisions based on exploration and discovery, often choosing paths that offer new learning opportunities.',
    communicationStyle: 'You communicate through stories of discovery and possibility, inspiring others with your enthusiasm for the new and unknown.'
  },
  {
    id: 'builder',
    name: 'The Builder',
    tagline: 'Creating Structure From Vision',
    description: 'Builders have a natural talent for turning abstract ideas into concrete reality. You excel at organizing resources, creating systems, and executing plans with precision. Your mind thrives on bringing order to chaos and constructing lasting foundations that others can build upon.',
    strengths: [
      'Exceptional at planning and execution',
      'Reliable and consistent in delivering results',
      'Excels at creating efficient systems and processes',
      'Strong organizational and project management skills',
      'Turns vague concepts into actionable plans'
    ],
    growthAreas: [
      'May be resistant to changing established methods',
      'Can struggle with highly ambiguous situations',
      'Sometimes focuses too much on process over creativity',
      'May need to embrace more flexible approaches'
    ],
    bestEnvironments: [
      'Project management and operations',
      'Construction and engineering',
      'Systems architecture and development',
      'Manufacturing and production'
    ],
    decisionStyle: 'You make decisions based on practical considerations and proven methods, prioritizing feasibility and reliability.',
    communicationStyle: 'You communicate through clear plans and concrete steps, focusing on what needs to be done and how to achieve it.'
  },
  {
    id: 'nurturer',
    name: 'The Nurturer',
    tagline: 'Cultivating Growth in Others',
    description: 'Nurturers have an innate ability to sense what others need and help them grow. You naturally create supportive environments where people feel valued and encouraged to develop. Your mind excels at understanding emotional dynamics and fostering the potential in those around you.',
    strengths: [
      'Exceptional empathy and emotional intelligence',
      'Creates safe, supportive environments for growth',
      'Excels at mentoring and developing others',
      'Builds strong, trusting relationships',
      'Patient and encouraging in helping others improve'
    ],
    growthAreas: [
      'May prioritize others\' needs over their own',
      'Can struggle with difficult conversations',
      'Sometimes takes criticism too personally',
      'May need to set clearer boundaries'
    ],
    bestEnvironments: [
      'Education and training',
      'Human resources and talent development',
      'Healthcare and counseling',
      'Team leadership and management'
    ],
    decisionStyle: 'You make decisions considering the impact on people and their growth, often choosing paths that support others\' development.',
    communicationStyle: 'You communicate through empathy and encouragement, adapting your message to resonate with each individual\'s needs.'
  },
  {
    id: 'spark',
    name: 'The Spark',
    tagline: 'Igniting Inspiration and Energy',
    description: 'Sparks naturally bring enthusiasm and creative energy to any situation. You excel at generating ideas and inspiring others with your passion and vision. Your mind thrives on creative expression and the excitement of new possibilities, often serving as the catalyst for innovation and change.',
    strengths: [
      'Exceptional creativity and innovative thinking',
      'Inspires others with enthusiasm and passion',
      'Excels at generating new ideas and possibilities',
      'Brings energy and excitement to projects',
      'Adaptable and quick to embrace change'
    ],
    growthAreas: [
      'May struggle with follow-through on ideas',
      'Can be inconsistent in focus and attention',
      'Sometimes overwhelms others with intensity',
      'May need to develop more disciplined habits'
    ],
    bestEnvironments: [
      'Creative industries and design',
      'Marketing and advertising',
      'Innovation and R&D',
      'Entrepreneurial ventures'
    ],
    decisionStyle: 'You make decisions based on intuition and creative inspiration, often choosing paths that feel exciting and innovative.',
    communicationStyle: 'You communicate through passion and creative expression, inspiring others with your energy and vision.'
  },
  {
    id: 'wanderer',
    name: 'The Wanderer',
    tagline: 'Finding Wisdom Through Experience',
    description: 'Wanderers approach life as a journey of discovery and experience. You naturally seek out diverse perspectives and draw wisdom from your encounters with the world. Your mind excels at synthesizing experiences into meaningful insights and finding connections across different domains of knowledge.',
    strengths: [
      'Exceptional adaptability and open-mindedness',
      'Draws wisdom from diverse experiences',
      'Excels at finding connections across domains',
      'Comfortable with uncertainty and change',
      'Brings unique perspectives to problems'
    ],
    growthAreas: [
      'May struggle with long-term commitment',
      'Can lack focus by constantly seeking new experiences',
      'Sometimes misses depth by staying on the surface',
      'May need to develop more consistent routines'
    ],
    bestEnvironments: [
      'Travel and hospitality',
      'International business and relations',
      'Consulting and advisory roles',
      'Creative and artistic fields'
    ],
    decisionStyle: 'You make decisions based on experiential learning and intuition, often choosing paths that offer new experiences and perspectives.',
    communicationStyle: 'You communicate through stories and experiences, sharing wisdom gained from your journey through the world.'
  }
];

export function getArchetypeById(id: string): Archetype | undefined {
  return archetypes.find(archetype => archetype.id === id);
}
