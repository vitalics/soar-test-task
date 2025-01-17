import { test } from "../fixtures/fixture";

import { forEach } from "@soar/promise";

test("Basket should works", async ({
  page,
  registerPage,
  loginPage,
  searchPage,
  basketPage,
  useRandomEmail,
  useRandomInt,
  useRandomPassword,
  useRandomUniqueArray,
}) => {
  await page.goto(registerPage.url);
  await registerPage.closeWelcomeBanner();

  const email = useRandomEmail();
  const password = useRandomPassword();

  await registerPage.register({
    email,
    password,
  });

  await page.goto(loginPage.url);
  await loginPage.login({ email, password });

  const arrayOf50 = [...Array(40)].map(() => useRandomInt({ min: 0, max: 12 }));
  // random item IDs
  const randomUniqueIds = useRandomUniqueArray(arrayOf50, 5);

  // FIX later. No time :(
  await forEach(randomUniqueIds, async (randomId) => {
    await searchPage.placeItemIntoBasket(randomId);
  });

  await searchPage.gotoBasket();

  await basketPage.increaseProductQuantity(useRandomInt({ min: 0, max: 4 }));
  await basketPage.deleteProductFromBasket(useRandomInt({ min: 0, max: 4 }));

  await page.pause();
});
