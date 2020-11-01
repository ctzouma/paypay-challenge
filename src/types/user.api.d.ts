type UserData = {
    password: string;
    username: string;
    userId: number;
    isAdmin: boolean;
};

type User = {
    username: string;
    userId: number;
    isAdmin: boolean;
};

type AuthUser = User & {
    displayName: string;
}