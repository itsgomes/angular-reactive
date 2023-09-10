import { Request, Response } from 'express';
import { PRODUCTS, findProductById } from './db-data';

export function GetAllProducts(req: Request, res: Response) {
  setTimeout(() => {
    res.status(200).json({ payload: Object.values(PRODUCTS) });
  }, 1000);
}

export function GetProductById(req: Request, res: Response) {
  const productId = req.params['id'];
  const product = findProductById(Number(productId));

  setTimeout(() => {
    if (product)
      res.status(200).json(product);
    else
      res.status(403).send('No one product was found with this id.');
  });
}
