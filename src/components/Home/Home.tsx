import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import './Home.css';

const Home: FC = () => {
  const user = useSelector((store: IRootState) => store.user);
  return (
    <div className="_container">
      <div className="home">
        <h2 className="home__title">{`Welcome${user.name ? `, ${user.name}` : ''}!`}</h2>
        <h3 className="home__subtitle">
          This is your personal budget assistant app
        </h3>
      </div>
    </div>
  );
};

export default Home;
