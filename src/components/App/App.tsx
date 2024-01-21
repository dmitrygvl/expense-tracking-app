import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import About from '../About/About';
import SpendingSettings from '../SpendingSettings/SpendingSettings';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Auth mode="login" />} />
      <Route path="signup" element={<Auth mode="signup" />} />
      <Route path="spendingsettings" element={<SpendingSettings />} />
    </Routes>
  </BrowserRouter>
);

export default App;
