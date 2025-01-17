import { test as baseTest, expect as baseExpect } from "@playwright/test";
import SearchPage from "../pages/search.page";
import BasketPage from "../pages/basket.page";

type FixtureContext = {
  searchPage: SearchPage;
  basketPage: BasketPage;
};

export const test = baseTest.extend<FixtureContext>({
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  basketPage: async ({ page }, use) => {
    await use(new BasketPage(page));
  },
});

export const expect = baseExpect.extend({});
