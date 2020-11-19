import firebase from 'firebase/app';
import 'firebase/auth';
import { user } from './stores';
import { push } from 'svelte-spa-router';

let user_value;

user.subscribe((v) => {
  user_value = v;
});

export const updateUser = (u) => {
  user.set(u);
  if (!u) {
    login();
  }
};

export const requireLogin = (): boolean => {
  return !!user_value;
};

export const login = () => {
  push('/login');
};

export const logout = () => {
  firebase.auth().signOut();
};
