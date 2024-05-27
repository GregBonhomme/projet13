import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './pages/Home';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <body>
          <Header />
          <Routes>
            <Route path="/" element={ <Home />}/>
            <Route path="/sign-in" element={ <Login /> } />
          </Routes>
          <Footer />
        </body>
      </Router>
    </Provider>
  </React.StrictMode>
);
