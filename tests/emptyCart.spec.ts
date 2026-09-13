import { test, expect } from "@playwright/test";

test(
  "CC-003 empty cart",
  { tag: ["@cart", "@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto("");
    await page.getByRole("link", { name: "Cart page" }).click();
    await expect(page.getByText("No coffee, go add some.")).toBeVisible();
  },
);
