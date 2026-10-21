import { AlgorithmInfo, AlgorithmType, ArrayDistribution, SortStep } from '../types/sorting';

export const ALGORITHM_INFO: Record<AlgorithmType, AlgorithmInfo> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    timeBest: 'O(n)',
    timeAvg: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    inPlace: true,
    category: 'Exchanging',
    description:
      'Iteratively steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Larger elements bubble up to the end of the array on each pass.',
    pseudocode: [
      { line: 1, code: 'procedure bubbleSort(A : list of sortable items)', indent: 0 },
      { line: 2, code: 'n = length(A)', indent: 1 },
      { line: 3, code: 'for i = 0 to n - 1 do', indent: 1 },
      { line: 4, code: 'for j = 0 to n - i - 2 do', indent: 2 },
      { line: 5, code: 'if A[j] > A[j + 1] then', indent: 3 },
      { line: 6, code: 'swap(A[j], A[j + 1])', indent: 4 },
      { line: 7, code: 'mark A[n - 1 - i] as sorted', indent: 2 },
    ],
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    timeBest: 'O(n²)',
    timeAvg: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: false,
    inPlace: true,
    category: 'Selection',
    description:
      'Divides the input list into a sorted sublist and an unsorted sublist. Repeatedly scans the unsorted sublist to find the smallest element, then swaps it to the front.',
    pseudocode: [
      { line: 1, code: 'procedure selectionSort(A : list of items)', indent: 0 },
      { line: 2, code: 'for i = 0 to n - 2 do', indent: 1 },
      { line: 3, code: 'min_idx = i', indent: 2 },
      { line: 4, code: 'for j = i + 1 to n - 1 do', indent: 2 },
      { line: 5, code: 'if A[j] < A[min_idx] then min_idx = j', indent: 3 },
      { line: 6, code: 'if min_idx != i then swap(A[i], A[min_idx])', indent: 2 },
      { line: 7, code: 'mark A[i] as sorted', indent: 2 },
    ],
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    timeBest: 'O(n)',
    timeAvg: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    inPlace: true,
    category: 'Insertion',
    description:
      'Builds the sorted array one element at a time by picking each element and shifting larger preceding elements to the right until the correct insertion position is reached.',
    pseudocode: [
      { line: 1, code: 'procedure insertionSort(A : list of items)', indent: 0 },
      { line: 2, code: 'for i = 1 to n - 1 do', indent: 1 },
      { line: 3, code: 'key = A[i], j = i - 1', indent: 2 },
      { line: 4, code: 'while j >= 0 and A[j] > key do', indent: 2 },
      { line: 5, code: 'A[j + 1] = A[j]', indent: 3 },
      { line: 6, code: 'j = j - 1', indent: 3 },
      { line: 7, code: 'A[j + 1] = key', indent: 2 },
    ],
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    timeBest: 'O(n log n)',
    timeAvg: 'O(n log n)',
    timeWorst: 'O(n log n)',
    space: 'O(n)',
    stable: true,
    inPlace: false,
    category: 'Divide & Conquer',
    description:
      'A divide-and-conquer algorithm that recursively splits the array into two halves until single-element arrays remain, then merges sorted halves back together in sorted order.',
    pseudocode: [
      { line: 1, code: 'procedure mergeSort(A, left, right)', indent: 0 },
      { line: 2, code: 'if left < right then', indent: 1 },
      { line: 3, code: 'mid = (left + right) / 2', indent: 2 },
      { line: 4, code: 'mergeSort(A, left, mid)', indent: 2 },
      { line: 5, code: 'mergeSort(A, mid + 1, right)', indent: 2 },
      { line: 6, code: 'merge(A, left, mid, right)', indent: 2 },
    ],
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    timeBest: 'O(n log n)',
    timeAvg: 'O(n log n)',
    timeWorst: 'O(n²)',
    space: 'O(log n)',
    stable: false,
    inPlace: true,
    category: 'Partitioning',
    description:
      'Picks a pivot element and partitions the array such that all items smaller than the pivot move left and items greater move right, then recursively sorts the sub-partitions.',
    pseudocode: [
      { line: 1, code: 'procedure quickSort(A, low, high)', indent: 0 },
      { line: 2, code: 'if low < high then', indent: 1 },
      { line: 3, code: 'pivot = A[high], pIndex = low', indent: 2 },
      { line: 4, code: 'for j = low to high - 1 do', indent: 2 },
      { line: 5, code: 'if A[j] <= pivot then swap(A[i], A[j])', indent: 3 },
      { line: 6, code: 'swap(A[pIndex], A[high])', indent: 2 },
      { line: 7, code: 'quickSort(low, pIndex - 1); quickSort(pIndex + 1, high)', indent: 2 },
    ],
  },
  heap: {
    id: 'heap',
    name: 'Heap Sort',
    timeBest: 'O(n log n)',
    timeAvg: 'O(n log n)',
    timeWorst: 'O(n log n)',
    space: 'O(1)',
    stable: false,
    inPlace: true,
    category: 'Selection / Tree',
    description:
      'Transforms the array into a Binary Max Heap where the root is the largest element. Repeatedly swaps the root with the last element and heapifies the reduced heap.',
    pseudocode: [
      { line: 1, code: 'procedure heapSort(A : list of items)', indent: 0 },
      { line: 2, code: 'buildMaxHeap(A)', indent: 1 },
      { line: 3, code: 'for i = n - 1 down to 1 do', indent: 1 },
      { line: 4, code: 'swap(A[0], A[i])', indent: 2 },
      { line: 5, code: 'mark A[i] as sorted', indent: 2 },
      { line: 6, code: 'siftDown(A, 0, i)', indent: 2 },
    ],
  },
};

