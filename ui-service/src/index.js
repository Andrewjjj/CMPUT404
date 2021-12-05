import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { action, createStore, StoreProvider, persist, useStoreRehydrated } from 'easy-peasy';

const store = createStore(
  persist({
    isLoggedIn: false,
    isLoggedInAdmin: false,
    author: null,
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
        state.author = data
      }
    }),
    logOut: action((state, data) => {
      console.log("CALLED??")
      state.author = null;
      state.isLoggedIn = false;
      state.isLoggedInAdmin = false;
    }),
    // isLoggedIn: false,
    // isLoggedInAdmin: false,
    // restHost: "https://fast-chamber-90421.herokuapp.com"
    restHost: "http://localhost:8080"
  })
)
ReactDOM.render(
  // <PersistGate loading={<div>Loading</div>} persistor={persistor}>
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
