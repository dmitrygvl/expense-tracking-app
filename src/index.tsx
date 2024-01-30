import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App/App';
import store from './store/store';
import { categoryStorage, costStorage, userStorage } from './API/firebase';
import { addUser } from './store/slices/userSlice';
import { addCategories } from './store/slices/categoriesSlice';
import { addCosts } from './store/slices/costsSlice';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

window.addEventListener('load', async () => {
  try {
    const uid = localStorage.getItem('@dmitrygvl/expense-tracking-app');

    if (uid) {
      const profile = await userStorage.getUser(uid);

      if (profile) {
        store.dispatch(addUser({ uid: profile.uid, name: profile.name }));
      } else {
        throw new Error(
          'User with given Id from LocalStorage is not found in Firebase',
        );
      }

      const categories = await categoryStorage.getAll(uid);

      if (categories) {
        store.dispatch(addCategories(categories));
      }

      const costs = await costStorage.getAll(uid);

      if (costs) {
        store.dispatch(addCosts(costs));
      }
    }
  } catch (err) {
    console.log((err as Error).message);
  }
});
