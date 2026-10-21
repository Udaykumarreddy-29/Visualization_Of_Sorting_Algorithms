import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Shuffle,
  Volume2,
  VolumeX,
  Swords,
  Edit3,
  Sliders,
  Palette,
} from 'lucide-react';
import { AlgorithmType, ArrayDistribution, VisualStyle } from '../types/sorting';
import { ALGORITHM_INFO } from '../utils/algorithms';

interface ControlsProps {
  algorithm: AlgorithmType;
  onSelectAlgorithm: (algo: AlgorithmType) => void;
  isRunning: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onGenerateArray: () => void;
  arraySize: number;
  onChangeArraySize: (size: number) => void;
  distribution: ArrayDistribution;
  onChangeDistribution: (dist: ArrayDistribution) => void;
  delayMs: number;
  onChangeDelayMs: (ms: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  soundVolume: number;
  onChangeVolume: (vol: number) => void;
  visualStyle: VisualStyle;
  onChangeVisualStyle: (style: VisualStyle) => void;
  onOpenCustomArray: () => void;
  isRaceMode: boolean;
  onToggleRaceMode: () => void;
  canStepBack: boolean;
  canStepForward: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  algorithm,
  onSelectAlgorithm,
  isRunning,
  isPaused,
  onPlay,
  onPause,
  onReset,
  onStepBack,
  onStepForward,
  onGenerateArray,
  arraySize,
  onChangeArraySize,
  distribution,
  onChangeDistribution,
  delayMs,
  onChangeDelayMs,
  soundEnabled,
  onToggleSound,
  soundVolume,
  onChangeVolume,
  visualStyle,
  onChangeVisualStyle,
  onOpenCustomArray,
  isRaceMode,
  onToggleRaceMode,
  canStepBack,
  canStepForward,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Top Bar: Primary Algorithm Selector & Main Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        {/* Algorithm Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full scrollbar-thin">
          {(Object.keys(ALGORITHM_INFO) as AlgorithmType[]).map((algoKey) => {
            const isSelected = algorithm === algoKey;
            return (
              <button
                key={algoKey}
                onClick={() => onSelectAlgorithm(algoKey)}
                disabled={isRunning && !isPaused}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {ALGORITHM_INFO[algoKey].name}
              </button>
            );
          })}
        </div>

        {/* Mode Toggles: Custom Input & Race Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCustomArray}
            disabled={isRunning && !isPaused}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            title="Input custom array numbers"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Custom Array</span>
          </button>

          <button
            onClick={onToggleRaceMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
              isRaceMode
                ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/25'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title="Compare two algorithms side-by-side"
          >
            <Swords className="w-3.5 h-3.5 text-purple-300" />
            <span>{isRaceMode ? 'Exit Race' : 'Race Mode'}</span>
          </button>
        </div>
      </div>

      {/* Primary Playback Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Play / Pause / Step Controls */}
        <div className="flex items-center gap-2">
          {!isRunning || isPaused ? (
            <button
              onClick={onPlay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPaused ? 'Resume' : 'Start Sorting'}</span>
            </button>
          ) : (
            <button
              onClick={onPause}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm shadow-lg shadow-amber-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>
          )}

          <div className="flex items-center bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700">
            <button
              onClick={onStepBack}
              disabled={!canStepBack || (isRunning && !isPaused)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              title="Step backward (1 step)"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={onStepForward}
              disabled={!canStepForward || (isRunning && !isPaused)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              title="Step forward (1 step)"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer border border-slate-700"
            title="Reset to beginning of current array"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Reset</span>
          </button>

          <button
            onClick={onGenerateArray}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer border border-blue-700/50"
            title="Generate a new array"
          >
            <Shuffle className="w-4 h-4 text-blue-400" />
            <span>Generate Array</span>
          </button>
        </div>

        {/* Audio Mute & Volume */}
        <div className="flex items-center gap-3 bg-slate-950/50 px-3 py-1.5 rounded-xl border border-slate-800">
          <button
            onClick={onToggleSound}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={soundEnabled ? soundVolume : 0}
            onChange={(e) => onChangeVolume(Number(e.target.value))}
            className="w-16 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            title={`Sound Volume: ${Math.round(soundVolume * 100)}%`}
          />
        </div>
      </div>

      {/* Tuning Settings: Speed, Array Size, Distribution, Visual Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
        {/* Speed Controls */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-slate-400 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              Speed Delay: <span className="text-white font-semibold">{delayMs} ms</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {delayMs <= 10 ? 'Ultra Fast' : delayMs <= 40 ? 'Fast' : delayMs <= 150 ? 'Normal' : 'Slow'}
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={500}
            step={5}
            value={delayMs}
            onChange={(e) => onChangeDelayMs(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex items-center gap-1 justify-between pt-0.5">
            {[5, 25, 80, 200, 450].map((preset) => (
              <button
                key={preset}
                onClick={() => onChangeDelayMs(preset)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                  delayMs === preset ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {preset === 5 ? 'Max' : `${preset}ms`}
              </button>
            ))}
          </div>
        </div>

        {/* Array Size */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-slate-400">
              Array Size: <span className="text-white font-semibold">{arraySize}</span> bars
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {arraySize <= 32 ? 'Value tags on' : 'Compact bars'}
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={120}
            step={2}
            value={arraySize}
            disabled={isRunning && !isPaused}
            onChange={(e) => onChangeArraySize(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-50"
          />
          <div className="flex items-center gap-1 justify-between pt-0.5">
            {[16, 32, 40, 64, 100].map((sz) => (
              <button
                key={sz}
                onClick={() => onChangeArraySize(sz)}
                disabled={isRunning && !isPaused}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                  arraySize === sz ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                } disabled:opacity-50`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Array Distribution */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-slate-400">Array Distribution</span>
          <select
            value={distribution}
            disabled={isRunning && !isPaused}
            onChange={(e) => onChangeDistribution(e.target.value as ArrayDistribution)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none focus:border-indigo-500 disabled:opacity-50"
          >
            <option value="random">Random Distribution</option>
            <option value="reversed">Reversed (Worst Case)</option>
            <option value="nearlySorted">Nearly Sorted (Best for Insertion)</option>
            <option value="fewUnique">Few Unique (Dutch Flag)</option>
          </select>
        </div>

        {/* Visual Render Style */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-slate-400 flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            Visual Style
          </span>
          <div className="grid grid-cols-4 gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-center">
            {(['bars', 'gradient', 'rainbow', 'dots'] as VisualStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => onChangeVisualStyle(style)}
                className={`py-1 text-[11px] font-medium rounded capitalize cursor-pointer transition-colors ${
                  visualStyle === style ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
