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
      Requests: i.requests,
      Failed: i.failed,
      Tap: i.tap,
      Balance: i.balance,
    });
  });

  console.clear();
  console.table(result);
}

export const sleep = (sec) => new Promise((res) => setTimeout(res, sec * 1000));
