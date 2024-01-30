import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { v4 } from 'uuid';
import userEvent from '@testing-library/user-event';
import Categories from './Categories';
import store from '../../store/store';
import { addUser } from '../../store/slices/userSlice';
import { addCosts } from '../../store/slices/costsSlice';

jest.mock('firebase/database', () => {
  const originalModule = jest.requireActual('firebase/database');

  return {
    __esModule: true,
    ...originalModule,
    set: jest.fn(() => Promise.resolve(true)),
    ref: jest.fn(() => true),
    remove: jest.fn(() => Promise.resolve(true)),
  };
});

describe('Categories', () => {
  it('render component', async () => {
    store.dispatch(addUser({ uid: v4(), name: 'Andrey' }));
    store.dispatch(
      addCosts([
        {
          id: 'string',
          date: 1456782900,
          categoryId: 'qwerty22',
          subcategoryId: 'zxcvbn22',
          payment: 1000,
        },
      ]),
    );

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Categories />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Create category:')).toBeInTheDocument();

    const inputCategory = screen.getByTestId('category') as HTMLInputElement;

    await userEvent.type(inputCategory, 'Transport');

    await userEvent.click(screen.getByText('Clear form'));

    expect(inputCategory.value).toBe('');

    await userEvent.type(inputCategory, 'Transport');

    const inputSubcategories = screen.getByTestId(
      'subcategories',
    ) as HTMLInputElement;

    await userEvent.type(inputSubcategories, 'Bus');

    fireEvent.keyDown(inputSubcategories, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    expect(inputSubcategories.value).toBe('');

    await userEvent.type(inputSubcategories, 'Subway');

    fireEvent.keyDown(inputSubcategories, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    expect(screen.queryAllByTestId('subcategory-value').length).toBe(2);

    await userEvent.click(screen.getByTestId('subcategory-0'));

    expect(screen.queryAllByTestId('subcategory-value').length).toBe(1);

    await userEvent.type(
      screen.getByTestId('description'),
      'Расходы на машину!',
    );

    await userEvent.click(screen.getByText('Create'));

    expect(screen.queryAllByTestId('newCategory').length).toBe(1);
    expect(screen.queryAllByTestId('newSubcategory').length).toBe(1);

    await userEvent.click(screen.getByTestId('deleteCategory-0'));

    expect(store.getState().categories.length).toBe(0);
    expect(store.getState().costs.length).toBe(1);
    expect(screen.queryAllByTestId('newCategory').length).toBe(0);
    expect(screen.queryAllByTestId('newSubcategory').length).toBe(0);
  });
});
