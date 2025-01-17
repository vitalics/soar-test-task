import { test, expect } from "@playwright/test";
import { setTimeout } from "node:timers/promises";

test("Product item popup should be visible", async ({ page }) => {
  await page.goto("http://localhost:3000/#/");
  await page.getByLabel("Close Welcome Banner").click();
  const firstItem$ = page.locator("mat-card").nth(0);
  await firstItem$.click();
  const dialog$ = page.locator("#mat-dialog-1");
  expect(dialog$.getByRole("img")).toBeVisible();
  // expand reviews
  await dialog$.getByRole("button", { name: /Reviews/ }).click();
  // wait 2 seconds
  await setTimeout(2_000);
  await page.getByLabel("Close Dialog").click();
});
