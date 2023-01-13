import { LightningElement } from 'lwc';

import getEmployeeList from '@salesforce/apex/ExpensesController.getEmployeeList';

export default class EmployeePanel extends LightningElement {
   
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


}