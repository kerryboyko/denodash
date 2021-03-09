interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export const throttle = (
  func: Function,
  wait = 0,
  options: ThrottleOptions = { leading: true, trailing: true }
) => {
  let timeout: ReturnType<typeof setTimeout>;
  let result: any;
  let args: any[] = [];
  let previous = 0;

  const later = (): void => {
    previous = options.leading === false ? 0 : Date.now();
    timeout = 0;
    result = func(...args);
    if(!timeout){
      args = [];
    }
  };

  const throttled = (...currentArgs: any[]) => {
    const now = Date.now();
    if (!previous && options.leading === false){
      previous = now;
    } 
    let remaining = wait - (now - previous);
    args = currentArgs;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
      }
      previous = now;
      result = func(...currentArgs);
      if (!timeout) {
        args = []; 
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = () => {
    clearTimeout(timeout);
    previous = 0;
    args = [];
    timeout = 0;
  };

  return throttled;
};


export default throttle;