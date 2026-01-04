
export interface Phase {
  id: number;
  name: string;
  range: string;
  days: number;
  task: string;
  color: string;
}

export interface Chapter {
  id: string;
  title: string;
  dateRange: string;
  days: number;
  targetWords: string;
  coreContent: string[];
  rhythm: string[];
  deliverables: string[];
  phase: number;
}

export interface WorkloadItem {
  phase: string;
  words: number;
  hours: number;
  desc: string;
}

// Added RiskItem interface to support RISKS constant
export interface RiskItem {
  type: string;
  action: string;
}
