export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const genTimestamp = (seconds, baseTimestamp = Date.now()) =>
  baseTimestamp + seconds * 1000;

export const sleep = (sec) => new Promise((res) => setTimeout(res, sec * 1000));

export function banner(accounts = []) {
  const result = [];

  accounts.forEach((i) => {
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
