import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { v4 } from 'uuid';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import store from '../../store/store';
import { addUser } from '../../store/slices/userSlice';

global.PREFIX = '';

describe('Header', () => {
  it('renders component with correct links for authorized users and unauthorized users', async () => {
    store.dispatch(addUser({ uid: v4(), name: 'Dmitry' }));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(6);
    expect(screen.getByText('Expense tracking')).toHaveAttribute('href', '/');
    expect(screen.getByText('ABOUT')).toHaveAttribute('href', '/about');
    expect(screen.getByText('SIGN OUT')).toHaveAttribute('href', '/');
    expect(screen.getByText('CATEGORIES')).toHaveAttribute(
      'href',
      '/categories',
    );
    expect(screen.getByText('COSTS')).toHaveAttribute('href', '/costs');

    await userEvent.click(screen.getByText('SIGN OUT'));

    expect(screen.getAllByRole('link')).toHaveLength(4);
    expect(screen.getByText('Expense tracking')).toHaveAttribute('href', '/');
    expect(screen.getByText('ABOUT')).toHaveAttribute('href', '/about');
    expect(screen.getByText('LOG IN')).toHaveAttribute('href', '/login');
    expect(screen.getByText('SIGN UP')).toHaveAttribute('href', '/signup');
  });
});
