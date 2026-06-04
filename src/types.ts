export type ActiveScreen = 'landing' | 'login' | 'register' | 'choose-account' | 'pricing' | 'dashboard';

export type DashboardTab = 'home' | 'analysis' | 'scan' | 'transactions' | 'profile';

export interface UserSession {
  fullName: string;
  email: string;
  role: 'Nelayan' | 'Petambak' | 'Industri' | 'Lainnya' | '';
  package: 'Free' | 'Petambak Skala Kecil Menengah' | 'Petambak Skala Menengah Atas' | 'Koperasi Nelayan (Pemerintah)' | 'Industri Pengolahan & Eksportir' | 'Enterprise';
  billingMode: 'monthly' | 'yearly';
  isLoggedIn: boolean;
}

export interface ScanResult {
  timestamp: string;
  freshnessScore: number;
  sizeClass: string;
  estimatedWeightGrams: number;
  diseaseDetected: string;
  healthDiagnosis: string;
  marketPricePerKg: number;
  status: 'Sangat Segar' | 'Segar' | 'Kurang Segar';
  imageUrl?: string;
  detectionType?: 'size' | 'disease';
}

export interface BuyerOffer {
  id: string;
  name: string;
  distance: string;
  pricePerKgRange: string;
  rating: number;
  imageUrl: string;
  trusted: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeatureComparison {
  featureName: string;
  nelayan: boolean | string;
  skalaKM: boolean | string;
  skalaMA: boolean | string;
  enterprise: boolean | string;
}
