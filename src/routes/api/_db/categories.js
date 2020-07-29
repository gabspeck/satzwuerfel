import { sentences } from './sentences';

export let categories = () => [
  ...new Set(
    sentences
      .reduce((acc, s) => acc.concat(s.categories.split(',')), [])
      .sort((c1, c2) => c1.localeCompare(c2))
  ),
];
