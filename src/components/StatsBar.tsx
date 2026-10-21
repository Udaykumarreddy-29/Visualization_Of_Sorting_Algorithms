import React from 'react';
import { Activity, ArrowLeftRight, Clock, Database, Layers } from 'lucide-react';

interface StatsBarProps {
  comparisons: number;
  swaps: number;
  accesses: number;
  elapsedMs: number;
  currentStepIndex: number;
  totalSteps: number;
  statusText: string;
  onScrub: (index: number) => void;
  disabled: boolean;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  comparisons,
  swaps,
  accesses,
  elapsedMs,
  currentStepIndex,
  totalSteps,
  statusText,
  onScrub,
  disabled,
}) => {
  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const progressPercent = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="flex flex-col gap-3 w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
        <div className="flex items-center gap-2.5 bg-slate-950/60 border border-slate-800/80 px-3.5 py-2.5 rounded-lg">
          <Activity className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-medium">Comparisons</span>
            <span className="text-lg font-bold font-mono text-white leading-tight">{comparisons}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-950/60 border border-slate-800/80 px-3.5 py-2.5 rounded-lg">
          <ArrowLeftRight className="w-4 h-4 text-rose-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-medium">Swaps / Writes</span>
            <span className="text-lg font-bold font-mono text-white leading-tight">{swaps}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-950/60 border border-slate-800/80 px-3.5 py-2.5 rounded-lg">
          <Database className="w-4 h-4 text-sky-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-medium">Array Accesses</span>
            <span className="text-lg font-bold font-mono text-white leading-tight">{accesses}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-950/60 border border-slate-800/80 px-3.5 py-2.5 rounded-lg">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-medium">Elapsed Time</span>
            <span className="text-lg font-bold font-mono text-white leading-tight">{formatTime(elapsedMs)}</span>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/40 rounded-lg border border-slate-800/60 text-xs sm:text-sm font-mono text-slate-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="truncate">{statusText}</span>
      </div>

      {/* Timeline Scrubbing Bar */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Step {Math.min(currentStepIndex + 1, totalSteps)} of {totalSteps}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>

        <div className="relative flex items-center">
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={currentStepIndex}
            onChange={(e) => onScrub(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-colors"
            title="Drag to scrub through sorting steps"
          />
        </div>
      </div>
    </div>
  );
};
