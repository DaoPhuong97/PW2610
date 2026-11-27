import {test, expect} from '@playwright/test';

test('verify able to select date from datepicker', async ({page}) => {
    await page.goto('https://qa-demo-site-ten.vercel.app/elements/date-picker')

    await page.getByTestId('date-custom-trigger').click()
    // chon ngay cach ngay hom nay 1 tuan
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const day = date.getDate();
    // datetime format: "Monday, January 1st, 2024"
    const weekday = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const lastTwoDigits = day % 100;
    const suffix =
        lastTwoDigits >= 11 && lastTwoDigits <= 13
            ? 'th'
            : ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] ?? 'th');
    const dateButtonName = `${weekday}, ${month} ${day}${suffix},`;
    const formattedDate = `${month} ${day}${suffix}, ${year}`;

    await page.getByRole('button', { name: dateButtonName }).click();

    expect(await page.getByTestId('date-custom-trigger').textContent()).toBe(formattedDate)
})
