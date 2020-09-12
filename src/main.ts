import App from './App.svelte';
import * as firebase from 'firebase/app';
import * as firebaseConfig from './firebase-config'
import 'firebase/auth';
import { updateUser } from './auth';

// @ts-ignore
firebase.initializeApp(__app__.production ? firebaseConfig.production : firebaseConfig.dev);
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