import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

import getEmployeeList from '@salesforce/apex/ExpensesController.getEmployeeList';

export default class EmployeePanel extends NavigationMixin(LightningElement) {
   
    employees;
    error;

    loadEmployees() {
        getEmployeeList()
            .then(results => {this.employees = results})
            .catch(error => {this.error = error});
    }

    connectedCallback() {
        this.loadEmployees();
    }

    handleOpenEmployee(event) {
        const employeeId = event.detail;

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: employeeId,
                objectApiName: 'Employee__c',
                actionName: 'view',
            },
        });
    }


}