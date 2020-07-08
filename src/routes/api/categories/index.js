import { categories } from '../_db';
import uuid from 'uuid';

export function get(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(categories));
}

export function post(req, res) {
  const body = req.body;
  const id = uuid.v4();
  categories.push({
    id: id,
    name: body.name,
  });
  res.statusCode = 201;
  res.end(JSON.stringify(id));
}
