// Cluster Colors - consistent across the entire application
export const CLUSTER_COLORS: Record<string, string> = {
  thinker: '#3712E8',  // Deep Purple
  seeker: '#F59A00',   // Orange
  builder: '#1498E8',  // Blue
  nurturer: '#E90A82', // Pink/Magenta
  spark: '#FF3038',   // Red
  wanderer: '#10A8A3', // Teal
};

export const CLUSTER_DISPLAY_NAMES: Record<string, string> = {
  thinker: 'Thinker',
  seeker: 'Seeker',
  builder: 'Builder',
  nurturer: 'Nurturer',
  spark: 'Spark',
  wanderer: 'Wanderer',
};

export const CLUSTER_CODES: Record<string, string> = {
  thinker: 'T',
  seeker: 'S',
  builder: 'B',
  nurturer: 'N',
  spark: 'K',
  wanderer: 'W',
};

export const ARCHETYPE_NAMES: Record<string, string> = {
  'TS': 'Interpreter',
  'TB': 'Architect',
  'TN': 'Quiet Interpreter',
  'TK': 'Wildcard',
  'TW': 'Grounded Thinker',
  'ST': 'Explorer',
  'SB': 'Pathfinder',
  'SN': 'Gentle Explorer',
  'SK': 'Adventure',
  'SW': 'Wanderer',
  'BT': 'Strategist',
  'BS': 'Vision Builder',
  'BN': 'Caretaker',
  'BK': 'Creative Builder',
  'BW': 'Steady Builder',
  'NT': 'Reflector',
  'NS': 'Heart Listener',
  'NB': 'Guardian',
  'NK': 'Heartlight',
  'NW': 'Haven',
  'KT': 'Innovator',
  'KS': 'Inspirer',
  'KB': 'Initiator',
  'KN': 'Encourager',
  'KW': 'Adventurer',
  'WT': 'Observer',
  'WS': 'Pilgrim',
  'WB': 'Settler',
  'WN': 'Listener',
  'WK': 'Nomad',
};

// Default neutral colors (when no user pattern is set)
export const DEFAULT_THEME = {
  primary: '#4B3B8C',  // Default purple
  secondary: '#C4A747', // Default gold
};

// Helper function to parse pattern string and get primary/secondary clusters
export function parsePattern(pattern: string): {
  primaryCluster: string;
  secondaryCluster: string | null;
  primaryColor: string;
  secondaryColor: string;
  archetypeName: string;
  profileCode: string;
} {
  const clusters = pattern.split(',').map(c => c.trim().toLowerCase());
  const primaryCluster = clusters[0];
  const secondaryCluster = clusters[1] || null;

  const primaryCode = CLUSTER_CODES[primaryCluster];
  const secondaryCode = secondaryCluster ? CLUSTER_CODES[secondaryCluster] : '';
  const profileCode = secondaryCluster ? `${primaryCode}${secondaryCode}` : primaryCode;

  const primaryColor = CLUSTER_COLORS[primaryCluster];
  const secondaryColor = secondaryCluster ? CLUSTER_COLORS[secondaryCluster] : primaryColor;

  const archetypeName = ARCHETYPE_NAMES[profileCode] || 'Your Pattern';

  return {
    primaryCluster,
    secondaryCluster,
    primaryColor,
    secondaryColor,
    archetypeName,
    profileCode,
  };
}

// Helper function to get theme colors from pattern string
// This returns the colors that should be used as the app's theme
export function getThemeColors(pattern: string | null | undefined): {
  primary: string;
  secondary: string;
} {
  if (!pattern) {
    return DEFAULT_THEME;
  }

  const parsed = parsePattern(pattern);
  return {
    primary: parsed.primaryColor,
    secondary: parsed.secondaryColor,
  };
}

// Helper function to get cluster colors from pattern string
export function getClusterColors(pattern: string) {
  const parsed = parsePattern(pattern);
  return {
    primary: parsed.primaryColor,
    secondary: parsed.secondaryColor,
  };
}
