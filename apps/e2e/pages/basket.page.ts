import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./base.page";

class BasketRowComponent {
  readonly rootLocator$: Locator;
  readonly img$: Locator;
  readonly name$: Locator;
  readonly controlDecrease$: Locator;
  readonly controlIncrease$: Locator;
  readonly controlQuantity$: Locator;
  readonly controlPrice$: Locator;
  readonly controlDelete$: Locator;

  constructor(rootLocator$: Locator) {
    this.rootLocator$ = rootLocator$;
    const cellLocator$ = rootLocator$.locator("mat-cell");
    this.img$ = cellLocator$.nth(0);
    this.name$ = cellLocator$.nth(1);
    this.controlDecrease$ = cellLocator$.nth(2).locator("button").first();
    this.controlIncrease$ = cellLocator$.nth(2).locator("button").last();
    this.controlQuantity$ = cellLocator$.nth(2).locator("span");
    this.controlPrice$ = cellLocator$.nth(3);
    this.controlDelete$ = cellLocator$.nth(4).locator("button");
  }

  async getQuantity() {
    const asText = await this.controlQuantity$.textContent();
    if (asText === null) {
      throw new TypeError("Cannot handle total price. Given text is null");
    }
    return Number.parseInt(asText);
  }

  async getPrice() {
    const asText = await this.controlPrice$.textContent();
    if (asText === null) {
      throw new TypeError("Cannot handle total price. Given text is null");
    }
    // todo add validation for parsing
    return Number.parseFloat(asText);
  }
}

export default class BasketPage extends BasePage {
  readonly url = "/#basket";

  private readonly price$ = this.page.locator("#price");

  async getTotalPrice() {
    const asText = await this.price$.textContent();
    if (asText === null) {
      throw new TypeError("Cannot handle total price. Given text is null");
    }
    const numericText = asText.split(" ").at(-1);
    if (!numericText) {
      throw new TypeError("Cannot handle total price.", {
        cause: {
          givenText: asText,
          splittedText: asText.split(" "),
          lastPieceText: asText.split(" ").at(-1),
        },
      });
    }
    const asFloat = Number.parseFloat(numericText);
    if (Number.isNaN(asFloat) || !Number.isFinite(asFloat)) {
      throw new TypeError("Cannot handle parsed text", {
        cause: {
          givenText: numericText,
          parsedText: asFloat,
          isFinite: Number.isFinite(asFloat),
          isNaN: Number.isNaN(asFloat),
        },
      });
    }
    return asFloat;
  }

  async increaseProductQuantity(id: number) {
    const rows$ = this.page.locator("mat-row");
    const basketFirstComponent = new BasketRowComponent(rows$.nth(id));

    const priceFirst = await this.getTotalPrice();
    const quantity = await basketFirstComponent.getPrice();
    const priceForProduct = await basketFirstComponent.getPrice();

    basketFirstComponent.controlIncrease$.click();

    const priceNext = await this.getTotalPrice();
    const newQuantity = basketFirstComponent.getQuantity();

    expect(newQuantity).toBe(quantity + 1);
    expect(priceFirst + priceForProduct, {
      message: "total basket price should be increased correctly",
    }).toBe(priceNext); // TODO: toBeCloseTo due to possible mantissa
  }

  async deleteProductFromBasket(id: number) {
    const rows$ = this.page.locator("mat-row");
    const basketFirstComponent = new BasketRowComponent(rows$.nth(id));

    const priceFirst = await this.getTotalPrice();
    const quantity = await basketFirstComponent.getPrice();
    const priceForProduct = await basketFirstComponent.getPrice();
    const totalProductPrice = priceForProduct * quantity;

    await basketFirstComponent.controlDelete$.click();

    const priceNext = await this.getTotalPrice();
    expect(priceFirst - totalProductPrice, {
      message: "total basket price should be decreased correctly",
    }).toBe(priceNext); // TODO: toBeCloseTo due to possible mantissa
  }
}
