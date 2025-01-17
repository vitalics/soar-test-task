type Callback<T> = (item: T, index: number, array: readonly T[]) => Promise<void>;
/**
 * Iterates over each element of an array asynchronously and executes the provided callback function.
 *
 * @template T
 * @param {T[]} array - The array to iterate over.
 * @param {(element: T, index: number, array: T[]) => Promise<void>} callback -
 *   An asynchronous function to execute for each element. Receives the current element, its index,
 *   and the array being iterated.
 * @returns {Promise<void>} A promise that resolves when all callbacks have been executed.
 *
 * @example
 * async function asyncTask(item) {
 *   return new Promise(resolve => setTimeout(() => {
 *     console.log(item);
 *     resolve();
 *   }, 1000));
 * }
 *
 * async function main() {
 *   await asyncForEach([1, 2, 3], async (item) => {
 *     await asyncTask(item);
 *   });
 *   console.log('Done');
 * }
 *
 * main();
 */
declare function forEach<const T>(array: T[] | readonly T[], callback: Callback<T>): Promise<void>;

export { forEach };
