import { test, expect } from "@playwright/test";

test("Card items count should be 37 after extend 'Items per page' to 48", async ({
  page,
  baseURL,
}) => {
  await page.goto(baseURL!);
  await page.getByLabel("Close Welcome Banner").click();
  await page.getByLabel("dismiss cookie message").click();
  const byPageItems$ = page.locator("#mat-select-value-1");
  await expect(byPageItems$).toHaveText("12");
  byPageItems$.click();

  await page.getByText("48").click();

  await expect(byPageItems$).toHaveText("48");
  await expect(page.locator("mat-card")).toHaveCount(37);
});
