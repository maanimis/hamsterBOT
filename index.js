import axios from "axios";
// @BTC_USDT

const Authorization = "<YOUR_HEADER_VALUE>";

const Sleep = (ms) => new Promise((res) => setTimeout(res, ms));

let data = {
  count: 10,
  availableTaps: 1000,
  timestamp: 0,
};

function getRandomInt(min = 10, max = 20) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let counter = 0,
  temp;
console.log("\n[+]running...\n\n");
await Sleep(getRandomInt(3, 15) * 1000);
while (true) {
  temp = Date.now();
  data.timestamp = temp;
  data.count = getRandomInt();
  // data.availableTaps = data.count * 2 + 1;
  temp = await axios
    .post("https://api.hamsterkombat.io/clicker/tap", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization,
        Accept: "application/json",
        "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120"',
        "Sec-Ch-Ua-Mobile": "?0",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.199 Safari/537.36",
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
      ++counter;
      console.log(
        `[${counter}]taps: ${data.count} #balance>>>> ${parseInt(
          response.data.clickerUser.balanceCoins
        )}`
      );
      await Sleep(getRandomInt(1, 5) * 1000);
      return response.data;
    })
    .catch(async (error) => {
      console.log("Error:", error);
      return false;
    });

  if (!temp) {
    await Sleep(getRandomInt(10, 20) * 1000);
  } else if (
    parseInt(temp.clickerUser.availableTaps) <=
    20 * temp.clickerUser.earnPerTap
  ) {
    temp =
      Math.ceil(
        (temp.clickerUser.earnPerTap * 20) /
          Math.ceil(temp.clickerUser.earnPassivePerSec)
      ) + getRandomInt(3, 10);
    console.log(`[WAIT] ${temp}sec...`);
    await Sleep(temp * 1000);
    continue;
  }

  await Sleep(3000);
}
