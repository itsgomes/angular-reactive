import { Request, Response } from 'express';
import { PRODUCTS, findProductById } from './db-data';

export function GetAllProducts(req: Request, res: Response) {
  const queryParams = req.query as any;

  const productId = queryParams.productId;
  const filter = queryParams.filter;
  const sortOrder = queryParams.sortOrder;
  const pageNumber = parseInt(queryParams.pageNumber) || 0;
  const pageSize = parseInt(queryParams.pageSize) || 30;

  let products;

  if (productId)
    products = Object.values(PRODUCTS).filter(product => product.id == productId).sort((p1, p2) => p1.id - p2.id);
  else
    products = Object.values(PRODUCTS);

  if (filter)
    products = products.filter(product => product.title.trim().toLowerCase().search(filter.toLowerCase()) >= 0);

  if (sortOrder == "desc")
    products = products.reverse();

  const initialPos = pageNumber * pageSize;
  const productsPage = products.slice(initialPos, initialPos + pageSize);

  setTimeout(() => {
    res.status(200).json({ payload: productsPage });
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

export function SaveProductByid(req: Request, res: Response) {
  const id = req.params['id'];
  const changes = req.body;

  const newProduct = {
    ...PRODUCTS[id],
    ...changes
  };

  PRODUCTS[id] = newProduct;

  setTimeout(() => {
    res.status(200).json(PRODUCTS[id]);
  }, 1000);
}
