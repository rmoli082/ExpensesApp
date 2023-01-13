import { publish, MessageContext } from 'lightning/messageService';
import { LightningElement,api, wire } from 'lwc';
import REPORT_SELECTED_CHANNEL from '@salesforce/messageChannel/Report_Selected__c'

export default class ReportTile extends LightningElement {
    @api report;

    @wire(MessageContext) messageContext;

    handleReportClick() {
        const payload = {reportId: this.report.Id};
        publish(this.messageContext, REPORT_SELECTED_CHANNEL, payload);
    }
}