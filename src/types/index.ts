export type Currency = 'KES' | 'USD';

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  category: 'residential' | 'commercial' | 'industrial' | 'infrastructure';
  area: string;
  year: string;
  client: string;
  description: string;
  image: string;
  blueprintImage?: string;
  ncaRating: string;
  structuralHighlight: string;
  concreteGrade: string;
  completionTimeline: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface SiteLocation {
  id: string;
  name: string;
  suburb: string;
  coordinates: { x: number; y: number }; // Percentage position on Nairobi schematic map
  type: string;
  stage: 'Excavation' | 'Substructure' | 'Superstructure' | 'MEP & Glazing' | 'Final Handover';
  progress: number;
  area: string;
  leadEngineer: string;
  lastInspection: string;
}

export interface CostEstimateInput {
  buildingType: 'residential_villa' | 'commercial_office' | 'apartments' | 'industrial_warehouse';
  location: string;
  areaSqM: number;
  finishTier: 'standard' | 'executive' | 'bespoke';
  includeSolar: boolean;
  includeWaterHarvesting: boolean;
  includeSmartAutomation: boolean;
  includeBorehole: boolean;
}

export interface CostEstimateResult {
  totalKES: number;
  totalUSD: number;
  ratePerSqM_KES: number;
  timelineMonths: number;
  breakdown: {
    category: string;
    percentage: number;
    amountKES: number;
  }[];
}
