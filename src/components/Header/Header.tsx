import React, { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { logOut } from '../../store/slices/authSlice';
import { deleteUser } from '../../store/slices/userSlice';
import { deleteCategories } from '../../store/slices/categoriesSlice';
import { deleteSpendings } from '../../store/slices/spendingSlice';
import './Header.css';

const Header: FC = () => {
  const location = useLocation();
  const user = useSelector((store: IRootState) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logOut());
    dispatch(deleteUser());

    localStorage.setItem('@dmitrygvl/expense-tracking-app', '');
  };

  return (
    <>
      <div className="header">
        <div className="header__container header-container _container">
          <Link className="header-container__title" to={`${PREFIX}/`}>
            Expense tracking
          </Link>
          <nav className="header-container__nav nav-header">
            {user.uid && (
              <>
                <Link
                  className={`nav-header__link ${
                    location.pathname.includes('/spendings')
                      ? 'nav-header__link_active'
                      : ''
                  }`}
                  to={`${PREFIX}/spendings`}
                >
                  COSTS
                </Link>
                <Link
                  className={`nav-header__link ${
                    location.pathname === '/spendingSettings'
                      ? 'nav-header__link_active'
                      : ''
                  }`}
                  to={`${PREFIX}/spendingSettings`}
                >
                  CATEGORIES
                </Link>
              </>
            )}
            <Link
              className={`nav-header__link ${
                location.pathname.includes('/about')
                  ? 'nav-header__link_active'
                  : ''
              }`}
              to={`${PREFIX}/about`}
            >
              ABOUT
            </Link>
            {!user.uid && (
              <>
                <Link
                  className={`nav-header__link ${
                    location.pathname.includes('/login')
                      ? 'nav-header__link_active'
                      : ''
                  }`}
                  to={`${PREFIX}/login`}
                >
                  LOG IN
                </Link>
                <Link
                  className={`nav-header__link ${
                    location.pathname.includes('/signup')
                      ? 'nav-header__link_active'
                      : ''
                  }`}
                  to={`${PREFIX}/signup`}
                >
                  SIGN UP
                </Link>
              </>
            )}
            {user.uid && (
              <Link
                className={`nav-header__link`}
                to={`${PREFIX}/`}
                onClick={handleSignOut}
              >
                SIGN OUT
              </Link>
            )}
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
