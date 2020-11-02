type SidePanel = {
    open: boolean;
    model: EmployeeModel;
    form: angular.IFormController;
    title: string;
    showPassword: boolean;
    unchanged: boolean;
}

type EmployeeModel = Employee & {
    password?: string;
    user?: number;
    employeeId?: number;
}