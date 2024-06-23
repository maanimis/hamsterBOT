import axios from "axios";
import config from "config";

const headers = { ...config.get("headers") };

export async function sendTapRequest({ data, authHeader }) {
  headers["Authorization"] = authHeader;
  return axios.post(config.get("target"), data, { headers });
}
