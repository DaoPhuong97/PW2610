import { test, expect } from "../fixtures/heroku.fixture";
import { LoginPage } from "../page/login.page";


test("login successfully with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login("tomsmith", "SuperSecretPassword!");

  await expect(loginPage.isLoginSuccessful()).resolves.toBe(true);
});


//data driven test for login failure with invalid credentials
[
    { username: 'tomsmit', password: 'SuperSecretPassword!', expectedErrorMessage: 'Your username is invalid!\n×' },
    { username: '', password: 'SuperSecretPassword!', expectedErrorMessage: 'Your username is invalid!\n×' },
    { username: '', password: '', expectedErrorMessage: 'Your username is invalid!\n×' },
    { username: 'tomsmith', password: 'wrongpassword', expectedErrorMessage: 'Your password is invalid!\n×' },
    { username: 'tomsmith', password: '', expectedErrorMessage: 'Your password is invalid!\n×' },
].forEach(({ username, password, expectedErrorMessage }) => {
    test(`login fail with invalid ${username} and ${password}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(username, password);

        await expect(loginPage.errorMessage).toContainText(expectedErrorMessage);
    })
})
