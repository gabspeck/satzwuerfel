import App from './App.svelte';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseConfig from './firebase-config';
import { updateUser } from './auth';


// @ts-ignore
firebase.initializeApp(firebaseConfig[import.meta.env.MODE]);
let app = null;
const unsubscribe = firebase.auth().onAuthStateChanged(async (u) => {
  unsubscribe();
  updateUser(u);
  firebase.auth().onAuthStateChanged(updateUser);
  app = new App({
    target: document.body,
  });
});

export default app;
