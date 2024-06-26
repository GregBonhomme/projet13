import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
          <Header />
          <Routes>
            <Route path="/" element={ <Home />}/>
            <Route path="/sign-in" element={ <Login /> } />
            <Route path="/user" element={ <User /> }/>
          </Routes>
          <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);
