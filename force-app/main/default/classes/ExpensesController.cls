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
                SELECT Id, Name, Employee_Name__c
                FROM Employee__c
                WITH SECURITY_ENFORCED
                ORDER BY Name
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Expense_Item__c> getExpenseItems(){
        try {
           return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}