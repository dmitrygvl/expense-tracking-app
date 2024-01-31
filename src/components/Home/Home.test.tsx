import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { v4 } from 'uuid';
import Home from './Home';
import store from '../../store/store';
import { addUser, deleteUser } from '../../store/slices/userSlice';

describe('Home', () => {
  it('renders component for authorized users', () => {
    store.dispatch(addUser({ uid: v4(), name: 'Dmitry' }));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Welcome, Dmitry!')).toBeInTheDocument();
    expect(
      screen.getByText('This is your personal budget assistant app'),
    ).toBeInTheDocument();
  });

  it('renders component for unauthorized users', () => {
    store.dispatch(deleteUser());

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });
});
