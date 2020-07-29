import { v4 as uuidv4 } from 'uuid';

export async function putSentence(sentence) {
  if (!sentence.id) {
    sentence.id = uuidv4();
  }
  await fetch(`api/sentences/${sentence.id}`, {
    method: 'put',
    body: JSON.stringify(sentence),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteSentence(id) {
  await fetch(`api/sentences/${id}`, { method: 'delete' });
}

export async function getSentences() {
  return await (await fetch('api/sentences')).json();
}

export async function drawSentence(category) {
  let qs = category ? '?category=' + encodeURIComponent(category) : '';
  return await (await fetch('api/sentences/draw' + qs)).json();
}
