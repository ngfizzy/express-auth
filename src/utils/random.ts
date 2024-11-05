export const getNumericStr = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};
