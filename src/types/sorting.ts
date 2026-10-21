export type AlgorithmType =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'heap';

export type ArrayDistribution = 'random' | 'reversed' | 'nearlySorted' | 'fewUnique';

export type VisualStyle = 'bars' | 'gradient' | 'dots' | 'rainbow';

export interface SortStep {
  array: number[];
  comparing: number[];       // Indices being compared
  swapping: number[];        // Indices being swapped / moved
  sortedIndices: number[];   // Indices locked as sorted
  pivotIndex?: number | null; // Pivot element (e.g. in QuickSort)
  windowRange?: [number, number] | null; // Active merge/partition window
  description: string;       // Human-readable step description
  pseudoLine: number;        // Active line index in pseudocode (1-indexed)
  comparisons: number;
  swaps: number;
  accesses: number;
}

export interface PseudocodeLine {
  line: number;
  code: string;
  indent: number;
}

export interface AlgorithmInfo {
  id: AlgorithmType;
  name: string;
  timeBest: string;
  timeAvg: string;
  timeWorst: string;
  space: string;
  stable: boolean;
  inPlace: boolean;
  category: string;
  description: string;
  pseudocode: PseudocodeLine[];
}
