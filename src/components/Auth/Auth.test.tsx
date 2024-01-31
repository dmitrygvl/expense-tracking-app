import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Auth from './Auth';
import store from '../../store/store';

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');

  return {
    __esModule: true,
    ...originalModule,
    signInWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({ user: { uid: '98765421' } }),
    ),
    createUserWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({ user: { uid: '98765421' } }),
    ),
  };
});

jest.mock('firebase/database', () => {
  const originalModule = jest.requireActual('firebase/database');

  return {
    __esModule: true,
    ...originalModule,
    set: jest.fn(() => Promise.resolve(true)),
    ref: jest.fn(() => true),
    child: jest.fn(() => true),
    get: jest
      .fn()
      .mockResolvedValueOnce({
        exists: () => true,
        val: () => ({
          foo: {
            id: 'string',
            name: 'string',
            subcategories: {
              baz: {
                id: 'string',
                name: 'string',
              },
            },
            description: 'string',
          },
        }),
      })
      .mockResolvedValueOnce({
        exists: () => true,
        val: () => ({
          foo: {
            id: 'string',
            date: 145627892,
            categoryId: 'string',
            subcategoryId: 'string',
            payment: 1000,
          },
        }),
      })
      .mockResolvedValueOnce({
        exists: () => true,
        val: () => ({
          uid: 'string',
          name: 'string',
        }),
      })
      .mockResolvedValueOnce({
        exists: () => true,
        val: () => ({
          foo: {
            id: 'string',
            name: 'string',
            subcategories: {
              baz: {
                id: 'string',
                name: 'string',
              },
            },
            description: 'string',
          },
        }),
      })
      .mockResolvedValueOnce({
        exists: () => true,
        val: () => ({
          foo: {
            id: 'string',
            date: 145627892,
            categoryId: 'string',
            subcategoryId: 'string',
            payment: 1000,
          },
        }),
      }),
  };
});

describe('Auth without errors', () => {
  it('render component in mode - signup, auth fullfiled', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Auth mode="signup" />
        </Provider>
      </MemoryRouter>,
    );

    await userEvent.type(screen.getByTestId('name'), 'Dmitry');

    await userEvent.type(screen.getByTestId('email'), 'Test@mail.ru');

    await userEvent.type(screen.getByTestId('password'), 'Test123456');

    await userEvent.type(screen.getByTestId('repeatPassword'), 'Test123456');

    await userEvent.click(screen.getByText('Create'));

    expect(store.getState().user.uid).toBe('98765421');
    expect(store.getState().user.name).toBe('Dmitry');
    expect(store.getState().costs.length).toBe(1);
    expect(store.getState().categories.length).toBe(1);
  });

  it('render component in mode - login, auth fullfiled', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Auth mode="login" />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Log In')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), 'Test@mail.ru');

    await userEvent.type(screen.getByTestId('password'), 'Test123456');

    await userEvent.click(screen.getByText('Log in'));

    expect(store.getState().user.uid).toBe('string');
    expect(store.getState().user.name).toBe('string');
    expect(store.getState().costs.length).toBe(1);
    expect(store.getState().categories.length).toBe(1);
  });
});
