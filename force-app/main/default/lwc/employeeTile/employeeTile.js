import { LightningElement,api, wire } from 'lwc';
import {publish, MessageContext } from 'lightning/messageService';
import EMPLOYEE_SELECTED_CHANNEL from '@salesforce/messageChannel/Employee_Selected__c';

export default class EmployeeTile extends LightningElement {
    @api employee;

    @wire(MessageContext) messageContext;

    handleEmployeeView() {
        const payload = {employeeId: this.employee.Id};
        publish(this.messageContext, EMPLOYEE_SELECTED_CHANNEL, payload);       
    }

    handleEmployeeOpen() {
        const selectEvent = new CustomEvent('openemployee',
        {detail: this.employee.Id});
        this.dispatchEvent(selectEvent);
    }
}