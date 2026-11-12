import { test, expect } from "@playwright/test";

type Person = {
  fullName: string;
  due: number;
}
let persons: Person[] = [];
let dueValues: number[] = [];

test.describe('verify due on table2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    persons = [];
    dueValues = [];
    await test.step('Collecting data from the table', async () => {
      const rows = await page.locator('#table2 tbody tr').all();
      for (const row of rows)  {
        const lastName = (await (row.locator('td:nth-child(1)').textContent()) ?? '').trim();
        const firstName = (await (row.locator('td:nth-child(2)').textContent()) ?? '').trim();
        const due = (await (row.locator('td:nth-child(4)').textContent()) ?? '').trim();

        persons.push({
          fullName: `${firstName} ${lastName}`,
          due: parseFloat(due.replace('$', ''))
        })

      }
    })

    await test.step('Get Due colum to list', async () => {
      dueValues = persons.map((person) => person.due);
      console.log('Due values:', dueValues);
        console.log('Persons:', persons);

    })

  })

  test('verify max due person name', async ({ page }) => {
        const maxDueValue = Math.max(...dueValues)
        await test.step('Filter max due person', () => {
            const maxDuePerson = persons.filter(person => person.due == maxDueValue)
            const maxDuePersonFullName = maxDuePerson.map(person => person.fullName)
            console.log('Max due person full name:', maxDuePersonFullName);
            expect(maxDuePersonFullName).toStrictEqual(['Jason Doe'])
        })
    })

    test('verify min due person name', async ({ page }) => {
        const minDueValue = Math.min(...dueValues)

        const minDuePerson = persons.filter(person => person.due == minDueValue)
        const mimDuePersonFullName = minDuePerson.map(person => person.fullName)

        expect(mimDuePersonFullName).toStrictEqual(['John Smith', 'Tim Conway'])
    })
})

