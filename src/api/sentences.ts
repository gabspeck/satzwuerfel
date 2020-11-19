import * as collections from './collections';
import * as categories from './categories';
import { deleteCategoryIfUnused } from './categories';

export function getSentencesCollection() {
  return collections.getUserCollection('sentences');
}

export async function putSentence(sentence) {
  const collection = getSentencesCollection();
  const sentenceCategories = sentence.categories ? sentence.categories.split(',') : [];
  const categoryIds = await Promise.all(
    sentenceCategories.map(async (c) => await categories.addCategory(c))
  );
  const doc = sentence.id ? collection.doc(sentence.id) : collection.doc();
  const current = (await doc.get()).data()
  await doc.set({ ...sentence, categories: categoryIds });
  if (current) {
    const deletedCategories = current.categories.filter(c => !sentence.categories.includes(c))
    for (const category of deletedCategories){
      await deleteCategoryIfUnused(category)
    }
  }
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

  return candidates[Math.floor(Math.random() * candidates.length)];
}
