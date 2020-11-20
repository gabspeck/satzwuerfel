import * as collections from './collections';
import { getDb, saveUserDocument } from './collections';
import ASCIIFolder from 'fold-to-ascii/lib/ascii-folder';
import { getSentences, getSentencesCollection } from './sentences';
import type firebase from 'firebase';

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
  const query = sentences.where('categories', 'array-contains', category).limit(1);
  const snapshot = await query.get();
  if (snapshot.empty) {
    const categories = getCategoriesCollection();
    await categories.doc(category).delete();
  }
}

export async function migrateCategories(userDoc: firebase.firestore.DocumentSnapshot) {
  const sentences = await getSentences();
  const allCategories = new Set(sentences.flatMap(s => s.categories));
  const batch = getDb().batch();
  const categories = getCategoriesCollection();
  for (const category of allCategories) {
    const doc = categories.doc(category);
    await batch.set(doc, {
      normalizedName: normalizeString(category)
    });
  }
  await batch.commit();
  await saveUserDocument(userDoc, { categoriesMigrated: true });
}