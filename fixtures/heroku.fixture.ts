import {test as base, expect} from '@playwright/test';
import {LoginPage} from '../page/login.page';
import { TablePage } from '../page/table.page';

type HerokuFixtures = {
    loginPage: LoginPage,
    tablePage: TablePage
};

export const test = base.extend<HerokuFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    tablePage: async ({ page }, use) => {
        await use(new TablePage(page));
    }
});

export {expect} from '@playwright/test';
