import test, { expect } from "@playwright/test";
import BasePage from "./base.page";

type Credentials = {
  email: string;
  password: string;
};

export default class RegisterPage extends BasePage {
  readonly url = "#/register";

  // TBD: typescript decorator
  // @step("register new user")
  async register({ email, password }: Credentials) {
    await test.step("register new user", async () => {
      expect(this.page.url().endsWith(this.url), {
        message: `current URL should end with ${this.url} to interact with page`,
      }).toBeTruthy();

      await this.page.getByLabel("Email address field").fill(email);
      await this.page.getByLabel("Field for the password").fill(password);
      await this.page
        .getByLabel("Field to confirm the password")
        .fill(password);

      // secret question. Note: it uses divs.
      await this.page.locator("mat-select[name='securityQuestion']").click();
      await this.page.getByText("Your eldest siblings middle").click();
      await this.page.getByPlaceholder("Answer to your security").fill("q");

      // expand checks
      await this.page.locator("mat-slide-toggle").click();
      // assert checks
      const checksRoot$ = this.page.locator(
        "mat-password-strength-info mat-card-content",
      );
      expect(checksRoot$.getByText("done")).toHaveCount(5);
      await this.page.locator("#registerButton").click();
    });
  }
}
