export interface User {
  id: string;
  name: string;
  email: string;
  activeBubbleId?: string; // Currently selected bubble
  points: number;
  level: number;
  badges: string[];
  avatar?: string;
  createdAt: Date;
}

export interface Bubble {
  id: string;
  name: string;
  description: string;
  inviteCode: string; // Always required now
  members: string[];
  totalPoints: number;
  totalCO2Saved: number;
  createdBy: string;
  createdAt: Date;
}

export interface UserBubble {
  id: string;
  userId: string;
  bubbleId: string;
  joinedAt: Date;
  role: 'member' | 'admin';
  points: number; // Points earned in this specific bubble
  co2Saved: number; // CO2 saved in this specific bubble
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'food' | 'waste' | 'energy' | 'other';
  co2Impact: number; // kg saved
  points: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface ChallengeCompletion {
  id: string;
  userId: string;
  challengeId: string;
  bubbleId: string;
  completedAt: Date;
  photo?: string;
  comment?: string;
  points: number;
  co2Saved: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  category: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface Level {
  level: number;
  name: string;
  icon: string;
  minPoints: number;
  maxPoints: number;
  color: string;
}