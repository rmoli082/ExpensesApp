import { LightningElement, wire } from 'lwc';
import {subscribe, MessageContext} from 'lightning/messageService';
import REPORT_SELECTED_CHANNEL from '@salesforce/messageChannel/Report_Selected__c';
import getExpenseItems from '@salesforce/apex/ExpensesController.getExpenseItems';

export default class ExpenseItemsPanel extends LightningElement {

    subscription=null;
    expenses;
    error;

    @wire(MessageContext) messageContext;

    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, 
            REPORT_SELECTED_CHANNEL, (message) => this.handleReportView(message));
    }

    handleReportView(message){
        
        getExpenseItems({reportId: message.reportId})
            .then(results => {this.expenses = results;})
            .catch(error => {this.error = error;});
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    
}