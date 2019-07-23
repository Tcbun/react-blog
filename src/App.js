import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Headerc from './components/headerc';
import Home from './pages/home';
import Register from './pages/register';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Headerc />
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
