import test, { expect } from "@playwright/test";
import BasePage from "./base.page";

export default class SearchPage extends BasePage {
  readonly url: "#/search";

  async placeItemIntoBasket(id: number) {
    await test.step(`place one item into basket with id: ${id}`, async () => {
      expect(id > 0, { message: "id should be positive" }).toBeTruthy();
      expect(parseInt(String(id)) === id, {
        message: "id should be an integer",
      }).toBeTruthy();

      const cardItem$ = this.page.locator("mat-card");
      const cardItemCount = await cardItem$.count();

      await this.page.pause();
      expect(id, {
        message: `id(${id}) should be less than card item count(${cardItemCount}) presented on the page`,
      }).toBeLessThan(cardItemCount);

      const selectedCardItem$ = cardItem$.nth(id);
      const itemName = await selectedCardItem$
        .locator(".item-name")
        .textContent();

      selectedCardItem$.getByLabel("Add to Basket").click();
      expect(this.page.locator("simple-snack-bar"), {
        message: "text should be presented into snackbar",
      }).toHaveText(`Placed ${itemName} into basket.`);
    });
  }

  async gotoBasket() {
    await this.page.getByLabel("Show the shopping cart").click();
  }
}
