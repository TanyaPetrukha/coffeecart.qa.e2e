import { test, expect } from "@playwright/test";

test("CC-005 successfull payment", async ({ page }) => {
  await page.goto("");
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole("textbox", { name: "Name" }).fill("tatka");
  await page.getByRole("textbox", { name: "Email" }).fill("tatka@gmail.com");
  await expect(
    page.getByRole("button", { name: "Thanks for your purchase." }),
  ).toBeVisible();
});
