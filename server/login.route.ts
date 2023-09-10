import { Request, Response } from 'express';

import { authenticate } from './db-data';

export function Login(req: Request, res: Response) {
  const { login, password } = req.body;

  const user = authenticate(login, password);

  setTimeout(() => {
    if (user)
      res.status(200).json({ login: user.login });
    else
      res.status(403).send('Login or password is incorrect.');
  }, 1000);
}