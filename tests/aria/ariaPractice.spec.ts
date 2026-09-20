import { test, expect } from "@playwright/test";
import { coffeeMenu } from "../drinksTestData";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test.describe(
  "CC-001 adding drinks to cart",
  { tag: ["@cart", "@smoke", "@regression"] },
  () => {
    for (const drink of coffeeMenu) {
      test(`should add ${drink.name} to cart`, async ({ page }) => {
        await page.getByTestId(drink.locName).click();
        await expect(
          page.getByRole("link", { name: "Cart page" }),
        ).toContainText("cart (1)");
      });
    }
  },
);

test(
  "CC-002 should show an empty cart message",
  { tag: ["@cart", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    await page.getByRole("link", { name: "Cart page" }).click();
    await expect(page.getByText("No coffee, go add some.")).toBeVisible();
  },
);

test(
  "CC-003 should apply a promo discount after adding three drinks",
  { tag: ["@discount", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    const firstDrink = coffeeMenu[0];
    await page.getByTestId(firstDrink.locName).click();

    const secondDrink = coffeeMenu[2];
    await page.getByTestId(secondDrink.locName).click();

    const thirdDrink = coffeeMenu[1];
    await page.getByTestId(thirdDrink.locName).click();

    await expect(page.getByText("It's your lucky day! Get an")).toBeVisible();
  },
);

test(
  "CC-004 should successfully place an order",
  { tag: ["@order", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    await page.getByTestId("Cappuccino").click();
    await page.getByTestId("checkout").click();
    await page.getByRole("textbox", { name: "Name" }).fill("tatka");
    await page.getByRole("textbox", { name: "Email" }).fill("tatka@gmail.com");
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(
      page.getByRole("button", { name: "Thanks for your purchase." }),
    ).toBeVisible();
  },
);

test(
  "CC-005 should calculate the total amount correctly",
  { tag: ["@cart", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    const firstDrink = coffeeMenu[0];
    await page.getByTestId(firstDrink.locName).click();

    const secondDrink = coffeeMenu[3];
    await page.getByTestId(secondDrink.locName).click();

    const totalAmount = firstDrink.price + secondDrink.price;

    await expect(page.getByTestId("checkout")).toContainText(
      `Total: $${totalAmount}`,
    );
  },
);
