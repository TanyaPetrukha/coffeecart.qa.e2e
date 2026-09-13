import { test, expect } from "@playwright/test";
import { coffeeMenu } from "./drinksTestData";

test(
  "CC-002 total amount",
  { tag: ["@cart", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    const firstDrink = coffeeMenu[0];
    await page.locator(`[data-test="${firstDrink.locName}"]`).click();

    const secondDrink = coffeeMenu[3];
    await page.locator(`[data-test="${secondDrink.locName}"]`).click();

    const totalAmount = firstDrink.price + secondDrink.price;

    await expect(page.locator('[data-test="checkout"]')).toContainText(
      `Total: $${totalAmount}`,
    );
  },
);
