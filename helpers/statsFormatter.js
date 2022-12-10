export const statsFormatter = (num) => {
  const data = parseInt(num);
  if (data > 1000) {
    return `${(data / 1000).toFixed(1)}k`;
  }
  return `${data}`;
};
