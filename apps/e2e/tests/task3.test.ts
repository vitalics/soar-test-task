import { test, expect } from "../fixtures/fixture";
import { type Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

type Register = {
  email: string;
  password: string;
};

test("Register form should have password valdiation", async ({
  page,
  // TBD: register page locators
  registerPage,
  useRandomEmail,
  useRandomPassword,
}) => {
  await page.goto(registerPage.url);
  await registerPage.closeWelcomeBanner();
  // fill all required inputs
  const email = useRandomEmail();
  const password = useRandomPassword();
  // password error message
  await page.getByLabel("Field for the password").fill("a");
  await page.getByLabel("Field to confirm the password").fill("a");
  expect(page.locator("mat-error")).toHaveText(
    "Password must be 5-40 characters long.",
  );
  expect(page.locator("#registerButton")).toBeDisabled();

  await registerPage.register({ email, password });

  await expect(page.locator("snack-bar-container")).toBeVisible();
  expect(page.url().endsWith("#/login")).toBeTruthy();
});
