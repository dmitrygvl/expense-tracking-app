import React, { FC, FormEvent, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { logIn } from '../../store/slices/authSlice';
import {
  auth,
  userStorage,
  spendingStorage,
  categoryStorage,
} from '../../API/firebase';
import { addUser } from '../../store/slices/userSlice';
import { addCategories } from '../../store/slices/categoriesSlice';
import { addSpendings } from '../../store/slices/spendingSlice';
import { IUser } from '../../API/user/firebaseUserModel';
import { IAppDispatch } from '../../store/store';
import './Auth.css';

type IAuthMode = 'login' | 'signUp';

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
  signUp: createUserWithEmailAndPassword,
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

  const spendings = await spendingStorage.getAll(uid);

  if (spendings) {
    dispatch(addSpendings(spendings));
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passRepeat, setPassRepeat] = useState('');
  const [error, setError] = useState({ state: false, message: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRepeatPassNotMatch = useMemo(
    () => pass !== passRepeat,
    [pass, passRepeat],
  );

  const onFormSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    if (mode === 'login') {
      signInWithEmailAndPassword(auth, email, pass)
        .then(async (userCredential) => {
          const { user } = userCredential;
          localStorage.setItem('@djess-v/cost-management', user.uid);
          const profile = await userStorage.getUser(user.uid);

          if (profile) {
            dispatch(logIn());
            dispatch(addUser({ uid: profile.uid, name: profile.name }));
            navigate('/');
          }
        })
        .catch((err) => {
          setError({
            state: true,
            message: 'No user with this data was found! Register!',
          });
        });
    } else {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(async (userCredential) => {
          const { user } = userCredential;
          localStorage.setItem('@dimtrygvl/expense-tracking-app', user.uid);
          dispatch(logIn());
          dispatch(addUser({ uid: user.uid, name }));
          const userId = await userStorage.createUser(user.uid, name);

          if (userId) {
            navigate('/');
          } else {
            throw new Error(
              'Something went wrong with the profile creation! Try again!',
            );
          }
        })
        .catch((err: Error) => {
          setError({
            state: true,
            message: err.message,
          });
        });
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPass('');
    setPassRepeat('');
    setError({ state: false, message: '' });
  };

  return (
    <div className="_container">
      <div className="auth">
        <h1 className="auth__title">
          {mode === 'login' ? 'Log In' : 'Sign up'}
        </h1>
        <form
          className="auth__form form-auth"
          onSubmit={onFormSubmit}
          name="form-auth"
        >
          {mode === 'signUp' && (
            <>
              <label className="auth__form_label" htmlFor="name">
                Name:
              </label>
              <input
                className="auth__form_input _input"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                id="name"
                minLength={3}
                required
              />
            </>
          )}
          <label className="auth__form_label" htmlFor="email">
            E-mail:
          </label>
          <input
            className="auth__form_input _input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            id="email"
            minLength={6}
            required
          />
          <label className="auth__form_label" htmlFor="password">
            Password:
          </label>
          <input
            className="auth__form_input _input"
            type="password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            name="password"
            id="password"
            minLength={6}
            required
          />

          {mode === 'signUp' && (
            <>
              <label className="auth__form_label" htmlFor="repeat-password">
                Repeat password:
              </label>
              <input
                className="auth__form_input _input"
                type="password"
                onChange={(e) => setPassRepeat(e.target.value)}
                value={passRepeat}
                name="repeatPassword"
                id="repeat-password"
                minLength={6}
                required
              />
            </>
          )}

          {mode === 'signUp' && isRepeatPassNotMatch && (
            <p className="auth__form_error">Passwords do not match</p>
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
              disabled={mode === 'signUp' && isRepeatPassNotMatch}
            >
              {mode === 'signUp' ? 'Create' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
