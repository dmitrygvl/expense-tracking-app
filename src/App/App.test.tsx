import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { v4 } from 'uuid';
import userEvent from '@testing-library/user-event';
import App from './App';
import store from '../store/store';
import { addUser } from '../store/slices/userSlice';
import { addCategories } from '../store/slices/categoriesSlice';
import { addCosts } from '../store/slices/costsSlice';

global.PREFIX = '';

describe('App', () => {
  it('checking the rendering of the App component, transition to the statistics page and rendering of statistics', async () => {
    const user = userEvent.setup();

    store.dispatch(addUser({ uid: v4(), name: 'Dmitry' }));
    store.dispatch(
      addCategories([
        {
          id: 'string',
          name: 'Transport',
          description: 'string',
          subcategories: [
            {
              id: 'string1',
              name: 'Bus',
            },
            {
              id: 'string2',
              name: 'Subway',
            },
          ],
        },
      ]),
    );
    store.dispatch(
      addCosts([
        {
          id: 'string5',
          categoryId: 'string',
          subcategoryId: 'string1',
          payment: 1000,
          date: 1689745034257,
        },
        {
          id: 'string6',
          categoryId: 'string',
          subcategoryId: 'string2',
          payment: 5000,
          date: 1689745000000,
        },
      ]),
    );
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    await user.click(screen.getByText('STATISTICS'));

    expect(
      screen.getByText('Select a time period, then select Table or Pie Chart'),
    ).toBeInTheDocument();

    const btnThisMonth = container.getElementsByClassName('rdrStaticRange')[4];

    await user.click(btnThisMonth);

    await user.click(screen.getByText('Pie chart'));

    expect(
      container.getElementsByClassName('statistics__pie-chart')[0],
    ).not.toBeNull();

    await user.click(screen.getByText('Table'));

    expect(
      container.getElementsByClassName('statistics__table-container')[0],
    ).not.toBeNull();
  }, 10000);
});
