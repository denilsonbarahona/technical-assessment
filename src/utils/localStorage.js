export const saveLocalStorage = (item, content) => {
  localStorage.setItem(item, content);
};

export const getLocalStorage = (item) => localStorage.getItem(item);
