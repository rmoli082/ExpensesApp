import { LightningElement,api } from 'lwc';

export default class ReportTile extends LightningElement {
    @api report;

    handleEmployeeClick() {
        const selectEvent = new CustomEvent('reportView', {
            detail: this.report.Id
        });
        this.dispatchEvent(selectEvent);
    }
}