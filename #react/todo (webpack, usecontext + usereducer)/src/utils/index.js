export const addToLocalStorage = (lsName, lsData) => {
  localStorage.setItem(lsName, lsData);
};

export const stringTruncate = (string, maxlength) => {
  return string.length > maxlength ? string.slice(0, maxlength - 1) + "..." : string;
};
