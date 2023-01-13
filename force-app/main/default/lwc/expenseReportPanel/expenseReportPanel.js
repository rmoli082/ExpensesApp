import { LightningElement, wire } from 'lwc';
import {subscribe, MessageContext} from 'lightning/messageService';
import EMPLOYEE_SELECTED_CHANNEL from '@salesforce/messageChannel/Employee_Selected__c';
import getExpenseReports from '@salesforce/apex/ExpensesController.getExpenseReports';

export default class ExpenseReportPanel extends LightningElement {

    subscription=null;
    reports;
    error;

    @wire(MessageContext) messageContext;

    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, 
            EMPLOYEE_SELECTED_CHANNEL, (message) => this.handleEmployeeView(message))
    }

    handleEmployeeView(message){
        
        getExpenseReports({employeeId: message.employeeId})
            .then(results => {this.reports = results;})
            .catch(error => {this.error = error;});
        console.log('Received: ' + message.employeeId);
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    
}