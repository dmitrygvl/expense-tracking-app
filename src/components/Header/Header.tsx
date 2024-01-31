import React, { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { deleteUser } from '../../store/slices/userSlice';
import { deleteCategories } from '../../store/slices/categoriesSlice';
import { deleteCosts } from '../../store/slices/costsSlice';
import { updateRange } from '../../store/slices/rangeSlice';
import { serializeQuery } from '../../utils/helpers';
import './Header.css';

const now = new Date().getTime();

const Header: FC = () => {
  const location = useLocation();
  const user = useSelector((store: IRootState) => store.user);
  const range = useSelector((store: IRootState) => store.range);
  const dispatch = useDispatch();

  const query = serializeQuery(range);

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
                    location.pathname.includes('/categories')
                      ? 'nav-header__link_active'
                      : ''
                  }`}
                  to={`${PREFIX}/categories`}
                >
                  CATEGORIES
                </Link>
                <Link
                  className={`nav-header__link ${
                    location.pathname.includes('/statistics')
                      ? 'nav-header__link_active'
                      : ''
                  }`}
                  to={`${PREFIX}/statistics${query}`}
                >
                  STATISTICS
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
