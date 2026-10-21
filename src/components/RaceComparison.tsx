import React, { useState, useEffect, useRef } from 'react';
import { AlgorithmType, SortStep, VisualStyle } from '../types/sorting';
import { ALGORITHM_INFO, generateSortSteps } from '../utils/algorithms';
import { VisualizerCanvas } from './VisualizerCanvas';
import { Play, Pause, RotateCcw, Trophy, X, Activity, ArrowLeftRight } from 'lucide-react';
import { soundSynth } from '../utils/audio';

interface RaceComparisonProps {
  initialArray: number[];
  visualStyle: VisualStyle;
  delayMs: number;
  onClose: () => void;
}

export const RaceComparison: React.FC<RaceComparisonProps> = ({
  initialArray,
  visualStyle,
  delayMs,
  onClose,
}) => {
  const [algoA, setAlgoA] = useState<AlgorithmType>('quick');
  const [algoB, setAlgoB] = useState<AlgorithmType>('merge');

  const [stepsA, setStepsA] = useState<SortStep[]>([]);
  const [stepsB, setStepsB] = useState<SortStep[]>([]);

  const [stepIdxA, setStepIdxA] = useState<number>(0);
  const [stepIdxB, setStepIdxB] = useState<number>(0);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Initialize steps whenever algorithms or array change
  useEffect(() => {
    const sA = generateSortSteps(initialArray, algoA);
    const sB = generateSortSteps(initialArray, algoB);
    setStepsA(sA);
    setStepsB(sB);
    setStepIdxA(0);
    setStepIdxB(0);
    setIsRunning(false);
    setIsPaused(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [initialArray, algoA, algoB]);

  // Main playback loop
  useEffect(() => {
    if (!isRunning || isPaused) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const interval = Math.max(5, delayMs);
    timerRef.current = window.setInterval(() => {
      let doneA = false;
      let doneB = false;

      setStepIdxA((prevA) => {
        if (prevA < stepsA.length - 1) {
          const nextA = prevA + 1;
          const currentStep = stepsA[nextA];
          if (currentStep.comparing.length > 0) {
            const val = currentStep.array[currentStep.comparing[0]];
            soundSynth.playTone(val, 10, 100, Math.min(25, interval));
          }
          return nextA;
        }
        doneA = true;
        return prevA;
      });

      setStepIdxB((prevB) => {
        if (prevB < stepsB.length - 1) {
          return prevB + 1;
        }
        doneB = true;
        return prevB;
      });

      if (doneA && doneB) {
        setIsRunning(false);
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        soundSynth.playFinishFanfare();
      }
    }, interval);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, isPaused, delayMs, stepsA, stepsB]);

  const handleStart = () => {
    if (stepIdxA >= stepsA.length - 1 && stepIdxB >= stepsB.length - 1) {
      setStepIdxA(0);
      setStepIdxB(0);
    }
    setIsPaused(false);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setStepIdxA(0);
    setStepIdxB(0);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const currentStepA = stepsA[stepIdxA] || {
    array: initialArray,
    comparing: [],
    swapping: [],
    sortedIndices: [],
    comparisons: 0,
    swaps: 0,
    accesses: 0,
  };

  const currentStepB = stepsB[stepIdxB] || {
    array: initialArray,
    comparing: [],
    swapping: [],
    sortedIndices: [],
    comparisons: 0,
    swaps: 0,
    accesses: 0,
  };

  const isDoneA = stepsA.length > 0 && stepIdxA >= stepsA.length - 1;
  const isDoneB = stepsB.length > 0 && stepIdxB >= stepsB.length - 1;

  const bothFinished = isDoneA && isDoneB;

  return (
    <div className="flex flex-col gap-4 bg-slate-900/95 border border-purple-900/50 rounded-2xl p-4 sm:p-6 shadow-2xl">
      {/* Race Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Algorithm Race Arena
            </h2>
            <p className="text-xs text-slate-400">
              Comparing two algorithms side-by-side on the exact same array
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isRunning || isPaused ? (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm cursor-pointer shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPaused ? 'Resume Race' : 'Start Race'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs sm:text-sm cursor-pointer shadow-lg shadow-amber-600/30 transition-all"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Race</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
            title="Exit Race Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Outcome Banner if both finished */}
      {bothFinished && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-slate-900 border border-purple-500/40 text-xs sm:text-sm text-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white">
                {stepsA.length < stepsB.length
                  ? `${ALGORITHM_INFO[algoA].name} Wins!`
                  : stepsB.length < stepsA.length
                  ? `${ALGORITHM_INFO[algoB].name} Wins!`
                  : 'Tie!'}
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                {ALGORITHM_INFO[algoA].name} completed in {currentStepA.comparisons} comparisons & {currentStepA.swaps} swaps vs{' '}
                {ALGORITHM_INFO[algoB].name} in {currentStepB.comparisons} comparisons & {currentStepB.swaps} swaps.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dual Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitor A */}
        <div className="flex flex-col gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase">Lane A</span>
              <select
                value={algoA}
                disabled={isRunning}
                onChange={(e) => setAlgoA(e.target.value as AlgorithmType)}
                className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none"
              >
                {(Object.keys(ALGORITHM_INFO) as AlgorithmType[]).map((key) => (
                  <option key={key} value={key}>
                    {ALGORITHM_INFO[key].name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                {currentStepA.comparisons} comps
              </span>
              <span className="flex items-center gap-1">
                <ArrowLeftRight className="w-3.5 h-3.5 text-rose-400" />
                {currentStepA.swaps} swaps
              </span>
              {isDoneA && <span className="text-emerald-400 font-bold">Done!</span>}
            </div>
          </div>

          <VisualizerCanvas
            array={currentStepA.array}
            comparing={currentStepA.comparing}
            swapping={currentStepA.swapping}
            sortedIndices={currentStepA.sortedIndices}
            pivotIndex={currentStepA.pivotIndex}
            windowRange={currentStepA.windowRange}
            visualStyle={visualStyle}
            isCompleted={isDoneA}
          />
        </div>

        {/* Competitor B */}
        <div className="flex flex-col gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">Lane B</span>
              <select
                value={algoB}
                disabled={isRunning}
                onChange={(e) => setAlgoB(e.target.value as AlgorithmType)}
                className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none"
              >
                {(Object.keys(ALGORITHM_INFO) as AlgorithmType[]).map((key) => (
                  <option key={key} value={key}>
                    {ALGORITHM_INFO[key].name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                {currentStepB.comparisons} comps
              </span>
              <span className="flex items-center gap-1">
                <ArrowLeftRight className="w-3.5 h-3.5 text-rose-400" />
                {currentStepB.swaps} swaps
              </span>
              {isDoneB && <span className="text-emerald-400 font-bold">Done!</span>}
            </div>
          </div>

          <VisualizerCanvas
            array={currentStepB.array}
            comparing={currentStepB.comparing}
            swapping={currentStepB.swapping}
            sortedIndices={currentStepB.sortedIndices}
            pivotIndex={currentStepB.pivotIndex}
            windowRange={currentStepB.windowRange}
            visualStyle={visualStyle}
            isCompleted={isDoneB}
          />
        </div>
      </div>
    </div>
  );
};
