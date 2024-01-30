import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import userEvent from '@testing-library/user-event';
import Auth from './Auth';
import store from '../../store/store';

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');

  return {
    __esModule: true,
    ...originalModule,
    signInWithEmailAndPassword: jest.fn(() => Promise.reject(new Error())),
    createUserWithEmailAndPassword: jest.fn(() =>
      Promise.reject(new Error('Account creation error')),
    ),
  };
});

describe('Auth with errors', () => {
  it('render component in mode - login, auth rejected', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Auth mode="login" />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByText('Log In')).toBeInTheDocument();

    const inputEmail = screen.getByTestId('email') as HTMLInputElement;

    await userEvent.type(inputEmail, 'Test@mail.ru');

    await userEvent.click(screen.getByText('Clear form'));

    expect(inputEmail.value).toBe('');

    await userEvent.type(inputEmail, 'Test@mail.ru');

    await userEvent.type(screen.getByTestId('password'), 'Test123456');

    await userEvent.click(screen.getByText('Log in'));

    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('render component in mode - signup, auth rejected', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Auth mode="signup" />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByText('Create')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('name'), 'Dmitry');

    await userEvent.type(screen.getByTestId('email'), 'Test@mail.ru');

    await userEvent.type(screen.getByTestId('password'), 'Test123456');

    await userEvent.type(screen.getByTestId('repeatPassword'), 'Test123456');

    await userEvent.click(screen.getByText('Create'));

    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(screen.getByText('Account creation error')).toBeInTheDocument();
  });
});
