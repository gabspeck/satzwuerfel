import { sentences } from '../_db';

export function get(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let sentencesToDraw = sentences;
  if (req.query.category) {
    sentencesToDraw = sentences.filter((s) =>
      s.categories.includes(req.query.category)
    );
  }
  res.end(
    JSON.stringify(
      sentencesToDraw[Math.floor(Math.random() * sentencesToDraw.length)]
    )
  );
}
