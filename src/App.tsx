/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AlgorithmType, ArrayDistribution, SortStep, VisualStyle } from './types/sorting';
import { ALGORITHM_INFO, generateArrayData, generateSortSteps } from './utils/algorithms';
import { soundSynth } from './utils/audio';
import { VisualizerCanvas } from './components/VisualizerCanvas';
import { Controls } from './components/Controls';
import { StatsBar } from './components/StatsBar';
import { PseudocodePanel } from './components/PseudocodePanel';
import { ComplexityCard } from './components/ComplexityCard';
import { CustomArrayModal } from './components/CustomArrayModal';
import { RaceComparison } from './components/RaceComparison';
import { BarChart3, Info } from 'lucide-react';

export default function App() {
  // Configuration State
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [arraySize, setArraySize] = useState<number>(40);
  const [distribution, setDistribution] = useState<ArrayDistribution>('random');
  const [delayMs, setDelayMs] = useState<number>(100);
  const [visualStyle, setVisualStyle] = useState<VisualStyle>('bars');

  // Sound State
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [soundVolume, setSoundVolume] = useState<number>(0.15);

  // Modals & Secondary Modes
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [isRaceMode, setIsRaceMode] = useState<boolean>(false);

  // Array & Steps State
  const [currentArray, setCurrentArray] = useState<number[]>(() =>
    generateArrayData(40, 'random')
  );
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Playback Control State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [elapsedMs, setElapsedMs] = useState<number>(0);

  // References for timers
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  // Re-generate steps whenever array or algorithm changes
  const regenerateSteps = useCallback((array: number[], algo: AlgorithmType) => {
    const computedSteps = generateSortSteps(array, algo);
    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsRunning(false);
    setIsPaused(false);
    setElapsedMs(0);
    accumulatedTimeRef.current = 0;
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Initialize steps on mount
  useEffect(() => {
    regenerateSteps(currentArray, algorithm);
  }, []);

  // Sync sound settings
  useEffect(() => {
    soundSynth.setEnabled(soundEnabled);
    soundSynth.setVolume(soundVolume);
  }, [soundEnabled, soundVolume]);

  // Main animation timer loop
  useEffect(() => {
    if (!isRunning || isPaused) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    startTimeRef.current = Date.now();
    const interval = Math.max(5, delayMs);

    intervalRef.current = window.setInterval(() => {
      // Update elapsed time
      const now = Date.now();
      const delta = now - startTimeRef.current;
      setElapsedMs(accumulatedTimeRef.current + delta);

      setCurrentStepIndex((prevIndex) => {
        if (prevIndex < steps.length - 1) {
          const nextIndex = prevIndex + 1;
          const step = steps[nextIndex];

          // Sonify comparison/swap tones
          if (step.comparing.length > 0) {
            const val = step.array[step.comparing[0]];
            soundSynth.playTone(val, 10, 100, Math.min(30, interval));
          } else if (step.swapping.length > 0) {
            const val = step.array[step.swapping[0]];
            soundSynth.playTone(val, 10, 100, Math.min(35, interval), 'triangle');
          }

          return nextIndex;
        } else {
          // Finished sorting!
          setIsRunning(false);
          setIsPaused(false);
          accumulatedTimeRef.current += Date.now() - startTimeRef.current;
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          soundSynth.playFinishFanfare();
          return prevIndex;
        }
      });
    }, interval);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, isPaused, delayMs, steps]);

  // Handler: Start / Resume Playback
  const handlePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      // Loop or restart from step 0
      setCurrentStepIndex(0);
      setElapsedMs(0);
      accumulatedTimeRef.current = 0;
    }
    setIsPaused(false);
    setIsRunning(true);
  };

  // Handler: Pause
  const handlePause = () => {
    accumulatedTimeRef.current += Date.now() - startTimeRef.current;
    setIsPaused(true);
  };

  // Handler: Reset (back to step 0)
  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStepIndex(0);
    setElapsedMs(0);
    accumulatedTimeRef.current = 0;
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Handler: Step Backward
  const handleStepBack = () => {
    if (currentStepIndex > 0) {
      const target = currentStepIndex - 1;
      setCurrentStepIndex(target);
      const step = steps[target];
      if (step.comparing.length > 0) {
        soundSynth.playTone(step.array[step.comparing[0]], 10, 100, 25);
      }
    }
  };

  // Handler: Step Forward
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      const target = currentStepIndex + 1;
      setCurrentStepIndex(target);
      const step = steps[target];
      if (step.comparing.length > 0) {
        soundSynth.playTone(step.array[step.comparing[0]], 10, 100, 25);
      }
    }
  };

  // Handler: Scrub timeline
  const handleScrub = (index: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, index));
    setCurrentStepIndex(clamped);
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
  };

  // Handler: Generate New Array
  const handleGenerateArray = (customSize?: number, customDist?: ArrayDistribution) => {
    const size = customSize ?? arraySize;
    const dist = customDist ?? distribution;
    const newArr = generateArrayData(size, dist);
    setCurrentArray(newArr);
    regenerateSteps(newArr, algorithm);
  };

  // Handler: Change Algorithm
  const handleSelectAlgorithm = (algo: AlgorithmType) => {
    setAlgorithm(algo);
    regenerateSteps(currentArray, algo);
  };

  // Handler: Array Size change
  const handleChangeArraySize = (size: number) => {
    setArraySize(size);
    handleGenerateArray(size, distribution);
  };

  // Handler: Distribution change
  const handleChangeDistribution = (dist: ArrayDistribution) => {
    setDistribution(dist);
    handleGenerateArray(arraySize, dist);
  };

  // Handler: Custom Array Applied
  const handleApplyCustomArray = (newArr: number[]) => {
    setArraySize(newArr.length);
    setCurrentArray(newArr);
    regenerateSteps(newArr, algorithm);
  };

  const currentStep: SortStep = steps[currentStepIndex] || {
    array: currentArray,
    comparing: [],
    swapping: [],
    sortedIndices: [],
    pivotIndex: null,
    windowRange: null,
    description: `Ready. Select an algorithm and start.`,
    pseudoLine: 1,
    comparisons: 0,
    swaps: 0,
    accesses: 0,
  };

  const isCompleted = steps.length > 0 && currentStepIndex >= steps.length - 1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase">
                Sorting Algorithm Visualizer
              </h1>
              <p className="text-[11px] text-slate-400 font-mono">
                Interactive real-time execution engine & complexity benchmark
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline-block">Algorithm:</span>
            <span className="px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-800/80 text-blue-300 font-medium">
              {ALGORITHM_INFO[algorithm].name}
            </span>
            <span className="text-slate-600">·</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-300">
              N = {currentArray.length} items
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col gap-6 w-full">
        {/* Race Mode Arena OR Standard Visualizer */}
        {isRaceMode ? (
          <RaceComparison
            initialArray={currentArray}
            visualStyle={visualStyle}
            delayMs={delayMs}
            onClose={() => setIsRaceMode(false)}
          />
        ) : (
          <div className="flex flex-col gap-6">
            {/* Visualizer Canvas */}
            <VisualizerCanvas
              array={currentStep.array}
              comparing={currentStep.comparing}
              swapping={currentStep.swapping}
              sortedIndices={currentStep.sortedIndices}
              pivotIndex={currentStep.pivotIndex}
              windowRange={currentStep.windowRange}
              visualStyle={visualStyle}
              title={`${ALGORITHM_INFO[algorithm].name} Execution Canvas`}
              isCompleted={isCompleted}
            />

            {/* Metrics & Scrubbing Bar */}
            <StatsBar
              comparisons={currentStep.comparisons}
              swaps={currentStep.swaps}
              accesses={currentStep.accesses}
              elapsedMs={elapsedMs}
              currentStepIndex={currentStepIndex}
              totalSteps={steps.length}
              statusText={currentStep.description}
              onScrub={handleScrub}
              disabled={isRunning && !isPaused}
            />

            {/* Controls Panel */}
            <Controls
              algorithm={algorithm}
              onSelectAlgorithm={handleSelectAlgorithm}
              isRunning={isRunning}
              isPaused={isPaused}
              onPlay={handlePlay}
              onPause={handlePause}
              onReset={handleReset}
              onStepBack={handleStepBack}
              onStepForward={handleStepForward}
              onGenerateArray={() => handleGenerateArray()}
              arraySize={arraySize}
              onChangeArraySize={handleChangeArraySize}
              distribution={distribution}
              onChangeDistribution={handleChangeDistribution}
              delayMs={delayMs}
              onChangeDelayMs={setDelayMs}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled((prev) => !prev)}
              soundVolume={soundVolume}
              onChangeVolume={setSoundVolume}
              visualStyle={visualStyle}
              onChangeVisualStyle={setVisualStyle}
              onOpenCustomArray={() => setIsCustomModalOpen(true)}
              isRaceMode={isRaceMode}
              onToggleRaceMode={() => setIsRaceMode((prev) => !prev)}
              canStepBack={currentStepIndex > 0}
              canStepForward={currentStepIndex < steps.length - 1}
            />

            {/* Educational & Pseudocode Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PseudocodePanel
                algorithmInfo={ALGORITHM_INFO[algorithm]}
                activeLine={currentStep.pseudoLine}
              />
              <ComplexityCard algorithmInfo={ALGORITHM_INFO[algorithm]} />
            </div>
          </div>
        )}

        {/* Informational Guidance Callout */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-400 flex items-start gap-3">
          <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-slate-200">How to use this visualizer:</span>
            <p>
              Select any of the 6 core sorting algorithms from the top bar. Use the timeline slider to scrub backward and forward to inspect individual pointer movements and swaps. Adjust the speed delay slider to slow down the animation or increase it to ultra-fast mode. Click <span className="text-purple-300 font-medium">Race Mode</span> to benchmark two algorithms side-by-side with identical input arrays!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 bg-slate-950 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>Interactive Sorting Algorithm Visualizer</span>
          <div className="flex items-center gap-3">
            <span>Bubble</span>
            <span>·</span>
            <span>Selection</span>
            <span>·</span>
            <span>Insertion</span>
            <span>·</span>
            <span>Merge</span>
            <span>·</span>
            <span>Quick</span>
            <span>·</span>
            <span>Heap</span>
          </div>
        </div>
      </footer>

      {/* Custom Array Entry Modal */}
      <CustomArrayModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onApply={handleApplyCustomArray}
        currentArray={currentArray}
      />
    </div>
  );
}
