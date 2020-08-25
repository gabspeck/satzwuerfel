import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { user } from '../stores';

let _user;

user.subscribe((u) => {
  _user = u;
});

function getUserCollectionPath(path: string) {
  return `users/${_user.uid}/${path}`;
}

export function getUserCollection(path: string) {
  const db = firebase.firestore();
  return db.collection(getUserCollectionPath(path));
}
