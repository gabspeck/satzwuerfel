import * as sentences from './sentences';
import * as collections from './collections';
import ASCIIFolder from 'fold-to-ascii/lib/ascii-folder';

function getCategoriesCollection() {
  return collections.getUserCollection('categories');
}

export async function addCategory(name: string) {
  const foldedName = ASCIIFolder.foldReplacing(name);
  getCategoriesCollection().doc(foldedName)
}

export async function getCategories(startingWith?: string) {
  if (!startingWith) {
    startingWith = '';
  }
  startingWith = startingWith.normalize().toLocaleLowerCase();
  const collection = getCategoriesCollection();
  const query = collection.where('normalized_name', '>=', startingWith)
    .where('normalized_name', '<=', startingWith + '\uf8ff')
    .orderBy('normalized_name');
  return (await query.get()).docs.map(d => ({ ...d.data(), id: d.id }));
}
