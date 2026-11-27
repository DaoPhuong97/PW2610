import { test, expect } from '../fixtures/heroku.fixture';

// type Person = {
//   fullName: string;
//   due: number;
// }
// let persons: Person[] = [];
// let dueValues: number[] = [];

// test.describe('verify due on table2', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("https://the-internet.herokuapp.com/tables");
//     persons = [];
//     dueValues = [];
//     let rowsObject: { lastName: string; firstName: string; due: string }[] = [];
//     await test.step('Collecting data from the table', async () => {
//       const rows = await page.locator('#table2 tbody tr').all();
//       for (const row of rows) {
//         const lastName = (await (row.locator('td:nth-child(1)').textContent()) ?? '').trim();
//         const firstName = (await (row.locator('td:nth-child(2)').textContent()) ?? '').trim();
//         const due = (await (row.locator('td:nth-child(4)').textContent()) ?? '').trim();
//         rowsObject.push({
//             lastName,
//             firstName,
//             due
//         });

//         persons.push({
//           fullName: `${firstName} ${lastName}`,
//           due: parseFloat(due.replace('$', ''))
//         })

//       }
//     })

//     await test.step('Get Due colum to list', async () => {
//       dueValues = persons.map((person) => person.due);
//       console.log('Due values:', dueValues);
//       console.log('Persons:', persons);

//     })

//   })

//   test('verify max due person name', async () => {
//     const maxDueValue = Math.max(...dueValues)
//     await test.step('Filter max due person', () => {
//       const maxDuePerson = persons.filter(person => person.due == maxDueValue)
//       const maxDuePersonFullName = maxDuePerson.map(person => person.fullName)
//       console.log('Max due person full name:', maxDuePersonFullName);
//       expect(maxDuePersonFullName).toStrictEqual(['Jason Doe'])
//     })
//   })

//   test('verify min due person name', async ({ page }) => {
//     const minDueValue = Math.min(...dueValues)

//     const minDuePerson = persons.filter(person => person.due == minDueValue)
//     const mimDuePersonFullName = minDuePerson.map(person => person.fullName)

//     expect(mimDuePersonFullName).toStrictEqual(['John Smith', 'Tim Conway'])
//   })

//   test('Verify sorted last names ascending', async () => {
//     const sortedLastNames = persons.map(person => person.fullName.split(' ')[1]).sort();
//     console.log('Sorted last names:', sortedLastNames);
//     expect(sortedLastNames).toStrictEqual(['Bach', 'Conway', 'Doe', 'Smith']);
//   })

//     test('Verify sorted last names descending', async () => {
//     const sortedLastNames = persons.map(person => person.fullName.split(' ')[1]).sort().reverse();
//     console.log('Sorted last names:', sortedLastNames);
//     expect(sortedLastNames).toStrictEqual(['Smith', 'Doe', 'Conway', 'Bach']);
//   })
// })

test('verify max due person is Jason Doe', async ({ tablePage }) => {
    await tablePage.open();
    const maxDuePerson = await tablePage.getMaxDuePerson('table1');
    expect(maxDuePerson).toStrictEqual(['Jason Doe']);
})

test('verify min due person is John Smith and Tim Conway', async ({ tablePage }) => {
    await tablePage.open();
    const minDuePerson = await tablePage.getMinDuePerson('table1');
    expect(minDuePerson).toStrictEqual(['John Smith', 'Tim Conway']);
})

test('Verify sorted last names ascending', async ({ tablePage }) => {
    await tablePage.open();
    const tableData = await tablePage.getTableData('table1');
    const sortedLastNames = tableData.map(row => row.lastname).sort();
    expect(sortedLastNames).toStrictEqual(['Bach', 'Conway', 'Doe', 'Smith']);
})
