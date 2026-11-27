import { Page } from '@playwright/test';

type RowData = {
    firstname: string;
    lastname: string;
    due: string;
}
export class TablePage {

    constructor(private page: Page) {
        this.page = page;
    }

    async open(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/tables');
    }

    async getTableData(tableId: string): Promise<RowData[]> {
        const table = this.page.locator(`#${tableId}`);
        const rows = table.locator('tbody tr');
        const rowCount = await rows.count();
        const data: RowData[] = [];

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const cells = row.locator('td');
            const cellCount = await cells.count();
            const rowData: RowData = {
                firstname: '',
                lastname: '',
                due: ''
            };

            for (let j = 0; j < cellCount; j++) {
                const cellText = await cells.nth(j).textContent();
                switch (j) {
                    case 0:
                        rowData.lastname = cellText?.trim() || '';
                        break;
                    case 1:
                        rowData.firstname = cellText?.trim() || '';
                        break;
                    case 3:
                        rowData.due = cellText?.trim() || '';
                        break;
                }
            }
            data.push(rowData);
        }
        return data;
    }
    async getMaxDuePerson(tableId: string): Promise<string[]> {
        const tableData = await this.getTableData(tableId);
        const dueValues = tableData.map(row => parseFloat(row.due.replace(/[$,]/g, '')));
        const maxDue = Math.max(...dueValues);
        const maxDuePerson: string[] = tableData
            .filter(row => parseFloat(row.due.replace(/[$,]/g, '')) === maxDue)
            .map(row => `${row.firstname} ${row.lastname}`);
        return maxDuePerson;
    }
    async getMinDuePerson(tableId: string): Promise<string[]> {
        const tableData = await this.getTableData(tableId);
        const dueValues = tableData.map(row => parseFloat(row.due.replace(/[$,]/g, '')));
        const minDue = Math.min(...dueValues);
        const minDuePerson: string[] = tableData
            .filter(row => parseFloat(row.due.replace(/[$,]/g, '')) === minDue)
            .map(row => `${row.firstname} ${row.lastname}`);
        return minDuePerson;
    }
}