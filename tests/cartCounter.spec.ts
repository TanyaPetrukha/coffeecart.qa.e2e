import { test, expect } from "@playwright/test";
import { coffeeMenu } from "./drinksTestData";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test.describe(
  "CC-001 adding drinks to cart",
  { tag: ["@cart", "@smoke", "@regression"] },
  () => {
    for (const drink of coffeeMenu) {
      test(`adding ${drink.name} to cart`, async ({ page }) => {
        await page.locator(`[data-test="${drink.locName}"]`).click();
        await expect(
          page.getByRole("link", { name: "Cart page" }),
        ).toContainText("cart (1)");
      });
    }
  },
);
