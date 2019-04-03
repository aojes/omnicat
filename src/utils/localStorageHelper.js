export const store = require("store");

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const get = key => {
  JSON.parse(localStorage.getItem(key));
};
const remove = key => {
  localStorage.removeItem(key);
};
const all = () => {
  JSON.stringify(localStorage);
};
const clear = () => {
  localStorage.clear();
};
const getset = (key, obj) => {
  let val = JSON.parse(localStorage.getItem(key));
  if (!val) {
    localStorage.setItem(key, JSON.stringify(obj));
    val = JSON.parse(localStorage.getItem(key));
  }
  return val;
};

export const mem = {
  getset: getset,
  getOrSet: getset,

  set: set,
  setItem: set,

  get: get,
  getItem: get,

  remove: remove,
  removeItem: remove,

  all: all,
  getAll: all,

  clear: clear,
  clearAll: clear
  // length: length
};
