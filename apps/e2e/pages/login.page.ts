import test, { expect } from "@playwright/test";
import BasePage from "./base.page";

type Credentials = {
  email: string;
  password: string;
};

export default class LoginPage extends BasePage {
  readonly url = "#/login";

  // TBD: typescript decorator
  // @step("register new user")
  async login({ email, password }: Credentials) {
    await test.step("login user", async () => {
      // TODO: make common method: e.g. assertPage or checkInteractible
      expect(this.page.url().endsWith(this.url), {
        message: `current URL should end with ${this.url} to interact with page`,
      }).toBeTruthy();

      await this.page.getByLabel("Text field for the login email").fill(email);
      await this.page
        .getByLabel("Text field for the login password")
        .fill(password);

      const loginButton$ = this.page.getByLabel("Login", { exact: true });

      expect(loginButton$).toBeEnabled();
      await loginButton$.click();
    });
  }
}
