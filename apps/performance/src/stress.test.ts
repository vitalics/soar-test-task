import { URLSearchParams } from "https://jslib.k6.io/url/1.0.0/index.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import type { Options } from "k6/options";

import http from "k6/http";
import { check, sleep } from "k6";

export const options: Options = {
  rps: 10,
  // iterations: 10, // local debug
  // vus: 1, // 1 for local debug
  stages: [
    { duration: "30s", target: 100 }, // Ramp up to 100 users over 30 seconds
    { duration: "1m", target: 100 }, // Hold 100 users for 1 minute
    { duration: "30s", target: 200 }, // Ramp up to 200 users over 30 seconds
    { duration: "1m", target: 200 }, // Hold 200 users for 1 minute
    { duration: "20s", target: 0 }, // Ramp down to 0 users
  ],
};

// TODO: move under ENV variables
const url = "http://localhost:5000/client_login";

const validSearchParams = new URLSearchParams([
  ["userName", "testuser"],
  ["email", "test@example.com"],
  ["password", "password123"],
]);

const invalidSearchParams = new URLSearchParams([
  ["userName", "qweqwe"],
  ["email", "qwe@qwe.com"],
  ["password", "asdqweasdqwe"],
]);

const params = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  const payload =
    randomIntBetween(0, 1) > 0
      ? validSearchParams.toString()
      : invalidSearchParams.toString();
  // Validate response
  const res = http.post(url, payload, { ...params });

  check(res, {
    // BUG here, should be not OK
    "Status is 200": (r) => r.status === 200,
    "Response contains success or failure message": (r) =>
      !!r.json("token")! || r.json("msg")! === "In correct email or password",
  });

  sleep(1);
}
