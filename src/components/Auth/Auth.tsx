import React, { FC, FormEvent, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  auth,
  userStorage,
  costStorage,
  categoryStorage,
} from '../../API/firebase';
import { addUser } from '../../store/slices/userSlice';
import { addCategories } from '../../store/slices/categoriesSlice';
import { addCosts } from '../../store/slices/costsSlice';
import { IUser } from '../../API/user/firebaseUserModel';
import { IAppDispatch } from '../../store/store';
import './Auth.css';

type IAuthMode = 'login' | 'signup';

interface IRegData {
  name: string;
  email: string;
  pass: string;
  passRepeat: string;
}

interface IAuthProps {
  mode: IAuthMode;
}

const initialRegData: IRegData = {
  name: '',
  email: '',
  pass: '',
  passRepeat: '',
};

const authObj = {
  signup: createUserWithEmailAndPassword,
  login: signInWithEmailAndPassword,
};

const uidSaveToLocalStorage = (uid: string) => {
  localStorage.setItem('@dmitrygvl/expense-tracking-app', uid);
};

const getInitialDataForStore = async (uid: string, dispatch: IAppDispatch) => {
  const categories = await categoryStorage.getAll(uid);

  if (categories) {
    dispatch(addCategories(categories));
  }

  const costs = await costStorage.getAll(uid);

  if (costs) {
    dispatch(addCosts(costs));
  }
};

const userAuth = async (
  mode: IAuthMode,
  regData: IRegData,
  errorCb: React.Dispatch<
    React.SetStateAction<{ state: boolean; message: string }>
  >,
  navigate: NavigateFunction,
  dispatch: IAppDispatch,
) => {
  try {
    let profile: IUser | null = null;

    const { user } = await authObj[mode](auth, regData.email, regData.pass);

    if (mode === 'login') {
      profile = await userStorage.getUser(user.uid);
    } else {
      profile = await userStorage.createUser(user.uid, regData.name);
    }

    if (profile) {
      uidSaveToLocalStorage(profile.uid);
      dispatch(addUser(profile));

      getInitialDataForStore(profile.uid, dispatch);
    }

    navigate(`${PREFIX}/`);
  } catch (err) {
    errorCb({
      state: true,
      message: (err as unknown as Error).message,
    });
  }
};

const Auth: FC<IAuthProps> = ({ mode }) => {
  const [regData, setRegData] = useState(initialRegData);
  const [error, setError] = useState({ state: false, message: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRepeatPassNotMatch = regData.pass !== regData.passRepeat;

  const onFormSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    await userAuth(mode, regData, setError, navigate, dispatch);
  };

  const clearForm = () => {
    setRegData({ ...initialRegData });
    setError({ state: false, message: '' });
  };

  return (
    <div className="_container">
      <div className="auth">
        <h1 className="auth__title">
          {mode === 'login' ? 'Log in' : 'Sign up'}
        </h1>
        <form
          className="auth__form form-auth"
          onSubmit={onFormSubmit}
          name="form-auth"
        >
          {mode === 'signup' && (
            <>
              <label className="auth__form_label" htmlFor="name">
                Name:
              </label>
              <input
                className="auth__form_input _input"
                onChange={(ev) =>
                  setRegData({ ...regData, name: ev.target.value })
                }
                value={regData.name}
                name="name"
                id="name"
                minLength={3}
                required
                data-testid="name"
              />
            </>
          )}
          <label className="auth__form_label" htmlFor="email">
            Email:
          </label>
          <input
            className="auth__form_input _input"
            type="email"
            onChange={(ev) =>
              setRegData({ ...regData, email: ev.target.value })
            }
            value={regData.email}
            name="email"
            id="email"
            minLength={6}
            required
            data-testid="email"
          />
          <label className="auth__form_label" htmlFor="password">
            Password:
          </label>
          <input
            className="auth__form_input _input"
            type="password"
            onChange={(ev) => setRegData({ ...regData, pass: ev.target.value })}
            value={regData.pass}
            name="password"
            id="password"
            minLength={6}
            required
            data-testid="password"
          />

          {mode === 'signup' && (
            <>
              <label className="auth__form_label" htmlFor="repeat-password">
                Repeat password:
              </label>
              <input
                className="auth__form_input _input"
                type="password"
                onChange={(ev) =>
                  setRegData({ ...regData, passRepeat: ev.target.value })
                }
                value={regData.passRepeat}
                name="repeatPassword"
                id="repeat-password"
                minLength={6}
                required
                data-testid="repeatPassword"
              />
              {isRepeatPassNotMatch && (
                <p className="auth__form_error" data-testid="error">
                  Password mismatch
                </p>
              )}
            </>
          )}

          {error.state && <p className="auth__form_error">{error.message}</p>}

          <div className="form-auth__buttons">
            <button
              className="form-auth__buttons_button _button"
              type="button"
              onClick={clearForm}
            >
              Clear form
            </button>

            <button
              className="form-auth__buttons_button _button"
              type="submit"
              disabled={mode === 'signup' && isRepeatPassNotMatch}
            >
              {mode === 'signup' ? 'Create' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
