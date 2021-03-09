export const debounce = (func: Function, wait = 0, immediate = false) => {
  let timeout: ReturnType<typeof setTimeout>;
  let result: any;

  const later = (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    result = func(...args);
  };

  const debounced = (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow: boolean = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) {
        result = func(...args);
      }
    } else {
      timeout = setTimeout(later, wait);
    }
    return result;
  };

  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = 0;
  };

  return debounced;
};

export default debounce;
