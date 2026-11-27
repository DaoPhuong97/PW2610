import {Page, Locator} from '@playwright/test';

export class LoginPage {
    readonly errorMessage : Locator;

    constructor(private page: Page) {
        this.page = page;
        this.errorMessage = page.locator('.error');
    }

    async open(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: ' Login' }).click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.page.locator('.error').textContent() || '';
    }

    async isLoginSuccessful(): Promise<boolean> {
        return await this.page.getByRole('heading', { name: 'Welcome to the Secure Area.' }).isVisible();
    }

}
