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
        await page.locator(`[data-test="${drink.locName}"]`).click();
        await page.locator('a[href="/cart"]').click();
        await expect(
          page.locator(
            `li.list-item:has(button[aria-label="Remove all ${drink.name}"])`,
          ),
        ).toBeVisible();
      });
    }
  },
);

test(
  "CC-002 should show an empty cart message",
  { tag: ["@cart", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    await page.locator('a[href="/cart"]').click();
    await expect(
      page.locator(".list").filter({ hasText: "No coffee, go add some." }),
    ).toBeVisible();
  },
);

test(
  "CC-003 should apply a promo discount after adding three drinks",
  { tag: ["@discount", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    const firstDrink = coffeeMenu[0];
    await page.locator(`[data-test="${firstDrink.locName}"]`).click();

    const secondDrink = coffeeMenu[2];
    await page.locator(`[data-test="${secondDrink.locName}"]`).click();

    const thirdDrink = coffeeMenu[1];
    await page.locator(`[data-test="${thirdDrink.locName}"]`).click();

    await expect(page.locator(".promo")).toBeVisible();
  },
);

test(
  "CC-004 should successfully place an order",
  { tag: ["@order", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator("#name").fill("tatka");
    await page.locator("#email").fill("tatka@gmail.com");
    await page.locator("#submit-payment").click();

    await expect(page.locator(".success")).toBeVisible();
  },
);

test(
  "CC-005 should calculate the total amount correctly",
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
