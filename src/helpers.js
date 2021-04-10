export const sum = (...args) => args.reduce((a, c) => a + c, 0);

export const isMax = (arr) => {
  if (arr.some(i => typeof i !== 'number')) {
    return 'Invalid data';
  }

  return arr.reduce((a, c) => a > c ? a : c, 0)
}
