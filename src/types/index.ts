export type ClassificationType = 
  | 'CONFIRMED' 
  | 'OFFICIAL ANNOUNCEMENT' 
  | 'LEAK / SCRIPT LEAK'
  | 'RUMOUR' 
  | 'MULTIVERSE INTEL' 
  | 'SPECULATION';

export interface IntelligenceSource {
  name: string;
  url?: string;
  date: string;
}

export interface IntelligenceItem {
  id: string;
  code: string;
  clearanceLevel: 'LEVEL 4' | 'LEVEL 7' | 'OMEGA' | 'MULTIVERSE ALPHA';
  classification: ClassificationType;
  title: string;
  summary: string;
  fullReport: string;
  redactedPhrases: string[];
  sources: IntelligenceSource[];
  timestamp: string;
  department: string;
  threatAssessment: string;
  imageUrl?: string;
}

export type AffiliationType = 
  | 'LATVERIA / GOD EMPEROR' 
  | 'AVENGERS' 
  | 'FANTASTIC FOUR' 
  | 'X-MEN / MUTANTS' 
  | 'MULTIVERSE / TVA' 
  | 'THUNDERBOLTS*';

export interface CharacterProfile {
  id: string;
  name: string;
  alias: string;
  affiliation: AffiliationType;
  status: string;
  actor: string;
  universe: string;
  threatClass: 'ALPHA' | 'OMEGA' | 'UNIVERSAL / BEYOND' | 'DELTA' | 'COSMIC';
  bio: string;
  quote: string;
  abilities: string[];
  equipment: string[];
  dossierNotes: string;
  image: string;
  themeColor: 'doom' | 'crimson' | 'silver';
}

export interface TimelineEvent {
  id: string;
  yearOrEra: string;
  code: string;
  title: string;
  phase: string;
  universe: string;
  summary: string;
  incursionImpact: string;
  status: 'STABILIZED' | 'BREACH DETECTED' | 'INCUSION COLLAPSE' | 'PENDING DOOM';
  imageUrl: string;
  keyEntities: string[];
}

export interface SecretArchiveEntry {
  id: string;
  passcode: string;
  title: string;
  sender: string;
  recipient: string;
  timestamp: string;
  clearance: string;
  content: string;
  audioFrequency?: string;
  clue: string;
}

export interface CountdownTime {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalDays: number;
  isElapsed: boolean;
}
