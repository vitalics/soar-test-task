// src/forEach.ts
async function forEach(array, callback) {
  await Promise.all(array.map(callback));
}
export {
  forEach
};
