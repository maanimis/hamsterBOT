import axios from "axios";
import config from "config";

export async function sendTapRequest({ data, authHeader }) {
  const headers = { ...config.get("headers") };
  headers["Authorization"] = authHeader;
  return axios.post("https://api.hamsterkombat.io/clicker/tap", data, headers);
}
