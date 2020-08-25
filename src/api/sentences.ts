import * as collections from './collections';

export function getSentencesCollection() {
  return collections.getUserCollection('sentences');
}

export async function putSentence(sentence) {
  const collection = getSentencesCollection();
  const doc = sentence.id ? collection.doc(sentence.id) : collection.doc();
  await doc.set({ ...sentence, categories: sentence.categories.split(',') });
  return doc.id;
}

export async function deleteSentence(id) {
  await getSentencesCollection().doc(id).delete();
}

export async function getSentences(): Promise<Array<any>> {
  const collection = getSentencesCollection();
  return (await collection.get()).docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
}

export async function drawSentence(category) {
  const collection = getSentencesCollection();
  const candidates = (
    await (category
      ? collection.where('categories', 'array-contains', category)
      : collection
    ).get()
  ).docs.map((s) => s.data().text);

  console.log(candidates);

  return candidates[Math.floor(Math.random() * candidates.length)];
}
