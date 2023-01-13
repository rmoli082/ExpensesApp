public with sharing class ExpensesController {
    
    @AuraEnabled
    public static Expense_Report__c[] getExpenseReports(String employeeId){
        try {
            return [
                SELECT Name, 
                        Report_Date__c, 
                        Number_of_Expense_Items__c, 
                        Total_Amount_of_Expenses__c
                FROM Expense_Report__c
                WHERE Employee__r.Id = :employeeId
                WITH SECURITY_ENFORCED
                ORDER BY NAME
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Employee__c[] getEmployeeList(){
        try {
            return [
                SELECT Id, Name, Employee_Name__c,
                Number_of_Expense_Reports__c,
                Total_Expenses__c
                FROM Employee__c
                WITH SECURITY_ENFORCED
                ORDER BY Name
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Expense_Item__c[] getExpenseItems(String reportId){
        try {
           return [
            SELECT Name, Category__c,
                Vendor__c, Amount__c
            FROM Expense_Item__c
            WHERE Expense_Report__r.Id = :reportId
            WITH SECURITY_ENFORCED
            ORDER BY NAME
        ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}