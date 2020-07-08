import { categories } from '../_db';

export function del(req, res) {
  const { id } = req.params;
  const idx = categories.findIndex((c) => c.id === id);
  if (idx < 0) {
    res.statusCode = 404;
    return res.end(JSON.stringify('Not found'));
  }
  categories.splice(idx, 1);
  res.statusCode = 204;
  res.end();
}

export function put(req, res) {
  const { id } = req.params;
  const idx = categories.findIndex((c) => c.id === id);
  if (idx < 0) {
    res.statusCode = 404;
    return res.end(JSON.stringify('Not found'));
  }
  categories[idx] = {
    id: id,
    name: req.body.name,
  };
  res.statusCode = 204;
  return res.end();
}
