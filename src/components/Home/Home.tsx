import React, { FC } from 'react';
// import { useSelector } from "react-redux/es/exports";
import { useSelector } from 'react-redux';
import './Home.css';
import { TRootState } from '../../store/store';

const Home: FC = () => {
  const auth = useSelector((store: TRootState) => store.auth);

  return (
    <div className="_container">
      <div className="home">
        <h1>{`Welcome${'name' in auth ? `, ${auth.name}` : ''}!`}</h1>
      </div>
    </div>
  );
};

export default Home;
