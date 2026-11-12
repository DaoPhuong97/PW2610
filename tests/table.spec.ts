import { expect, test } from "@playwright/test";

type Person = {
  fullName: string;
  due: number;
}
let persons: Person[] = [];
let dueValues: number[] = [];

test.describe("verify due on table2", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    persons = [];
    dueValues = [];
    await test.step("Collecting data from the table", async () => {
      const rows = await page.locator("#table2 tbody tr").all();
      rows.forEach(async (row) => {
        const fistName = (await (row.locator('td:nth-child(1)').textContent()) ?? '').trim();
        const lastName = (await (row.locator('td:nth-child(2)').nth(1).textContent()) ?? '').trim();
        const due = (await (row.locator('td:nth-child(4)').nth(1).textContent()) ?? '').trim();

        persons.push({
          fullName: `${fistName} ${lastName}`,
          due: parseFloat(due.replace('$', ''))
        })

      })
    })

    await test.step('Get Due colum to list', async () => {
      dueValues = persons.map((person) => person.due);
      console.log('Due values:', dueValues);
    })
  });
})
