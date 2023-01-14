import { LightningElement, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import searchEmployees from '@salesforce/apex/ExpensesController.searchEmployees';

export default class EmployeePanel extends NavigationMixin(LightningElement) {
   
    searchTerm = '';

    @wire(searchEmployees, {searchTerm: '$searchTerm'})
    employees;

    handleSearchChange(event) {
        // Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
    }

    get hasResults() {
        return (this.employees.data.length > 0);
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