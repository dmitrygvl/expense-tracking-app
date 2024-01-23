import React, { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { logOut } from '../../store/slices/authSlice';
import { deleteUser } from '../../store/slices/userSlice';
import { deleteCategories } from '../../store/slices/categoriesSlice';
import { deleteCosts } from '../../store/slices/costsSlice';
import { updateRange } from '../../store/slices/rengeSlice';
import './Header.css';

const now = new Date().getTime();

const Header: FC = () => {
  const location = useLocation();
  const user = useSelector((store: IRootState) => store.user);
  const dispatch = useDispatch();

  // const handleSignOut = () => {
  //   dispatch(logOut());
  //   dispatch(deleteUser());

  //   localStorage.setItem('@dmitrygvl/expense-tracking-app', '');
  // };
  const handleSignOut = () => {
    dispatch(deleteUser());
    dispatch(
      updateRange({
        startDate: now,
        endDate: now,
      }),
    );
    dispatch(deleteCategories());
    dispatch(deleteCosts());
  };

  return (
    <>
      <header className="header">
        <div className="header__container header-container _container">
          <Link className="header-container__title" to={`${PREFIX}/`}>
            Expense tracking
          </Link>
          <nav className="header-container__nav nav-header">
            {user.uid && (
              <>
                <Link
                  className={`nav-header__link ${
                    location.pathname.includes('/costs')
                      ? 'nav-header__link_active'
                      : ''
                  }`}
                  to={`${PREFIX}/costs`}
                >
                  COSTS
                </Link>
                <Link
                  className={`nav-header__link ${
                    location.pathname === '/costSettings'
                      ? 'nav-header__link_active'
                      : ''
                  }`}
                  to={`${PREFIX}/costSettings`}
                >
                  CATEGORIES
                </Link>
                <Link
                  className={`nav-header__link ${
                    location.pathname.includes('/reports')
                      ? 'nav-header__link_active'
                      : ''
                  }`}
                  to={`${PREFIX}/reports`}
                >
                  REPORTS
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
      </header>
      <Outlet />
    </>
  );
};

export default Header;
