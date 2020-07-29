import { categories } from './_db';

export const get = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(categories()));
};
