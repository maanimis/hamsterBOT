export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function genTimestamp(waiter, init) {
  return (init && Date.now()) + waiter * 1000;
}

export function banner(info = []) {
  const result = [];
  info.forEach((i) => {
    result.push({
      Account: i.account,
      Requests: i.request,
      Failed: i.falied,
      Tap: i.tap,
      Balance: i.balance,
    });
  });
  console.clear();
  console.table(result);
}

export const sleep = (sec) => new Promise((res) => setTimeout(res, sec * 1000));
