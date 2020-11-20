import firebase from 'firebase/app';
import 'firebase/auth';
import { user } from './stores';
import { push } from 'svelte-spa-router';
import { migrateCategories } from './api';
import { getUserDocument } from './api/collections';

let user_value;

user.subscribe((v) => {
  user_value = v;
});

export const updateUser = async (u) => {
  user.set(u);
  if (!u) {
    login();
    return;
  }
  const doc = await getUserDocument();
  if (!doc.data().categoriesMigrated) {
    await migrateCategories(doc);
  }
};

export function getUser() {
  return user_value;
}

export const requireLogin = (): boolean => {
  return !!user_value;
};

export function login() {
  push('/login');
}

export async function logout() {
  await firebase.auth().signOut();
}
