import http from "k6/http";
import { URLSearchParams } from "https://jslib.k6.io/url/1.0.0/index.js";

// need for BDD. See https://github.com/grafana/k6-jslib-k6chaijs/issues/16#issuecomment-2240975021
import "./global.js";

import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import type { Options } from "k6/options";

export const options: Options = {
  duration: "30s",
  vus: 1,
  iterations: 10,
  thresholds: {
    checks: ["rate == 1.00"],
  },
};

const BASE_URL = "http://127.0.0.1:5000";

const PARAMS = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export default function () {
  describe("Registration functionality", () => {
    const url = BASE_URL + "/client_login";
    describe("valid request", () => {
      const validSearchParams = new URLSearchParams([
        ["userName", "testuser"],
        ["email", "test@example.com"],
        ["password", "password123"],
      ]);

      const response = http.post(url, validSearchParams.toString(), PARAMS);

      expect(response.status, "response status is 200").to.equal(200);
      expect(
        response.json("token"),
        'response "token" field should be defined',
      ).to.be.a("string");
    });

    describe("invalid request", () => {
      const invalidSearchParams = new URLSearchParams([
        ["userName", "qweqwe"],
        ["email", "qwe@qwe.com"],
        ["password", "asdqweasdqwe"],
      ]);

      const response = http.post(url, invalidSearchParams.toString(), PARAMS);

      expect(response.status, "response status is 200").to.equal(200);
      expect(
        response.json("msg"),
        "response should be an error with message",
      ).to.equal("In correct email or password");
    });
  });

  describe("Login functionality", () => {
    const url = BASE_URL + "/client_registeration";
    const searchParams = new URLSearchParams([
      ["fullName", "Test User"],
      ["userName", "testuser"],
      ["email", "test@example.com"],
      ["password", "password123"],
      ["phone", "1234567890"],
    ]);

    const response = http.post(url, searchParams.toString(), PARAMS);

    expect(response.status, "response status").to.equal(200);
    expect(response).to.have.validJsonBody();
  });
}
