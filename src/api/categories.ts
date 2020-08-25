import * as sentences from './sentences';

export async function getCategories() {
  const sents = await sentences.getSentences();
  return [
    ...new Set(
      sents
        .reduce((acc, s) => acc.concat(s.categories), [])
        .sort((c1, c2) => c1.localeCompare(c2))
    ),
  ];
}
