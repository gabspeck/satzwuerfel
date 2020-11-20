import firebase from 'firebase/app';
import 'firebase/firestore';
import { getUser } from '../auth';
import CollectionReference = firebase.firestore.CollectionReference;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

function getUserCollectionPath(path: string = '') {
  return `users/${getUser().uid}/${path}`;
}

export function getDb() {
  return firebase.firestore();
}

export async function getUserDocument(): Promise<DocumentSnapshot> {
  const ref = getDb().doc(getUserCollectionPath());
  return await ref.get();
}

export async function saveUserDocument(snapshot: DocumentSnapshot, data: any) {
  const method = snapshot.exists ? 'update' : 'set';
  await getDb().doc(getUserCollectionPath())[method](data);
}

export function getUserCollection(path: string): CollectionReference {
  return getDb().collection(getUserCollectionPath(path));
}
