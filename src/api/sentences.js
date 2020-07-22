export async function insertSentence(sentence) {
  return await fetch('api/sentences', {
    method: 'post',
    body: JSON.stringify(sentence),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateSentence(sentence) {
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
