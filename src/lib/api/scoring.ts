/**
 * API client for CAT-20 scoring endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export interface AssessmentAnswer {
  questionId: number;
  value: string;
}

export interface Question {
  _id: string;
  id: number;
  order: number;
  text: string;
  prompt?: string;
  title?: string;
  answers: Array<{
    value: string;
    text: string;
  }>;
  isActive: boolean;
}

export interface ScoringResult {
  assessmentId: string;
  questionnaireVersion: string;
  scoringVersion: string;
  resultLogicVersion: string;
  profileContentVersion?: string;
  answers: Record<string, string>; // Changed from number to string keys for Mongoose compatibility
  rawScores: Record<string, number>;
  totalPoints: number;
  percentages: Record<string, number>;
  primaryRoles: string[];
  secondaryRoles: string[];
  influenceRoles: string[];
  profileCode?: string;
  profileRoute?: string;
  profileAvailable: boolean;
  fallbackUsed: boolean;
  calculatedAt: string;
}

export interface ProfileCluster {
  id: string;
  displayName: string;
  code: string;
  isActive: boolean;
  order: number;
  description?: string;
  influenceThreshold: number;
  tags: string[];
  color: string;
}

export interface ProfileConfig {
  version: string;
  isActive: boolean;
  clusterIds: string[];
  questionScoring: Array<{
    questionId: number;
    answer: string;
    awards: Record<string, number>;
  }>;
  defaultInfluenceThreshold: number;
  description?: string;
  effectiveDate: string;
  expiresAt?: string;
}

/**
 * Submit assessment for scoring (public endpoint, no authentication required)
 */
export async function submitAssessmentPublic(
  answers: AssessmentAnswer[],
  metadata?: {
    questionnaireVersion?: string;
    scoringVersion?: string;
  }
): Promise<ScoringResult> {
  const response = await fetch(`${API_BASE_URL}/assessments/public/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answers: answers.reduce((acc, answer) => {
        acc[answer.questionId] = answer.value;
        return acc;
      }, {} as Record<number, string>),
      questionnaireVersion: metadata?.questionnaireVersion || '1.0',
      scoringVersion: metadata?.scoringVersion || '1.0',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to submit assessment: ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Submit assessment for scoring (authenticated endpoint)
 */
export async function submitAssessment(
  answers: AssessmentAnswer[],
  metadata?: {
    questionnaireVersion?: string;
    scoringVersion?: string;
  }
): Promise<ScoringResult> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/assessments/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    body: JSON.stringify({
      answers: answers.reduce((acc, answer) => {
        acc[answer.questionId] = answer.value;
        return acc;
      }, {} as Record<number, string>),
      questionnaireVersion: metadata?.questionnaireVersion || '1.0',
      scoringVersion: metadata?.scoringVersion || '1.0',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to submit assessment: ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Get assessment result by ID (public endpoint, no authentication required)
 */
export async function getAssessmentResultPublic(assessmentId: string): Promise<ScoringResult> {
  const response = await fetch(`${API_BASE_URL}/assessments/public/${assessmentId}/result`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get assessment result: ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Get assessment result by ID (authenticated endpoint)
 */
export async function getAssessmentResult(assessmentId: string): Promise<ScoringResult> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/assessments/${assessmentId}/result`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get assessment result: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Check if assessment has been scored
 */
export async function isAssessmentScored(assessmentId: string): Promise<{ scored: boolean }> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/assessments/${assessmentId}/scored`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to check assessment status: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get all profile clusters (admin)
 */
export async function getProfileClusters(): Promise<ProfileCluster[]> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-clusters`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get profile clusters: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get active profile clusters
 */
export async function getActiveProfileClusters(): Promise<ProfileCluster[]> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-clusters/active`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get active profile clusters: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create profile cluster (admin)
 */
export async function createProfileCluster(cluster: Pick<ProfileCluster, 'id' | 'displayName' | 'code' | 'isActive' | 'order' | 'description' | 'influenceThreshold' | 'tags' | 'color'>): Promise<ProfileCluster> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-clusters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(cluster),
  });

  if (!response.ok) {
    throw new Error(`Failed to create profile cluster: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update profile cluster (admin)
 */
export async function updateProfileCluster(
  id: string,
  cluster: Partial<ProfileCluster>
): Promise<ProfileCluster> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-clusters/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(cluster),
  });

  if (!response.ok) {
    throw new Error(`Failed to update profile cluster: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete profile cluster (admin)
 */
export async function deleteProfileCluster(id: string): Promise<void> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-clusters/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete profile cluster: ${response.statusText}`);
  }
}

/**
 * Activate profile cluster (admin)
 */
export async function activateProfileCluster(id: string): Promise<ProfileCluster> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-clusters/${id}/activate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to activate profile cluster: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Deactivate profile cluster (admin)
 */
export async function deactivateProfileCluster(id: string): Promise<ProfileCluster> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-clusters/${id}/deactivate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to deactivate profile cluster: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Initialize default profile clusters (admin)
 */
export async function initializeDefaultClusters(): Promise<void> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-clusters/initialize-defaults`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to initialize default clusters: ${response.statusText}`);
  }
}

/**
 * Get all profile configurations (admin)
 */
export async function getProfileConfigs(): Promise<ProfileConfig[]> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-configs`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get profile configurations: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get current active configuration (admin)
 */
export async function getCurrentProfileConfig(): Promise<ProfileConfig> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-configs/current`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get current profile configuration: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create profile configuration (admin)
 */
export async function createProfileConfig(config: Omit<ProfileConfig, 'version'>): Promise<ProfileConfig> {
  // Get token from auth store structure
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile-configs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error(`Failed to create profile configuration: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update profile configuration (admin)
 */
export async function updateProfileConfig(
  version: string,
  config: Partial<ProfileConfig>
): Promise<ProfileConfig> {
  const response = await fetch(`${API_BASE_URL}/admin/profile-configs/${version}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error(`Failed to update profile configuration: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete profile configuration (admin)
 */
export async function deleteProfileConfig(version: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/profile-configs/${version}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete profile configuration: ${response.statusText}`);
  }
}

/**
 * Activate profile configuration (admin)
 */
export async function activateProfileConfig(version: string): Promise<ProfileConfig> {
  const response = await fetch(`${API_BASE_URL}/admin/profile-configs/${version}/activate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to activate profile configuration: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Deactivate profile configuration (admin)
 */
export async function deactivateProfileConfig(version: string): Promise<ProfileConfig> {
  const response = await fetch(`${API_BASE_URL}/admin/profile-configs/${version}/deactivate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to deactivate profile configuration: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Initialize default configuration (admin)
 */
export async function initializeDefaultConfig(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/profile-configs/initialize-defaults`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to initialize default configuration: ${response.statusText}`);
  }
}

/**
 * Get active assessment questions
 */
export async function getActiveQuestions(): Promise<Question[]> {
  const response = await fetch(`${API_BASE_URL}/questions`);

  if (!response.ok) {
    throw new Error(`Failed to get questions: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get user's assessment history (authenticated)
 */
export async function getUserAssessmentHistory(): Promise<ScoringResult[]> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/assessments/user/history`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get assessment history: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get user's latest assessment result (authenticated)
 */
export async function getLatestAssessment(): Promise<ScoringResult> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/assessments/user/latest`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get latest assessment: ${response.statusText}`);
  }

  const data = await response.json();
  // Return null if no assessment found (backend returns null with 200 status)
  return data;
}
