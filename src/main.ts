import App from './App.svelte';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase-config';
import { updateUser } from './auth';

firebase.initializeApp(firebaseConfig);
let app = null;
const unsubscribe = firebase.auth().onAuthStateChanged(u => {
  unsubscribe();
  updateUser(u);
  firebase.auth().onAuthStateChanged(updateUser);
  app = new App({
    target: document.body
  });
});


export default app;