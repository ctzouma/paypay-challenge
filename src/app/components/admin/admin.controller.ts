import angular from 'angular';
import { compare } from 'bcrypt-nodejs';
import { ApiService, ApiServiceName } from '../../services/api.service';

export class AdminViewController implements angular.IComponentController {
    public employees: Employee[] = [];
    public sidePanel: SidePanel = {
        open: false,
        model: {} as EmployeeModel,
        form: {} as angular.IFormController,
        title: '',
        showPassword: false,
        unchanged: true,
    };
    public selectedEmployee: Employee = {} as Employee;
    public passwordConfirm = {
        model: '',
        match: false
    };

    private readonly editSidePanelTitle = 'Edit an Employee';
    private readonly addSidePanelTitle = 'Add an Employee';

    static $inject = ['$log', ApiServiceName];
    constructor(private $log: angular.ILogService, private apiService: ApiService) {
        $log.debug(`${AdminViewController.name} constr`);
    }

    $onInit(): void {
       this.refreshEmployees();
    }

    refreshEmployees(): void {
        this.apiService.getEmployees().then(employees => {
            this.employees = employees;
        });
    }

    /**
     * Check if details have changed. If not, there is no need to send a PATCH request
     * Must explicitly check each property since the model is a copy of the selected employee 
     * (i.e object references are not equivalent). Additionally should only check this if 
     * we are editing an Employee
     */
    checkDetailsUnchanged(): void {
        this.sidePanel.unchanged = ( !this.sidePanel.showPassword &&
            (this.selectedEmployee.firstname === this.sidePanel.model.firstname
            && this.selectedEmployee.lastname === this.sidePanel.model.lastname
            && this.selectedEmployee.username === this.sidePanel.model.username
            && this.selectedEmployee.isAdmin === this.sidePanel.model.isAdmin)
        );
    }

    /**
     * Compare the two password fields
     */
    comparePasswords(): void {
        if (this.passwordConfirm.model && this.passwordConfirm.model.length > 0 
            && this.sidePanel.model.password && this.sidePanel.model.password.length > 0) {
                this.passwordConfirm.match = (this.passwordConfirm.model === this.sidePanel.model.password);
        }
    }
    
    /**
     * Conditional to check if passwords are matching. Should return true if either field is empty (this is only used for stlying)
     */
    isNoMatch(): boolean {
        return !!(this.passwordConfirm.model && this.passwordConfirm.model.length > 0 &&
                this.sidePanel.model.password && this.sidePanel.model.password.length > 0 
                && !this.passwordConfirm.match);
    }

    onClickEmployee(employee: Employee): void {
        /* No shallow copy as we are using this in the template to add custom styling to the selected elements
        i.e object references must be the same */
        this.selectedEmployee = employee; 
        this.sidePanel.model = {...employee};
        this.sidePanel.title = this.editSidePanelTitle;
        this._clearAddProperties();
        this.sidePanel.open = true;
    }

    onClickCloseSidePanel(): void {
        this._closeSidePanel();
    }

    onClickAddEmployee(): void {
        this._clearSelectedEmployee();
        this.passwordConfirm.model = '';
        this.passwordConfirm.match = false;
        this.sidePanel.title = this.addSidePanelTitle;
        this.sidePanel.showPassword = true;
        this.sidePanel.open = true;
    }

    /**
     * Method when clicking to add an employee from the side panel
     */
    onClickSidePanelAdd(): void {
        this.$log.debug(`onClickSidePanelAdd(), employee data to add:`, this.sidePanel.model);
        // code to hit backend
    }

    /**
     * Method when clicking the save button in the side panel
     */
    onClickSave(): void {
        this.apiService.updateEmployee(this.sidePanel.model).then(success => {
            if (success) this.refreshEmployees();
        });
        this._closeSidePanel();
    }

    /**
     * Remove an employee
     */
    onClickRemove(): void {
        this.$log.debug(`onClickRemove() - selected employee data to remove:`, this.selectedEmployee);
        // code to hit backend
    }

    /**
     * Clear the currently selected employee
     */
    private _clearSelectedEmployee() {
        this.sidePanel.model = {} as EmployeeModel;
        // To clear the ng-requried errors, we do not want them displaying when opening the side panel fresh.
        this.sidePanel.form.$setPristine();
        this.selectedEmployee = {} as Employee;
        this.sidePanel.unchanged = true;
    }

    /**
     * Clear the properties that appear in the side panel only when adding an employee
     */
    private _clearAddProperties(): void {
        this.passwordConfirm.model = '';
        this.sidePanel.showPassword = false;
    }

    private _closeSidePanel(): void {
        this._clearSelectedEmployee();
        this._clearAddProperties();
        this.sidePanel.open = false;
    }
}