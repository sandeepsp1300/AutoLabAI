
export enum Sector {
  Manufacturing = 'Manufacturing',
  Finance = 'Finance',
  Healthcare = 'Healthcare',
  Retail = 'Retail',
  Logistics = 'Logistics'
}

export enum JobCategory {
  Routine = 'Routine',
  HighSkill = 'High-skill',
  Tech = 'Tech',
  Clerical = 'Clerical',
  Creative = 'Creative'
}

export interface AutomationData {
  sector: Sector;
  robot_density: number;
  ai_spending_index: number;
  digital_adoption_index: number;
  routine_task_share: number;
  avg_wage: number;
  employment_change_percent: number;
}

export interface PredictionFeatures {
  sector: Sector;
  robot_density: number;
  ai_spending_index: number;
  digital_adoption_index: number;
  routine_task_share: number;
  avg_wage: number;
}

export interface Scenario {
  name: string;
  description: string;
  modifiers: Partial<PredictionFeatures>;
}

export interface PredictionResult {
  prediction: number;
  top_features: string[];
  analysis: string;
  automation_risks: {
    routine: string;
    clerical: string;
    technical: string;
  };
  job_demand: {
    tech: string;
    creative: string;
    manual: string;
  };
  salary_impact: {
    high_skill: string;
    medium_skill: string;
    low_skill: string;
  };
  ai_readiness_score: number;
  career_stability: {
    low_stability_roles: string;
    high_stability_roles: string;
  };
  skill_recommendations: string[];
  future_outlook: 'Positive' | 'Negative' | 'Neutral';
}

export interface JobRiskMetric {
  category: JobCategory;
  displacement_risk: number;
  growth_potential: number;
  resilience_score: number;
  baseline_impact: number;
}
