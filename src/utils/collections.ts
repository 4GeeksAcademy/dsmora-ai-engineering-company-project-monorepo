import { binarySearch, CompareFunction, linearSearch } from "./search";

export function filterCollection<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export function sortCollection<T>(items: T[], compare: CompareFunction<T>): T[] {
  return [...items].sort(compare);
}

export function findFirstLinear<T>(items: T[], predicate: (item: T, index: number) => boolean): T | undefined {
  const index = linearSearch(items, predicate);
  return index === -1 ? undefined : items[index];
}

export function findInSortedCollection<T>(items: T[], target: T, compare: CompareFunction<T>): T | undefined {
  const index = binarySearch(items, target, compare);
  return index === -1 ? undefined : items[index];
}

export function groupCollectionBy<T, K extends string | number>(
  items: T[],
  keySelector: (item: T) => K
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = String(keySelector(item));

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
    return groups;
  }, {});
}
