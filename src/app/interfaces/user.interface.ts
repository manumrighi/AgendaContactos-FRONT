export interface IUser{
    id?: string;
    name?: string;
    lastName?: string;
    password?: string;
    email: string;
    userName: string;
  }
  
  export const defaultUser = {
    id: "User ID",
    username: "Username",
    role: "CLIENT"
  }