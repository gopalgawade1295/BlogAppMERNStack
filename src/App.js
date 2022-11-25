import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBlogs from './pages/MyBlogs';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path='/https://blog-app-mern-gg.herokuapp.com' element={<Home />} />
          <Route path='/https://blog-app-mern-gg.herokuapp.com/login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/myblogs' element={<MyBlogs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
