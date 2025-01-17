import { test as baseTest, expect as baseExpect } from "@playwright/test";
import RegisterPage from "../pages/register.page";
import LoginPage from "../pages/login.page";

type FixtureContext = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
};

export const test = baseTest.extend<FixtureContext>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export const expect = baseExpect.extend({});
