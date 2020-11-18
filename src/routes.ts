import { wrap } from 'svelte-spa-router/wrap';
import { requireLogin } from './auth';

import Autocomplete from './views/Autocomplete.svelte';
import Home from './views/Home.svelte';
import Draw from './views/Draw.svelte';
import Login from './views/Login.svelte';
import Sentences from './views/Sentences.svelte';
import NotFound from './views/NotFound.svelte';

export const routes = {
  '/': Home,
  '/login': Login,
  '/draw': wrap({component: Draw, conditions: [requireLogin]}),
  '/sentences': wrap({component: Sentences, conditions: [requireLogin]}),
  '/autocomplete': wrap({component: Autocomplete, conditions: [requireLogin]}),
  '*': NotFound,
};
