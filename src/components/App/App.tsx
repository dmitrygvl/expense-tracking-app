import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import About from '../About/About';
import SpendingSettings from '../SpendingSettings/SpendingSettings';
import Spendings from '../Spendings/Spendings';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={`${PREFIX}/`} element={<Header />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Auth mode="login" />} />
        <Route path="signup" element={<Auth mode="signUp" />} />
        <Route path="setting" element={<SpendingSettings />} />
        <Route path="expenses" element={<Spendings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
