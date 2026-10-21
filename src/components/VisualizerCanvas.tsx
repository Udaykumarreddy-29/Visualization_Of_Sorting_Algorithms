import React from 'react';
import { VisualStyle } from '../types/sorting';

interface VisualizerCanvasProps {
  array: number[];
  comparing: number[];
  swapping: number[];
  sortedIndices: number[];
  pivotIndex?: number | null;
  windowRange?: [number, number] | null;
  visualStyle: VisualStyle;
  title?: string;
  isCompleted?: boolean;
}

export const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({
  array,
  comparing,
  swapping,
  sortedIndices,
  pivotIndex,
  windowRange,
  visualStyle,
  title,
  isCompleted = false,
}) => {
  const sortedSet = React.useMemo(() => new Set(sortedIndices), [sortedIndices]);
  const comparingSet = React.useMemo(() => new Set(comparing), [comparing]);
  const swappingSet = React.useMemo(() => new Set(swapping), [swapping]);

  const maxVal = React.useMemo(() => {
    return array.length > 0 ? Math.max(...array, 100) : 100;
  }, [array]);

  const showLabels = array.length <= 32;

  return (
    <div className="relative w-full flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl p-4 sm:p-6 overflow-hidden select-none">
      {/* Canvas Header / Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs font-mono">
        {title && <span className="font-semibold text-slate-200 tracking-wide">{title}</span>}

        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#69aee8]" />
            <span>Default</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#ff7043]" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500" />
            <span>Swapping</span>
          </div>
          {pivotIndex !== null && pivotIndex !== undefined && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-purple-500" />
              <span>Pivot</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#4caf50]" />
            <span>Sorted</span>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full h-[320px] sm:h-[400px] flex items-end justify-center gap-[2px] sm:gap-[3px] px-2 pb-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
        {/* Active Range / Subarray backdrop indicator */}
        {windowRange && (
          <div
            className="absolute top-0 bottom-0 bg-indigo-500/10 border-x border-indigo-500/30 transition-all duration-150 pointer-events-none rounded-sm"
            style={{
              left: `${(windowRange[0] / array.length) * 100}%`,
              width: `${((windowRange[1] - windowRange[0] + 1) / array.length) * 100}%`,
            }}
          >
            <div className="absolute top-1 left-2 text-[10px] font-mono text-indigo-300 font-medium">
              Subarray [{windowRange[0]}..{windowRange[1]}]
            </div>
          </div>
        )}

        {/* Array Bars / Elements */}
        {array.map((value, idx) => {
          const heightPercent = Math.max(6, (value / maxVal) * 92);
          const isComparing = comparingSet.has(idx);
          const isSwapping = swappingSet.has(idx);
          const isPivot = pivotIndex === idx;
          const isSorted = sortedSet.has(idx) || isCompleted;

          // Color calculation
          let barBg = '#69aee8'; // Base blue (Tkinter color)
          let shadowGlow = 'none';

          if (isPivot) {
            barBg = '#a855f7'; // Purple
            shadowGlow = '0 0 14px rgba(168, 85, 247, 0.6)';
          } else if (isSwapping) {
            barBg = '#ef4444'; // Red
            shadowGlow = '0 0 14px rgba(239, 68, 68, 0.6)';
          } else if (isComparing) {
            barBg = '#ff7043'; // Tkinter active orange
            shadowGlow = '0 0 14px rgba(255, 112, 67, 0.6)';
          } else if (isSorted) {
            barBg = '#4caf50'; // Tkinter green
            shadowGlow = '0 0 8px rgba(76, 175, 80, 0.35)';
          } else if (visualStyle === 'rainbow') {
            const hue = Math.round((value / maxVal) * 280);
            barBg = `hsl(${hue}, 85%, 55%)`;
          }

          // Visual styles customization
          if (visualStyle === 'gradient' && !isComparing && !isSwapping && !isSorted && !isPivot) {
            barBg = 'linear-gradient(to top, #3b82f6, #60a5fa)';
          }

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-end relative h-full group"
            >
              {/* Optional top value label */}
              {showLabels && (
                <span
                  className={`text-[10px] font-mono font-medium mb-1 transition-colors select-none ${
                    isComparing || isSwapping
                      ? 'text-amber-300 font-bold scale-110'
                      : isSorted
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`}
                >
                  {value}
                </span>
              )}

              {/* The Visual Bar / Dot */}
              {visualStyle === 'dots' ? (
                <div
                  className="w-full flex items-center justify-center transition-all duration-75"
                  style={{
                    height: `${heightPercent}%`,
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-transform duration-75"
                    style={{
                      backgroundColor: barBg.includes('gradient') ? '#60a5fa' : barBg,
                      boxShadow: shadowGlow,
                      transform: isComparing || isSwapping ? 'scale(1.5)' : 'scale(1)',
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-full rounded-t-sm transition-all duration-75"
                  style={{
                    height: `${heightPercent}%`,
                    background: barBg,
                    boxShadow: shadowGlow,
                    opacity:
                      windowRange && (idx < windowRange[0] || idx > windowRange[1]) && !isSorted
                        ? 0.4
                        : 1,
                  }}
                />
              )}

              {/* Hover Tooltip showing index and value */}
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 text-[11px] font-mono text-slate-200 px-2 py-0.5 rounded border border-slate-700 pointer-events-none z-20 whitespace-nowrap shadow-lg">
                i:{idx} | val:{value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
