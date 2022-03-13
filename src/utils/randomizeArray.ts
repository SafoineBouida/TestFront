const randomizeArray = <T>(array: T[]): T[] => {
  const initial = array.slice();
  const randomized = [];
  while (initial.length) {
    const i = Math.floor(Math.random() * initial.length);
    randomized.push(initial[i]);
    initial.splice(i, 1);
  }
  return randomized;
};

export default randomizeArray;
