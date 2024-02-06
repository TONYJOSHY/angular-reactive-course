export interface UserForm{
    username: string;
    password: string;
}

export interface User{
    token: string;
    id: string;
    name: string;
    last_login:	string;
    role: number;
    accesses: any
}