export function generateArrayData(size: number, distribution: ArrayDistribution): number[] {
  const minVal = 10;
  const maxVal = 100;
  const arr: number[] = [];

  switch (distribution) {
    case 'reversed': {
      // strictly decreasing
      for (let i = 0; i < size; i++) {
        const val = Math.round(maxVal - (i / (size - 1 || 1)) * (maxVal - minVal));
        arr.push(val);
      }
      break;
    }
    case 'nearlySorted': {
      // ascending with ~8% random swaps
      for (let i = 0; i < size; i++) {
        const val = Math.round(minVal + (i / (size - 1 || 1)) * (maxVal - minVal));
        arr.push(val);
      }
      const swapCount = Math.max(1, Math.floor(size * 0.08));
      for (let s = 0; s < swapCount; s++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.min(size - 1, idx1 + Math.floor(Math.random() * 5) - 2);
        if (idx2 >= 0 && idx2 < size) {
          [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
        }
      }
      break;
    }
    case 'fewUnique': {
      // Dutch national flag style: only 4-5 unique heights
      const uniqueVals = [15, 35, 55, 75, 95];
      for (let i = 0; i < size; i++) {
        arr.push(uniqueVals[Math.floor(Math.random() * uniqueVals.length)]);
      }
      break;
    }
    case 'random':
    default: {
      for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
      }
      break;
    }
  }

  return arr;
}

/**
 * Generate all sorting execution steps ahead of time.
 * This allows instant scrubbing, forward/backward stepping, and 60fps playback.
 */
