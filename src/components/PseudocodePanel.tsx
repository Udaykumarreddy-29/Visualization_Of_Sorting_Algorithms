import React from 'react';
import { AlgorithmInfo } from '../types/sorting';
import { Code2 } from 'lucide-react';

interface PseudocodePanelProps {
  algorithmInfo: AlgorithmInfo;
  activeLine: number;
}

export const PseudocodePanel: React.FC<PseudocodePanelProps> = ({
  algorithmInfo,
  activeLine,
}) => {
  return (
    <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl h-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-200">
          <Code2 className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold tracking-wide">Live Execution Pseudocode</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
          {algorithmInfo.name}
        </span>
      </div>

      <div className="flex flex-col font-mono text-xs overflow-x-auto rounded-xl bg-slate-950 p-3 border border-slate-800/80 space-y-0.5 max-h-[260px] overflow-y-auto scrollbar-thin">
        {algorithmInfo.pseudocode.map((item) => {
          const isActive = item.line === activeLine;
          return (
            <div
              key={item.line}
              className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                isActive
                  ? 'bg-blue-600/25 border-l-2 border-blue-400 text-blue-200 font-semibold shadow-inner'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-4 text-right text-[10px] select-none ${isActive ? 'text-blue-400' : 'text-slate-600'}`}>
                {item.line}
              </span>
              <span
                style={{
                  paddingLeft: `${item.indent * 14}px`,
                }}
                className="whitespace-pre"
              >
                {item.code}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-slate-500 font-mono">
        Active line highlights automatically follow step executions in real time.
      </p>
    </div>
  );
};
