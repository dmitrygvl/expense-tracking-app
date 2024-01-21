import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import FirebaseCategoryModel from './category/firebaseCategoryModel';
import FirebaseSpendingModel from './spending/firebaseSpendingModel';
import FirebaseUserModel from './user/firebaseUserModel';

// import 'dotenv/config';

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: 'AIzaSyC9e28OLuuiEquY0MKaXwO_vvbiuHIeVig',
  authDomain: 'expense-tracking-3e2a9.firebaseapp.com',
  projectId: 'expense-tracking-3e2a9',
  storageBucket: 'expense-tracking-3e2a9.appspot.com',
  messagingSenderId: '693245495790',
  appId: '1:693245495790:web:a223e539ff79535bfce6ff',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const userStorage = new FirebaseUserModel(db, 'users/', 'profiles');
const categoryStorage = new FirebaseCategoryModel(db, 'users', 'categories');
const spendingStorage = new FirebaseSpendingModel(db, 'users', 'spendings');

const auth = getAuth();

export const isUserSignedIn = () => !!getAuth().currentUser;

export { db, auth, categoryStorage, spendingStorage, userStorage };
