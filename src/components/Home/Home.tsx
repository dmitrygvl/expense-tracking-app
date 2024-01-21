import React, { FC } from 'react';
// import { useSelector } from "react-redux/es/exports";
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import './Home.css';
import { TRootState } from '../../store/store';

const Home: FC = () => {
  const user = useSelector((store: TRootState) => store.user);

  return (
    <div className="_container">
      <div className="home">
        <h1>{`Welcome${'name' in user ? `, ${user.name}` : ''}!`}</h1>
      </div>
    </div>
  );
};

export default Home;
