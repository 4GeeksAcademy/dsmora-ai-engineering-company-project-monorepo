export type CompareFunction<T> = (left: T, right: T) => number;

export function linearSearch<T>(items: T[], predicate: (item: T, index: number) => boolean): number {
  if (items.length === 0) {
    return -1;
  }

  for (let index = 0; index < items.length; index += 1) {
    if (predicate(items[index], index)) {
      return index;
    }
  }

  return -1;
}

export function binarySearch<T>(items: T[], target: T, compare: CompareFunction<T>): number {
  if (items.length === 0) {
    return -1;
  }

  let low = 0;
  let high = items.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparison = compare(items[mid], target);

    if (comparison === 0) {
      return mid;
    }

    if (comparison < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

export function binarySearchBy<T, K>(
  items: T[],
  target: K,
  selector: (item: T) => K,
  compare: CompareFunction<K>
): number {
  if (items.length === 0) {
    return -1;
  }

  let low = 0;
  let high = items.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparison = compare(selector(items[mid]), target);

    if (comparison === 0) {
      return mid;
    }

    if (comparison < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}
