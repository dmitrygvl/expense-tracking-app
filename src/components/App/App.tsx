import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import About from '../About/About';
import Categories from '../Categories/Categories';
import Costs from '../Costs/Costs';
import Statistics from '../Statistics/Statistics';
import StatisticsPieChart from '../Statistics/PieChart/StatisticsPieChart';
import StatisticsTable from '../Statistics/Table/StatisticsTable';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={`${PREFIX}/`} element={<Header />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Auth mode="login" />} />
        <Route path="signup" element={<Auth mode="signup" />} />
        <Route path="categories" element={<Categories />} />
        <Route path="costs" element={<Costs />} />
        <Route path="statistics" element={<Statistics />}>
          <Route path="table" element={<StatisticsTable />} />
          <Route path="chart" element={<StatisticsPieChart />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
