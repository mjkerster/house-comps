// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../app/firebaseConfig';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  Auth,
  UserCredential,
  User,
} from 'firebase/auth';
import {
  child,
  Database,
  get,
  getDatabase,
  ref,
  set,
  push,
  update,
  remove,
} from 'firebase/database';
import { EditProperty } from '../features/Properties/PropertySlice';

let app;
let auth: Auth;
let db: Database;
let googleProvider: GoogleAuthProvider;
// Initialize Firebase
export const initializeFirebase = () => {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);
  googleProvider = new GoogleAuthProvider();
};

export const getFirebaseAuth = (): Auth => auth;
export const getFirebaseDatabase = (): Database => db;

export const signInWithGoogle = async () => {
  try {
    const res: UserCredential = await signInWithPopup(auth, googleProvider);
    const user: User = res.user;
    const userSnapshot = await get(child(ref(db), `users/${user.uid}`));
    if (userSnapshot.exists()) {
      console.log('user: ', userSnapshot.val());
    } else {
      set(ref(db, 'users/' + user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const postProperty = (property: Property): any => {
  return push(ref(db, 'properties'), property);
};

export const updateProperty = (property: EditProperty): any => {
  const { key, ...other } = property;
  const updates: any = {};
  if (key === null) {
    throw new Error('No "key" found for update');
  }
  updates[key] = other;
  return update(ref(db, 'properties'), updates);
};
export const deleteProperty = (key: string | null): Promise<void> => {
  if (key === null) {
    throw new Error('No "key" found for delete');
  }
  return remove(ref(db, `properties/${key}`));
};

export const signOutOfGoogle = () => signOut(auth);

export interface Property {
  url: string;
  favorite: boolean;
  address: string;
  entryDateTime: string;
  listPrice?: string;
  salePrice?: string;
}
