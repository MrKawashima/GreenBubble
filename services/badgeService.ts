import { Badge, Level, ChallengeCompletion } from '@/types';

export const LEVELS: Level[] = [
  {
    level: 1,
    name: 'Grønnspire',
    icon: '🌱',
    minPoints: 0,
    maxPoints: 99,
    color: '#10B981'
  },
  {
    level: 2,
    name: 'Miljøagent',
    icon: '🌿',
    minPoints: 100,
    maxPoints: 299,
    color: '#059669'
  },
  {
    level: 3,
    name: 'Bærekraftskjemper',
    icon: '🌳',
    minPoints: 300,
    maxPoints: 599,
    color: '#047857'
  },
  {
    level: 4,
    name: 'Miljømester',
    icon: '🌍',
    minPoints: 600,
    maxPoints: 999,
    color: '#065F46'
  },
  {
    level: 5,
    name: 'Bærekraftshelt',
    icon: '☀️',
    minPoints: 1000,
    maxPoints: Infinity,
    color: '#064E3B'
  }
];

export const AVAILABLE_BADGES: Omit<Badge, 'earned' | 'earnedAt'>[] = [
  {
    id: 'first_challenge',
    name: 'Første Skritt',
    description: 'Fullfør din første utfordring',
    icon: '🌱',
    requirement: 'Complete 1 challenge',
    category: 'milestone'
  },
  {
    id: 'green_warrior',
    name: 'Grønnsakskriger',
    description: 'Fullfør 3 kjøttfrie utfordringer',
    icon: '🥦',
    requirement: 'Complete 3 food challenges',
    category: 'food'
  },
  {
    id: 'recycle_guru',
    name: 'Gjenbruksguru',
    description: 'Del 5 gjenbruksbilder',
    icon: '🔁',
    requirement: 'Complete 5 waste challenges',
    category: 'waste'
  },
  {
    id: 'eco_sprout',
    name: 'Miljøspire',
    description: 'Fullfør 10 utfordringer totalt',
    icon: '🌱',
    requirement: 'Complete 10 challenges',
    category: 'milestone'
  },
  {
    id: 'transport_hero',
    name: 'Transporthelt',
    description: 'Bruk miljøvennlig transport 5 ganger',
    icon: '🚲',
    requirement: 'Complete 5 transport challenges',
    category: 'transport'
  },
  {
    id: 'energy_saver',
    name: 'Energisparer',
    description: 'Spar energi i 7 dager',
    icon: '💡',
    requirement: 'Complete 7 energy challenges',
    category: 'energy'
  },
  {
    id: 'consistency_king',
    name: 'Konsistenskong',
    description: 'Fullfør utfordringer 3 uker på rad',
    icon: '👑',
    requirement: 'Complete challenges for 3 consecutive weeks',
    category: 'consistency'
  },
  {
    id: 'co2_champion',
    name: 'CO₂ Mester',
    description: 'Spar 25kg CO₂ totalt',
    icon: '🏆',
    requirement: 'Save 25kg CO₂',
    category: 'impact'
  },
  {
    id: 'social_butterfly',
    name: 'Sosial Sommerfugl',
    description: 'Inviter 3 venner til din boble',
    icon: '🦋',
    requirement: 'Invite 3 friends',
    category: 'social'
  },
  {
    id: 'photo_master',
    name: 'Fotomester',
    description: 'Del 15 bilder av utfordringer',
    icon: '📸',
    requirement: 'Share 15 challenge photos',
    category: 'engagement'
  }
];

export class BadgeService {
  static getUserLevel(points: number): Level {
    return LEVELS.find(level => points >= level.minPoints && points <= level.maxPoints) || LEVELS[0];
  }

  static getNextLevel(currentLevel: number): Level | null {
    return LEVELS.find(level => level.level === currentLevel + 1) || null;
  }

  static getProgressToNextLevel(points: number): { current: number; total: number; percentage: number } {
    const currentLevel = this.getUserLevel(points);
    const nextLevel = this.getNextLevel(currentLevel.level);
    
    if (!nextLevel) {
      return { current: points, total: points, percentage: 100 };
    }

    const current = points - currentLevel.minPoints;
    const total = nextLevel.minPoints - currentLevel.minPoints;
    const percentage = Math.min(100, (current / total) * 100);

    return { current, total, percentage };
  }

  static checkBadgeEligibility(
    badge: Omit<Badge, 'earned' | 'earnedAt'>,
    userStats: {
      totalChallenges: number;
      foodChallenges: number;
      wasteChallenges: number;
      transportChallenges: number;
      energyChallenges: number;
      totalCO2Saved: number;
      photosShared: number;
      friendsInvited: number;
      consecutiveWeeks: number;
    }
  ): boolean {
    switch (badge.id) {
      case 'first_challenge':
        return userStats.totalChallenges >= 1;
      case 'green_warrior':
        return userStats.foodChallenges >= 3;
      case 'recycle_guru':
        return userStats.wasteChallenges >= 5;
      case 'eco_sprout':
        return userStats.totalChallenges >= 10;
      case 'transport_hero':
        return userStats.transportChallenges >= 5;
      case 'energy_saver':
        return userStats.energyChallenges >= 7;
      case 'consistency_king':
        return userStats.consecutiveWeeks >= 3;
      case 'co2_champion':
        return userStats.totalCO2Saved >= 25;
      case 'social_butterfly':
        return userStats.friendsInvited >= 3;
      case 'photo_master':
        return userStats.photosShared >= 15;
      default:
        return false;
    }
  }

  static calculateUserStats(completions: ChallengeCompletion[]): {
    totalChallenges: number;
    foodChallenges: number;
    wasteChallenges: number;
    transportChallenges: number;
    energyChallenges: number;
    totalCO2Saved: number;
    photosShared: number;
    friendsInvited: number;
    consecutiveWeeks: number;
  } {
    // For demo purposes, we'll calculate basic stats
    // In a real app, you'd have more sophisticated tracking
    return {
      totalChallenges: completions.length,
      foodChallenges: completions.filter(c => c.challengeId.includes('food')).length,
      wasteChallenges: completions.filter(c => c.challengeId.includes('waste')).length,
      transportChallenges: completions.filter(c => c.challengeId.includes('transport')).length,
      energyChallenges: completions.filter(c => c.challengeId.includes('energy')).length,
      totalCO2Saved: completions.reduce((sum, c) => sum + c.co2Saved, 0),
      photosShared: completions.filter(c => c.photo).length,
      friendsInvited: 0, // Would be tracked separately
      consecutiveWeeks: 1 // Would be calculated based on completion dates
    };
  }

  static getUserBadges(completions: ChallengeCompletion[]): Badge[] {
    const userStats = this.calculateUserStats(completions);
    
    return AVAILABLE_BADGES.map(badge => ({
      ...badge,
      earned: this.checkBadgeEligibility(badge, userStats),
      earnedAt: this.checkBadgeEligibility(badge, userStats) ? new Date() : undefined
    }));
  }
}