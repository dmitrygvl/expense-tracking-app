import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { v4 } from 'uuid';
import userEvent from '@testing-library/user-event';
import Costs from './Costs';
import store from '../../store/store';
import { addUser } from '../../store/slices/userSlice';
import { addCategories } from '../../store/slices/categoriesSlice';

jest.mock('firebase/database', () => {
  const originalModule = jest.requireActual('firebase/database');

  return {
    __esModule: true,
    ...originalModule,
    set: jest.fn(() => Promise.resolve(true)),
    ref: jest.fn(() => true),
  };
});

describe('Costs', () => {
  it('checking that the form for adding costs works correctly', async () => {
    store.dispatch(addUser({ uid: v4(), name: 'Fedor' }));
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

    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Costs />
        </Provider>
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByText('Add cost'));

    expect(
      screen.getByText('Be sure to choose a category ⚠️'),
    ).toBeInTheDocument();

    const categoryContainer = container.getElementsByClassName(
      'css-13cymwt-control',
    )[0];

    await userEvent.click(categoryContainer);

    let categoryMenu = container.getElementsByClassName('css-1nmdiq5-menu')[0];

    await userEvent.click(
      ((categoryMenu as Element).firstChild as Element).firstChild as Element,
    );

    const categoryValue = container.getElementsByClassName(
      'css-1dimb5e-singleValue',
    )[0];

    expect(categoryValue.textContent).toBe('Transport');

    await userEvent.click(screen.getByText('Clear form'));

    expect(categoryValue.textContent).toBe('');

    await userEvent.click(categoryContainer);

    categoryMenu = container.getElementsByClassName('css-1nmdiq5-menu')[0];

    await userEvent.click(
      ((categoryMenu as Element).firstChild as Element).firstChild as Element,
    );

    const subcategoryContainer = container.getElementsByClassName(
      'css-13cymwt-control',
    )[1];

    await userEvent.click(subcategoryContainer);

    const subcategoryMenu =
      container.getElementsByClassName('css-1nmdiq5-menu')[0];

    await userEvent.click(
      ((subcategoryMenu as Element).firstChild as Element)
        .firstChild as Element,
    );

    const subcategoryValue = container.getElementsByClassName(
      'css-1dimb5e-singleValue',
    )[1];

    expect(subcategoryValue.textContent).toBe('Bus');

    const date = screen.getByTestId('date') as HTMLInputElement;

    fireEvent.change(date, {
      target: { value: '2023-07-10' },
    });

    const payment = screen.getByTestId('payment') as HTMLInputElement;

    fireEvent.change(payment, {
      target: { value: '1000' },
    });

    expect(date.value).toBe('2023-07-10');

    expect(payment.value).toBe('1000');

    await userEvent.click(screen.getByText('Add cost'));

    expect(screen.getByText('Cost added 👍')).toBeInTheDocument();
  });
});
