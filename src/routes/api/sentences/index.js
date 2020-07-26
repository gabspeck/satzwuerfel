import { sentences } from '../_db';
import uuid from 'uuid';

export function get(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(sentences));
}

export function post(req, res) {
  const body = req.body;
  const id = uuid.v4();
  sentences.push({
    id: id,
    text: body.text,
    categories: body.categories,
  });
  res.statusCode = 201;
  res.end(JSON.stringify(id));
}
