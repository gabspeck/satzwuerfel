import * as collections from './collections';
import ASCIIFolder from 'fold-to-ascii/lib/ascii-folder';
import { getSentencesCollection } from './sentences';

function normalizeString(str: string) {
  return ASCIIFolder.foldReplacing(str).normalize().toLowerCase();
}

function getCategoriesCollection() {
  return collections.getUserCollection('categories');
}

export async function addCategory(name: string) {
  await getCategoriesCollection()
    .doc(name)
    .set({
      normalizedName: normalizeString(name)
    });

  return name;
}

export async function getCategories(startingWith = ''): Promise<string[]> {
  startingWith = normalizeString(startingWith);
  const collection = getCategoriesCollection();
  const query = collection
    .where('normalizedName', '>=', startingWith)
    .where('normalizedName', '<=', startingWith + '\uf8ff')
    .orderBy('normalizedName');
  return (await query.get()).docs.map((d) => d.id);
}

export async function deleteCategoryIfUnused(category: string) {
  const sentences = getSentencesCollection();
  const query = sentences.where('categories', 'array-contains', category).limit(1)
  const snapshot = await query.get()
  if (snapshot.empty){
    const categories = getCategoriesCollection()
    await categories.doc(category).delete()
  }
}