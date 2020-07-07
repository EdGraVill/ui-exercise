const randomBetween = (start: number, end: number) => {
  if (end < start) {
    throw new Error('Left number should be lower than right number');
  }

  return Math.floor(Math.random() * end) + start;
};

export default randomBetween;
