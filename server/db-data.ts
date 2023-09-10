export const USERS = [
  { 
    id: 1,
    login: 'admin',
    password: 'root'
  }
];

export function authenticate(login: string, password: string) {
  const user: any = Object.values(USERS).find(u => u.login === login);

  if (user && user.password == password)
    return user;
  else
    return undefined;
}