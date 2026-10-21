import React, { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface CustomArrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (customArray: number[]) => void;
  currentArray: number[];
}

export const CustomArrayModal: React.FC<CustomArrayModalProps> = ({
  isOpen,
  onClose,
  onApply,
  currentArray,
}) => {
  const [textInput, setTextInput] = useState(() => currentArray.join(', '));
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleParseAndApply = () => {
    try {
      const parts = textInput
        .split(/[,;\s]+/)
        .map((s) => s.trim())
        .filter(Boolean);

      if (parts.length < 4) {
        setError('Please enter at least 4 numbers.');
        return;
      }
      if (parts.length > 120) {
        setError('Array cannot exceed 120 numbers.');
        return;
      }

      const numbers = parts.map((p) => {
        const num = Number(p);
        if (isNaN(num)) {
          throw new Error(`"${p}" is not a valid number.`);
        }
        return Math.max(5, Math.min(100, Math.round(num)));
      });

      setError(null);
      onApply(numbers);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid input format.');
      }
    }
  };

  const setPreset = (presetValues: number[]) => {
    setTextInput(presetValues.join(', '));
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-semibold text-white">Custom Array Input</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          <p className="text-xs text-slate-400">
            Enter comma or space-separated numbers between 5 and 100.
          </p>

          <textarea
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              setError(null);
            }}
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 scrollbar-thin"
            placeholder="e.g. 85, 23, 67, 12, 94, 38, 55, 71, 19, 44, 62"
          />

          {error && (
            <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick presets */}
          <div>
            <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Quick Test Presets
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setPreset([95, 88, 80, 72, 65, 58, 50, 42, 35, 28, 20, 12])}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
              >
                Reversed (12 items)
              </button>
              <button
                type="button"
                onClick={() => setPreset([10, 18, 26, 34, 52, 45, 60, 68, 77, 85, 93, 100])}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
              >
                Nearly Sorted
              </button>
              <button
                type="button"
                onClick={() => setPreset([25, 75, 25, 50, 75, 25, 50, 75, 50, 25, 75, 50])}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
              >
                Dutch Flag (3 values)
              </button>
              <button
                type="button"
                onClick={() =>
                  setPreset([70, 70, 70, 70, 70, 70, 70, 70, 70, 70])
                }
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
              >
                All Identical
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleParseAndApply}
            className="px-5 py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition-colors cursor-pointer"
          >
            Apply Array
          </button>
        </div>
      </div>
    </div>
  );
};
