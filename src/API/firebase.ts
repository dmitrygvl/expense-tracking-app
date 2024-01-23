import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import FirebaseCategoryModel from './category/firebaseCategoryModel';
import FirebaseCostModel from './cost/firebaseCostModel';
import FirebaseUserProfileModel from './user/firebaseUserModel';

const firebaseConfig = {
  apiKey: 'AIzaSyC9e28OLuuiEquY0MKaXwO_vvbiuHIeVig',
  authDomain: 'expense-tracking-3e2a9.firebaseapp.com',
  databaseURL:
    'https://expense-tracking-3e2a9-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'expense-tracking-3e2a9',
  storageBucket: 'expense-tracking-3e2a9.appspot.com',
  messagingSenderId: '693245495790',
  appId: '1:693245495790:web:a223e539ff79535bfce6ff',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const userStorage = new FirebaseUserProfileModel(db, 'users/', '/profile');
const categoryStorage = new FirebaseCategoryModel(db, 'users/', '/categories');
const costStorage = new FirebaseCostModel(db, 'users/', '/costs');

const auth = getAuth();

export { db, auth, userStorage, categoryStorage, costStorage };
