import { test as baseTest, expect as baseExpect } from "@playwright/test";
import { faker } from "@faker-js/faker";

type FixtureContext = {
  useRandomEmail: (
    ...options: Parameters<typeof faker.internet.email>
  ) => string;
  useRandomPassword: () => string;
  useRandomInt: (...options: Parameters<typeof faker.number.int>) => number;
  useRandomUniqueArray: <const T>(
    source: readonly T[] | (() => T),
    length: number,
  ) => T[];
  /** faker instance */
  faker: typeof faker;
};

export const test = baseTest.extend<FixtureContext>({
  faker: async ({}, use) => {
    await use(faker);
  },
  useRandomEmail: async ({}, use) => {
    await use(faker.internet.email);
  },
  useRandomInt: async ({}, use) => {
    await use(faker.number.int);
  },
  useRandomUniqueArray: async ({}, use) => {
    await use(faker.helpers.uniqueArray);
  },
  // TODO: make it random
  useRandomPassword: async ({}, use) => {
    await use(() => {
      return "Qwe_qwe1";
    });
  },
});

export const expect = baseExpect.extend({});
