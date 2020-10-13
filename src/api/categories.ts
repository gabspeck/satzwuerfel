import * as collections from './collections';
import ASCIIFolder from 'fold-to-ascii/lib/ascii-folder';

function normalizeString(str: string){
  return ASCIIFolder.foldReplacing(str).normalize().toLowerCase()
}

function getCategoriesCollection() {
  return collections.getUserCollection('categories');
}

export async function addCategory(name: string) {
  await getCategoriesCollection().doc(name).set(
    {
      normalizedName: normalizeString(name)
    }
  )

  return name
}

export async function getCategories(startingWith?: string) {
  if (!startingWith) {
    startingWith = '';
  }
  startingWith = normalizeString(startingWith)
  const collection = getCategoriesCollection();
  const query = collection.where('normalizedName', '>=', startingWith)
    .where('normalizedName', '<=', startingWith + '\uf8ff')
    .orderBy('normalizedName');
  return (await query.get()).docs.map(d => ({ ...d.data(), id: d.id }));
}
