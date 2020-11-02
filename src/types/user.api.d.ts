type UserData = {
    password: string;
    username: string;
    userId: number;
    isAdmin: boolean;
};

type EmployeeData = {
    firstname: string;
    lastname: string;
    employeeId: number;
    user: number;
}

type Employee = EmployeeData & {
    username: string;
    isAdmin: boolean;
}

type User = {
    username: string;
    userId: number;
    isAdmin: boolean;
};

type AuthUser = User & {
    displayName: string;
}