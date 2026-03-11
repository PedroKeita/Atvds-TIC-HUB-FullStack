export type UserRole = "ADMIN" | "CUSTOMER";

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

export class User implements IUser {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public role: UserRole
    ) {}
}