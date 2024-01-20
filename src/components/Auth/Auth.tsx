import React, { FC, FormEvent, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../store/slices/authSlice';
import { auth, db } from '../../API/firebase';
import './Auth.css';

type TAuthMode = 'login' | 'signup';

interface IAuthProps {
  mode: TAuthMode;
}

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
        .then((userCredential) => {
          const { user } = userCredential;
          dispatch(logIn({ uid: user.uid, name }));
          navigate('/');
        })
        .catch((err) => {
          setError({
            state: true,
            message: 'There is no user with this login',
          });
        });
    } else {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          const { user } = userCredential;
          dispatch(logIn({ uid: user.uid, name }));
          set(ref(db, `users/ + user.uid`), {
            name,
          });
          navigate('/');
        })
        .catch((err) => {
          setError({
            state: true,
            message:
              'Something went wrong. Please try to create your account again.',
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

  // return (
  //   <div className="_container">
  //     <div className="auth">
  //       <h1 className='auth__title'>
  //         {mode === 'login' ? 'Log In' : 'Sign Up'}</h1>
  //       <form
  //         className='auth__form form-auth'
  //         onSubmit={onFormSubmit}>
  //         <input
  //           type="text"
  //           placeholder="Name"
  //           value={name}
  //           onChange={(ev) => setName(ev.target.value)}
  //         />
  //         <input
  //           type="email"
  //           placeholder="Email"
  //           value={email}
  //           onChange={(ev) => setEmail(ev.target.value)}
  //         />
  //         <input
  //           type="password"
  //           placeholder="Password"
  //           value={pass}
  //           onChange={(ev) => setPass(ev.target.value)}
  //           />
  //           </div>
  //           </form>
  //   </div>
  // )

  return (
    <div className="_container">
      <div className="auth">
        <h1 className="auth_title">
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </h1>
        <form
          className="auth__form form=auth"
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
                onChange={(ev) => setName(ev.target.value)}
                value={name}
                name="name"
                minLength={3}
                required
                type="text"
              />
            </>
          )}
          <label className="auth__form_label" htmlFor="email">
            Email:
          </label>
          <input
            className="auth__form_input _input"
            type="email"
            onChange={(ev) => setEmail(ev.target.value)}
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
            onChange={(ev) => setPass(ev.target.value)}
            value={pass}
            name="password"
            id="password"
            minLength={6}
            required
          />

          {mode === 'signup' && (
            <>
              <label
                className="auth__form_input _input"
                htmlFor="repeat-password"
              >
                Repeat password
              </label>
              <input
                className="auth__form_input _input"
                type="password"
                onChange={(ev) => setPassRepeat(ev.target.value)}
                value={passRepeat}
                name="repeatPassword"
                id="repeat-password"
                minLength={6}
                required
              />
            </>
          )}

          {mode === 'signup' && isRepeatPassNotMatch && (
            <p className="auth__form_error">Password entry does not match</p>
          )}

          {error.state && <p className="auth__form_erro">{error.message}</p>}

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
              {mode === 'signup' && isRepeatPassNotMatch}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
