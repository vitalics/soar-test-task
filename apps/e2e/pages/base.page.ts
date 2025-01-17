import { Page } from "@playwright/test";

export default abstract class BasePage {
  abstract readonly url: string;

  constructor(protected readonly page: Page) {}

  async closeWelcomeBanner() {
    await this.page.getByLabel("Close Welcome Banner").click();
  }
}
