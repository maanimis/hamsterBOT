import config from "config";
import { sendTapRequest } from "./api.js";
import * as util from "./utils.js";

const data = { ...config.get("data") };
const refreshStatus = config.get("refreshStatus");
const hamsterAccounts = config.get("hamsterAccounts");

const Accounts = hamsterAccounts.map((account) => ({
  ...account,
  requests: 0,
  failed: 0,
  nextTimestamp: 0,
  tap: 0,
  balance: 0,
}));

setInterval(util.banner, refreshStatus, Accounts);

(async function main() {
  console.log(`\n[+]Running @${config.get("name")}...\n\n`);

  while (true) {
    for (const user of Accounts) {
      await util.sleep(0.5);
      const currentTime = Date.now();
      if (currentTime < user.nextTimestamp) continue;

      data.timestamp = currentTime;
      data.count = util.getRandomInt(10, 20);

      try {
        const response = await sendTapRequest({
          data: data,
          authHeader: user.auth,
        });
        const clickerUser = response.data.clickerUser;
        user.requests++;
        user.tap = data.count;
        user.balance = Math.floor(clickerUser.balanceCoins);
        user.nextTimestamp = util.genTimestamp(util.getRandomInt(1, 5));

        const availableTaps = Math.floor(clickerUser.availableTaps);
        const earnPerTap = Math.floor(clickerUser.earnPerTap);
        const earnPassivePerSec = Math.ceil(clickerUser.earnPassivePerSec);

        if (availableTaps <= 20 * earnPerTap) {
          const waitTime =
            Math.ceil((earnPerTap * 20) / earnPassivePerSec) +
            util.getRandomInt(1, 5);
          user.nextTimestamp = util.genTimestamp(waitTime);
        }
      } catch (error) {
        user.failed++;
        user.nextTimestamp = util.genTimestamp(util.getRandomInt(10, 15));
      }
    }

    await util.sleep(6);
  }
})();
