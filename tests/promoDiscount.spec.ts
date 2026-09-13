import { test, expect } from "@playwright/test";
import { coffeeMenu } from "./drinksTestData";

test(
  "CC-004 promo discount",
  { tag: ["@discount", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    const firstDrink = coffeeMenu[0];
    await page.locator(`[data-test="${firstDrink.locName}"]`).click();

    const secondDrink = coffeeMenu[2];
    await page.locator(`[data-test="${secondDrink.locName}"]`).click();

    const thirdDrink = coffeeMenu[1];
    await page.locator(`[data-test="${thirdDrink.locName}"]`).click();

    await expect(page.getByText("It's your lucky day! Get an")).toBeVisible();
  },
);
