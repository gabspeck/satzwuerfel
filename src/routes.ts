import { wrap } from 'svelte-spa-router';
import { requireLogin } from './auth';

import Home from './views/Home.svelte';
import Draw from './views/Draw.svelte';
import Login from './views/Login.svelte';
import Sentences from './views/Sentences.svelte';
import NotFound from './views/NotFound.svelte';

export const routes = {
  '/': Home,
  '/login': Login,
  '/draw': wrap(Draw, requireLogin),
  '/sentences': wrap(Sentences, requireLogin),
  '*': NotFound
};
