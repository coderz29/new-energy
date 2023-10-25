// 节流函数
export const myThrottle = function (fn, dep) {
  let initTime = 0;
  return function (...args) {
    let nowTime = Date.now();
    let waiteTime = dep - (nowTime - initTime);
    if (waiteTime <= 0) {
      fn.apply(this, args);
      initTime = nowTime;
    }
  };
};
