export const getTeam = (url: string) => {
  const match = url.match(/(\w+).esa.io/);
  return match ? match[1] : null;
};
