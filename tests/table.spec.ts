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
    let rowsObject: { lastName: string; firstName: string; due: string }[] = [];
    await test.step('Collecting data from the table', async () => {
      const rows = await page.locator('#table2 tbody tr').all();
      for (const row of rows) {
        const lastName = (await (row.locator('td:nth-child(1)').textContent()) ?? '').trim();
        const firstName = (await (row.locator('td:nth-child(2)').textContent()) ?? '').trim();
        const due = (await (row.locator('td:nth-child(4)').textContent()) ?? '').trim();
        rowsObject.push({
            lastName,
            firstName,
            due
        });

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

  test('verify max due person name', async () => {
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

  test('Verify sorted last names ascending', async () => {
    const sortedLastNames = persons.map(person => person.fullName.split(' ')[1]).sort();
    console.log('Sorted last names:', sortedLastNames);
    expect(sortedLastNames).toStrictEqual(['Bach', 'Conway', 'Doe', 'Smith']);
  })

    test('Verify sorted last names descending', async () => {
    const sortedLastNames = persons.map(person => person.fullName.split(' ')[1]).sort().reverse();
    console.log('Sorted last names:', sortedLastNames);
    expect(sortedLastNames).toStrictEqual(['Smith', 'Doe', 'Conway', 'Bach']);
  })

// test('verify min due person', async ({ page }) => {

//   await page.goto('https://the-internet.herokuapp.com/tables')
//   const tableData: string[][] = [];

//   const rows = await page.locator('table#table1 tbody tr').all();

//   for (const row of rows) {
//     const cells = await row.locator('td').all();
//     const rowData: string[] = [];

//     for (const cell of cells) {
//       rowData.push((await cell.innerText()).trim());
//     }

//     tableData.push(rowData);
//   }

//   console.log(tableData);

//   const dueValue = tableData.map(row => parseFloat(row[3].replace('$', '')));

//   const minDueValue = Math.min(...dueValue);
//   const filteredRows = tableData.filter(row => parseFloat(row[3].replace('$', '')) === minDueValue);
//   console.log(filteredRows);
//   const minDuePersonFullNames = filteredRows.map(row => `${row[1]} ${row[0]}`);
//   console.log(minDuePersonFullNames);
//   expect(minDuePersonFullNames).toStrictEqual(['John Smith', 'Tim Conway']);
//   // expect(`[${firstPersonWithMinDue} ${lastPersonWithMinDue}]`).toBe(['John Smith', 'Tim Conway']);

// })

// test('verify large due person', async ({ page }) => {

//   await page.goto('https://the-internet.herokuapp.com/tables')
//   const tableData: string[][] = [];

//   const rows = await page.locator('table#table1 tbody tr').all();

//   for (const row of rows) {
//     const cells = await row.locator('td').all();
//     const rowData: string[] = [];

//     for (const cell of cells) {
//       rowData.push((await cell.innerText()).trim());
//     }

//     tableData.push(rowData);
//   }

//   console.log(tableData);

//   const dueValue = tableData.map(row => parseFloat(row[3].replace('$', '')));

//   const maxDueValue = Math.max(...dueValue);

//   console.log(dueValue);
//   console.log(maxDueValue);

//   const indexOfMaxDue = dueValue.indexOf(maxDueValue);
//   console.log(indexOfMaxDue);

//   const firstPersonWithMaxDue = tableData[indexOfMaxDue][1];
//   const lastPersonWithMaxDue = tableData[indexOfMaxDue][0];

//   console.log(`First Person with Max Due:  with Due: $${maxDueValue}`);
//   expect(`${firstPersonWithMaxDue} ${lastPersonWithMaxDue}`).toBe('Jason Doe');

})
