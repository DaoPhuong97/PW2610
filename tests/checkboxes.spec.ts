import { test, expect } from "@playwright/test";
test("checkboxes", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/checkboxes");

  const checkbox1 = page.getByRole("checkbox").first();
  const checkbox2 = page.getByRole("checkbox").nth(1);

  await checkbox1.check();
  await expect(checkbox1).toBeChecked();

  await checkbox2.check();
  await expect(checkbox2).toBeChecked();
});


