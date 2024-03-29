export const compareArrays = (array1, array2) => {
  if (array1.length !== array2.length) return false;
  const neww = (object) => JSON.stringify(
    Object.keys(object)
      .sort()
      .map((key) => [key, object[key]]),
  );
  array1 = new Set(array1.map(neww));
  return array2.every((object) => array1.has(neww(object)));
};

export const filterArray = (array, property) => array
  .filter((item) => item.name === property)
  .map((s) => s.value);

export const removeDuplicates = (array) => [...new Set(array)];

export const randomize = (array) => [...array].sort(() => 0.5 - Math.random());
