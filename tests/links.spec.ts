import {test, expect} from '@playwright/test';
test('verify hyperlink success',async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/status_codes')
  await page.getByRole('link', {name: '200'}).click();
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/200')
  await page.goBack();
})
