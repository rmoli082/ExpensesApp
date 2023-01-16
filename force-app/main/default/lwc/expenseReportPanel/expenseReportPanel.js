import { LightningElement, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {subscribe, publish, MessageContext} from 'lightning/messageService';
import EMPLOYEE_SELECTED_CHANNEL from '@salesforce/messageChannel/Employee_Selected__c';
import REPORT_SELECTED_CHANNEL from '@salesforce/messageChannel/Report_Selected__c';
import getExpenseReports from '@salesforce/apex/ExpensesController.getExpenseReports';

export default class ExpenseReportPanel extends NavigationMixin(LightningElement) {

    subscription=null;
    employeeId='';
    reports;

    @wire(MessageContext) messageContext;
    @wire(getExpenseReports, { employeeId:'$employeeId'} ) reports;

    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, 
            EMPLOYEE_SELECTED_CHANNEL, (message) => this.handleEmployeeView(message))
    }

    handleEmployeeView(message){
        this.employeeId = message.employeeId;
        publish(this.messageContext, REPORT_SELECTED_CHANNEL, {reportId: '0'});
    }

    handleReportOpen(event) {
        const reportId = event.detail;

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: reportId,
                objectApiName: 'Expense_Report__c',
                actionName: 'view',
            },
        });
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    
}