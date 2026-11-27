import {test, expect} from '@playwright/test';
import { existsSync } from 'node:fs';

test("verify able to download a file", async ({page}) => {
   await page.goto("https://the-internet.herokuapp.com/download")
   const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: 'sample.json' }).click(),
    ]);

    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toBe('sample.json');

    const filePath = 'downloads/'+suggestedFilename;
    await download.saveAs(filePath);
    expect(existsSync(filePath)).toBeTruthy();

})
