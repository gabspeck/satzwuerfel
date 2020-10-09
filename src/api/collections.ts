import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { user } from '../stores';
import CollectionReference = firebase.firestore.CollectionReference;

let _user;

user.subscribe((u) => {
  _user = u;
});

function getUserCollectionPath(path: string) {
  return `users/${_user.uid}/${path}`;
}

export function getUserCollection(path: string): CollectionReference {
  const db = firebase.firestore();
  return db.collection(getUserCollectionPath(path));
}
