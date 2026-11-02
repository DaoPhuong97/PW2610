import { test, expect } from "@playwright/test";

test("login successfully with valid credentials", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("SuperSecretPassword!");
  await page.getByRole("button", { name: " Login" }).click();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
  await expect(
    page.getByRole("heading", { name: "Welcome to the Secure Area" }),
  ).toBeVisible();
});

test("login fails with invalid credentials", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.getByRole("textbox", { name: "Username" }).fill("123434");
  await page.getByRole("textbox", { name: "Password" }).fill("123456");
  await page.getByRole("button", { name: " Login" }).click();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");
  await expect(page.getByText("Your username is invalid! ×"));
});

test("login fails with blank username", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.getByRole("textbox", { name: "Username" }).fill("");
  await page.getByRole("textbox", { name: "Password" }).fill("SuperSecretPassword");
  await page.getByRole("button", { name: " Login" }).click();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");
  await expect(page.getByText("Your username is invalid! ×"));
});

test("login fails with blank password", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
  await page.getByRole("textbox", { name: "Password" }).fill("");
  await page.getByRole("button", { name: " Login" }).click();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");
  await expect(page.getByText("Your username is invalid! ×"));
});
test("login fails with blank password and blank username", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.getByRole("textbox", { name: "Username" }).fill("");
  await page.getByRole("textbox", { name: "Password" }).fill("");
  await page.getByRole("button", { name: " Login" }).click();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");
  await expect(page.getByText("Your username is invalid! ×"));
});

