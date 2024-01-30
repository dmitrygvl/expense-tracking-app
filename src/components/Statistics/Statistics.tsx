import React, { FC, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { ru } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { deserializeQuery, serializeQuery } from '../../utils/helpers';
import { updateRange } from '../../store/slices/rangeSlice';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Statistics.css';

const Statistics: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const range = useSelector((store: IRootState) => store.range);

  const selectedRange = {
    startDate: new Date(range.startDate),
    endDate: new Date(range.endDate),
  };

  useEffect(() => {
    if (location.search) {
      let start: undefined | number;
      let end: undefined | number;
      Object.entries(deserializeQuery(location.search)).forEach(
        ([key, value]) => {
          if (key === 'startDate') {
            start = new Date(value).getTime();
          }
          if (key === 'endDate') {
            end = new Date(value).getTime();
          }
        },
      );
      dispatch(
        updateRange({
          startDate: start || range.startDate,
          endDate: end || range.endDate,
        }),
      );
    }
  }, []);

  const handleSelect = (selectRange: RangeKeyDict) => {
    Object.keys(selectRange).forEach((key, i) => {
      if (i === 0) {
        const now = new Date().getTime();
        const start = selectRange[key].startDate;
        const end = selectRange[key].endDate;

        const newRange = {
          startDate: start ? start.getTime() : now,
          endDate: end ? end.getTime() : now,
        };

        dispatch(updateRange(newRange));

        const query = serializeQuery(newRange);

        if (location.pathname.includes('/statistics/table')) {
          navigate(`${PREFIX}/statistics/table${query}`, {
            replace: true,
          });
        } else if (location.pathname.includes('/statistics/chart')) {
          navigate(`${PREFIX}/statistics/chart${query}`, {
            replace: true,
          });
        } else {
          navigate(`${PREFIX}/statistics${query}`, { replace: true });
        }
      }
    });
  };

  return (
    <div className="_container">
      <div className="statistics">
        <h2 className="statistics__title">
          Select a time period, then select Table or Pie Chart
        </h2>
        <DateRangePicker
          locale={ru}
          ranges={[selectedRange]}
          onChange={handleSelect}
          direction="horizontal"
        />

        <nav className="statistics__nav nav-statistics">
          <ul className="nav-statistics__list list-nav-statistics">
            <li className="list-nav-statistics__item">
              <Link
                className="list-nav-statistics__item_link"
                to={`table${location.search}`}
              >
                Table
              </Link>
            </li>
            <li className="nav-statistics__list_item">
              <Link
                className="list-nav-statistics__item_link"
                to={`chart${location.search}`}
              >
                Pie chart
              </Link>
            </li>
          </ul>
        </nav>

        <Outlet />
      </div>
    </div>
  );
};

export default Statistics;
