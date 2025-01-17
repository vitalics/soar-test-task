import { URL, URLSearchParams } from "https://jslib.k6.io/url/1.0.0/index.js";
import type { Options } from "k6/options";

import http from "k6/http";
import { check, sleep } from "k6";

export const options: Options = {
  rps: 10,
  // vus: 1, // 1 for local debug
  stages: [
    { duration: "30s", target: 50 }, // Ramp up to 50 users over 30 seconds
    { duration: "1m", target: 50 }, // Hold 50 users for 1 minute
    { duration: "20s", target: 0 }, // Ramp down to 0 users
  ],
};

// TODO: move under ENV variables
const url = "http://localhost:5000/client_registeration";

const searchParams = new URLSearchParams([
  ["fullName", "Test User"],
  ["userName", "testuser"],
  ["email", "test@example.com"],
  ["password", "password123"],
  ["phone", "1234567890"],
]);

const params = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  const res = http.post(url, searchParams.toString(), params);

  // Validate response
  check(res, {
    "Status is 200": (r) => r.status === 200,
    "Response time < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
