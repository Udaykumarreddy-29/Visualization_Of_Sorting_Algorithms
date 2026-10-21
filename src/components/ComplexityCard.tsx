import React from 'react';
import { AlgorithmInfo } from '../types/sorting';
import { BookOpen, Check, X } from 'lucide-react';

interface ComplexityCardProps {
  algorithmInfo: AlgorithmInfo;
}

export const ComplexityCard: React.FC<ComplexityCardProps> = ({ algorithmInfo }) => {
  return (
    <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl h-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-200">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold tracking-wide">Complexity & Properties</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Method: <span className="text-slate-200">{algorithmInfo.category}</span>
        </span>
      </div>

      {/* Clean Unboxed Complexity Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">Best Time</span>
          <span className="text-sm font-mono font-bold text-emerald-400">{algorithmInfo.timeBest}</span>
        </div>

        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">Average Time</span>
          <span className="text-sm font-mono font-bold text-amber-400">{algorithmInfo.timeAvg}</span>
        </div>

        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">Worst Time</span>
          <span className="text-sm font-mono font-bold text-rose-400">{algorithmInfo.timeWorst}</span>
        </div>

        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">Space Aux</span>
          <span className="text-sm font-mono font-bold text-sky-400">{algorithmInfo.space}</span>
        </div>
      </div>

      {/* Algorithm Characteristics */}
      <div className="flex items-center gap-6 text-xs text-slate-300 font-mono py-2 border-y border-slate-800/80 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">Stable:</span>
          {algorithmInfo.stable ? (
            <span className="inline-flex items-center gap-0.5 text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> Yes
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 text-rose-400 font-semibold">
              <X className="w-3.5 h-3.5" /> No
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">In-Place:</span>
          {algorithmInfo.inPlace ? (
            <span className="inline-flex items-center gap-0.5 text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> Yes
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 text-rose-400 font-semibold">
              <X className="w-3.5 h-3.5" /> No
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed">
        {algorithmInfo.description}
      </p>
    </div>
  );
};
