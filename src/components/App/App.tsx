import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Auth mode="login" />} />
      <Route path="signup" element={<Auth mode="signup" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
