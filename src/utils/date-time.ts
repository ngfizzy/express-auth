export const minsToMs = (mins: number) => {
  return mins * 60 * 1000;
};

export const minsIntoFuture = (mins: number) => {
  const now = new Date();
  return new Date(now.getTime() + minsToMs(mins));
};
