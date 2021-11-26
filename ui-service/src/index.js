import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { action, createStore, StoreProvider } from 'easy-peasy';

const store = createStore({

  setRestHost: action((state, data) => {
    state.restHost = data
  }),
  logIn: action((state, data) => {
    if (data.isAdmin == true) {
      state.isLoggedInAdmin = true;
      state.isLoggedIn = false;
    }
    else {
      state.isLoggedInAdmin = false;
      state.isLoggedIn = true;
      state.user = data;
      state.userID = data.AuthorID
    }
  }),
  logOut: action((state, data) => {
    state.user = null;
    state.userID = null;
    state.isLoggedIn = false;
    state.isLoggedInAdmin = false;
  }),
  // isLoggedIn: false,
  // isLoggedInAdmin: false,
  restHost: "http://localhost:8080"
})

ReactDOM.render(
  <StoreProvider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
