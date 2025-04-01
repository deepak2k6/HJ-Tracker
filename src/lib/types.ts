export type User = {
  id: string;
  email: string;
  name?: string;
  isAuthenticated: boolean;
};

export type SymptomLog = {
  id: string;
  userId: string;
  date: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  notes: string;
  createdAt: string;
};

export type MedicalRecord = {
  id: string;
  userId: string;
  date: string;
  type: 'condition' | 'medication' | 'procedure' | 'vaccination';
  title: string;
  description: string;
  provider?: string;
  createdAt: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};