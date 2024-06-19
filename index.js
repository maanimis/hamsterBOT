import axios from "axios";

const Authorizations = [
  {
    name: "me",
    auth: "Bearer AAAAAAAAAAAAAAAAAAAAAAA",
    requests: 0,
    errors: 0,
    lastTimestamp: 0,
    nextTimestamp: 0,
    lastTap: 0,
    balance: 0,
  },
];

const Sleep = (s) => new Promise((res) => setTimeout(res, s * 1000));
let data = {
  count: 10,
  availableTaps: 10000,
  timestamp: 0,
};

function genTimestamp(waiter, init) {
  return (init && Date.now()) + waiter * 1000;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function banner() {
  let authorizationsCloned = structuredClone(Authorizations);
  authorizationsCloned.forEach((user) => {
    delete user.auth;
    delete user.lastTimestamp;
    delete user.nextTimestamp;
  });
  console.clear();
  console.table(authorizationsCloned);
}

setInterval(banner, 3_000);

let temp, Authorization, user;
console.log("\n[+]running...\n\n");
while (true) {
  for (user of Authorizations) {
    await Sleep(0.5);
    temp = Date.now();
    if (temp < user.nextTimestamp) continue;
    Authorization = user.auth;
    data.timestamp = temp;
    user.lastTimestamp = temp;
    data.count = getRandomInt(10, 20);
    // data.availableTaps = data.count * 2 + 1;
    temp = await axios
      .post("https://api.hamsterkombat.io/clicker/tap", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization,
          Accept: "application/json",
          "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120"',
          "Sec-Ch-Ua-Mobile": "?0",
          "User-Agent": "TelegramBot (like TwitterBot)",
          "Sec-Ch-Ua-Platform": '"Linux"',
          Origin: "https://hamsterkombat.io",
          "Sec-Fetch-Site": "same-site",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          Referer: "https://hamsterkombat.io/",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          Priority: "u=1, i",
          Connection: "close",
        },
      })
      .then(async (response) => {
        ++user.requests;
        user.lastTap = data.count;
        user.balance = Math.floor(response.data.clickerUser.balanceCoins);
        user.nextTimestamp = genTimestamp(
          getRandomInt(1, 5),
          user.nextTimestamp
        );
        return response.data;
      })
      .catch(async (error) => {
        ++user.errors;
        user.nextTimestamp = genTimestamp(
          getRandomInt(10, 15),
          user.nextTimestamp
        );
        // console.log(user.name, ">>>>>>Error:", error);
        return false;
      });

    if (
      temp &&
      Math.floor(temp.clickerUser.availableTaps) <=
        20 * temp.clickerUser.earnPerTap
    ) {
      temp =
        Math.ceil(
          (temp.clickerUser.earnPerTap * 20) /
            Math.ceil(temp.clickerUser.earnPassivePerSec)
        ) + getRandomInt(1, 5);
      user.nextTimestamp = genTimestamp(temp, user.nextTimestamp);
    }
  }
  await Sleep(6);
}