export function generateSortSteps(initialArray: number[], algorithm: AlgorithmType): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;
  const sortedSet = new Set<number>();

  const pushStep = (params: {
    comparing?: number[];
    swapping?: number[];
    pivotIndex?: number | null;
    windowRange?: [number, number] | null;
    description: string;
    pseudoLine: number;
  }) => {
    steps.push({
      array: [...arr],
      comparing: params.comparing || [],
      swapping: params.swapping || [],
      sortedIndices: Array.from(sortedSet),
      pivotIndex: params.pivotIndex ?? null,
      windowRange: params.windowRange ?? null,
      description: params.description,
      pseudoLine: params.pseudoLine,
      comparisons,
      swaps,
      accesses,
    });
  };

  // Initial step
  pushStep({
    description: `Ready to start ${ALGORITHM_INFO[algorithm].name}. Array size: ${n}.`,
    pseudoLine: 1,
  });

  if (algorithm === 'bubble') {
    for (let i = 0; i < n; i++) {
      let swappedInPass = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        accesses += 2;
        pushStep({
          comparing: [j, j + 1],
          description: `Comparing elements at index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]}).`,
          pseudoLine: 5,
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps++;
          accesses += 4;
          swappedInPass = true;
          pushStep({
            swapping: [j, j + 1],
            description: `Swapped ${arr[j + 1]} and ${arr[j]} since ${arr[j + 1]} > ${arr[j]}.`,
            pseudoLine: 6,
          });
        }
      }
      sortedSet.add(n - i - 1);
      pushStep({
        description: `Element at index ${n - i - 1} (${arr[n - i - 1]}) is now in sorted position.`,
        pseudoLine: 7,
      });

      // Early exit if no swaps occurred (optimized bubble sort)
      if (!swappedInPass && i < n - 1) {
        for (let k = 0; k < n - i - 1; k++) {
          sortedSet.add(k);
        }
        pushStep({
          description: `No swaps occurred in this pass. Array is fully sorted!`,
          pseudoLine: 7,
        });
        break;
      }
    }
  } else if (algorithm === 'selection') {
    for (let i = 0; i < n; i++) {
      let minIdx = i;
      pushStep({
        comparing: [i],
        description: `Searching for the minimum element starting from index ${i} (current candidate: ${arr[i]}).`,
        pseudoLine: 3,
      });

      for (let j = i + 1; j < n; j++) {
        comparisons++;
        accesses += 2;
        pushStep({
          comparing: [minIdx, j],
          description: `Comparing candidate min (${arr[minIdx]} at ${minIdx}) with element (${arr[j]} at ${j}).`,
          pseudoLine: 5,
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          pushStep({
            comparing: [minIdx],
            description: `Found new minimum candidate: ${arr[minIdx]} at index ${minIdx}.`,
            pseudoLine: 5,
          });
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        accesses += 4;
        pushStep({
          swapping: [i, minIdx],
          description: `Swapped minimum element ${arr[i]} into position ${i}.`,
          pseudoLine: 6,
        });
      }
      sortedSet.add(i);
      pushStep({
        description: `Element at index ${i} (${arr[i]}) is sorted.`,
        pseudoLine: 7,
      });
    }
  } else if (algorithm === 'insertion') {
    sortedSet.add(0);
    pushStep({
      description: `First element (${arr[0]}) is trivially sorted.`,
      pseudoLine: 2,
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      accesses++;
      let j = i - 1;

      pushStep({
        comparing: [i],
        description: `Picked key element ${key} at index ${i} to insert into sorted prefix.`,
        pseudoLine: 3,
      });

      while (j >= 0) {
        comparisons++;
        accesses++;
        pushStep({
          comparing: [j, j + 1],
          description: `Comparing prefix element ${arr[j]} at index ${j} with key ${key}.`,
          pseudoLine: 4,
        });

        if (arr[j] > key) {
          arr[j + 1] = arr[j];
          swaps++;
          accesses += 2;
          pushStep({
            swapping: [j, j + 1],
            description: `Shifted ${arr[j]} right from index ${j} to ${j + 1}.`,
            pseudoLine: 5,
          });
          j--;
        } else {
          break;
        }
      }

      arr[j + 1] = key;
      accesses++;
      for (let k = 0; k <= i; k++) {
        sortedSet.add(k);
      }
      pushStep({
        swapping: [j + 1],
        description: `Inserted key ${key} into final position ${j + 1}.`,
        pseudoLine: 7,
      });
    }
  } else if (algorithm === 'merge') {
    const merge = (start: number, mid: number, end: number) => {
      const leftPart = arr.slice(start, mid + 1);
      const rightPart = arr.slice(mid + 1, end + 1);
      accesses += end - start + 1;

      let i = 0;
      let j = 0;
      let k = start;

      while (i < leftPart.length && j < rightPart.length) {
        comparisons++;
        accesses += 2;
        pushStep({
          comparing: [start + i, mid + 1 + j],
          windowRange: [start, end],
          description: `Comparing left element ${leftPart[i]} with right element ${rightPart[j]}.`,
          pseudoLine: 6,
        });

        if (leftPart[i] <= rightPart[j]) {
          arr[k] = leftPart[i];
          i++;
        } else {
          arr[k] = rightPart[j];
          j++;
        }
        swaps++;
        accesses++;
        pushStep({
          swapping: [k],
          windowRange: [start, end],
          description: `Placed ${arr[k]} into position ${k} in the merged subarray.`,
          pseudoLine: 6,
        });
        k++;
      }

      while (i < leftPart.length) {
        arr[k] = leftPart[i];
        i++;
        swaps++;
        accesses++;
        pushStep({
          swapping: [k],
          windowRange: [start, end],
          description: `Flushed remaining left element ${arr[k]} to index ${k}.`,
          pseudoLine: 6,
        });
        k++;
      }

      while (j < rightPart.length) {
        arr[k] = rightPart[j];
        j++;
        swaps++;
        accesses++;
        pushStep({
          swapping: [k],
          windowRange: [start, end],
          description: `Flushed remaining right element ${arr[k]} to index ${k}.`,
          pseudoLine: 6,
        });
        k++;
      }

      if (start === 0 && end === n - 1) {
        for (let idx = 0; idx < n; idx++) {
          sortedSet.add(idx);
        }
      }
    };

    const divideAndSort = (start: number, end: number) => {
      if (start >= end) return;
      const mid = Math.floor((start + end) / 2);

      pushStep({
        windowRange: [start, end],
        description: `Dividing range [${start}..${end}] at midpoint ${mid}.`,
        pseudoLine: 3,
      });

      divideAndSort(start, mid);
      divideAndSort(mid + 1, end);
      merge(start, mid, end);
    };

    divideAndSort(0, n - 1);
  } else if (algorithm === 'quick') {
    const partition = (low: number, high: number): number => {
      const pivot = arr[high];
      accesses++;
      let i = low - 1;

      pushStep({
        pivotIndex: high,
        windowRange: [low, high],
        description: `Chosen pivot element: ${pivot} at index ${high}. Partitioning subarray [${low}..${high}].`,
        pseudoLine: 3,
      });

      for (let j = low; j < high; j++) {
        comparisons++;
        accesses++;
        pushStep({
          comparing: [j, high],
          pivotIndex: high,
          windowRange: [low, high],
          description: `Comparing element at ${j} (${arr[j]}) with pivot (${pivot}).`,
          pseudoLine: 5,
        });

        if (arr[j] <= pivot) {
          i++;
          if (i !== j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            swaps++;
            accesses += 4;
            pushStep({
              swapping: [i, j],
              pivotIndex: high,
              windowRange: [low, high],
              description: `Swapped ${arr[i]} and ${arr[j]} into left partition.`,
              pseudoLine: 5,
            });
          }
        }
      }

      if (i + 1 !== high) {
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swaps++;
        accesses += 4;
      }
      sortedSet.add(i + 1);

      pushStep({
        swapping: [i + 1, high],
        pivotIndex: i + 1,
        windowRange: [low, high],
        description: `Placed pivot ${arr[i + 1]} into its sorted partition index ${i + 1}.`,
        pseudoLine: 6,
      });

      return i + 1;
    };

    const quickSortHelper = (low: number, high: number) => {
      if (low < high) {
        const pIndex = partition(low, high);
        quickSortHelper(low, pIndex - 1);
        quickSortHelper(pIndex + 1, high);
      } else if (low === high) {
        sortedSet.add(low);
      }
    };

    quickSortHelper(0, n - 1);
  } else if (algorithm === 'heap') {
    const siftDown = (start: number, end: number) => {
      let root = start;

      while (root * 2 + 1 <= end) {
        let child = root * 2 + 1;
        let swapIdx = root;

        comparisons++;
        accesses += 2;
        pushStep({
          comparing: [swapIdx, child],
          description: `Checking heap property between parent ${arr[swapIdx]} and left child ${arr[child]}.`,
          pseudoLine: 6,
        });

        if (arr[swapIdx] < arr[child]) {
          swapIdx = child;
        }

        if (child + 1 <= end) {
          comparisons++;
          accesses += 2;
          pushStep({
            comparing: [swapIdx, child + 1],
            description: `Checking right child ${arr[child + 1]} against max child/parent.`,
            pseudoLine: 6,
          });
          if (arr[swapIdx] < arr[child + 1]) {
            swapIdx = child + 1;
          }
        }

        if (swapIdx === root) {
          return;
        } else {
          [arr[root], arr[swapIdx]] = [arr[swapIdx], arr[root]];
          swaps++;
          accesses += 4;
          pushStep({
            swapping: [root, swapIdx],
            description: `Sifted down ${arr[swapIdx]} and swapped with ${arr[root]}.`,
            pseudoLine: 6,
          });
          root = swapIdx;
        }
      }
    };

    // Build Max-Heap
    pushStep({
      description: 'Building max-heap from input array.',
      pseudoLine: 2,
    });
    for (let start = Math.floor((n - 2) / 2); start >= 0; start--) {
      siftDown(start, n - 1);
    }

    // Extract maximums
    for (let end = n - 1; end > 0; end--) {
      [arr[0], arr[end]] = [arr[end], arr[0]];
      swaps++;
      accesses += 4;
      sortedSet.add(end);
      pushStep({
        swapping: [0, end],
        description: `Extracted max element ${arr[end]} to index ${end}.`,
        pseudoLine: 4,
      });

      siftDown(0, end - 1);
    }
    sortedSet.add(0);
  }

  // Final completion step: mark every element as sorted
  for (let i = 0; i < n; i++) {
    sortedSet.add(i);
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sortedIndices: Array.from(sortedSet),
    pivotIndex: null,
    windowRange: null,
    description: `Sorting completed! Total comparisons: ${comparisons}, swaps: ${swaps}.`,
    pseudoLine: 1,
    comparisons,
    swaps,
    accesses,
  });

  return steps;
}
