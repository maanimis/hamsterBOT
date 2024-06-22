export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function genTimestamp(waiter, init) {
  return (init && Date.now()) + waiter * 1000;
}

export function banner(accounts = []) {
  const info = [...accounts];
  const result = [];

  info.forEach((i) => {
    result.push({
      Account: i.account,
      Requests: i.request || 0,
      Failed: i.failed || 0,
      Tap: i.tap || 0,
      Balance: i.balance || 0,
    });
  });

  console.clear();
  console.table(result);
}

export const sleep = (sec) => new Promise((res) => setTimeout(res, sec * 1000));
