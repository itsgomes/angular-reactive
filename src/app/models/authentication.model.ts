export interface IUser {
  id: number;
  login: string;
  password: string;
}

export interface ILoginRequest {
  login: string;
  password: string;
}