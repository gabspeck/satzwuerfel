console.log('firebase');
import * as firebase from 'firebase/app';
import firebaseConfig from './firebase-config';

if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;