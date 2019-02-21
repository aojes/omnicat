const mem = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),

  get: key => JSON.parse(localStorage.getItem(key)),
  getItem: key => JSON.parse(localStorage.getItem(key)),

  remove: key => localStorage.removeItem(key),
  removeItem: key => localStorage.removeItem(key),

  all: () =>  JSON.stringify(localStorage),
  getAll: () => JSON.stringify(localStorage),

  clear: () => localStorage.clear(),
  length: () => localStorage.length,

  getset: (key, obj) => {
    let val = JSON.parse(localStorage.getItem(key))
    if (!val) {
      localStorage.setItem(key, JSON.stringify(obj))
      val = JSON.parse(localStorage.getItem(key))
    }
    return val
  }
}


export default mem
