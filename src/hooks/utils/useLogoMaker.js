export const useLogoMaker = () => {
  const getFirstLetters = (name) => {
    const arr = name.split(" ");
    let s = "";
    for (const x of arr) {
      s += x[0];
    }
    return s.substring(0, Math.min(2, s.length)).toUpperCase();
  };

  return { getFirstLetters };
};
