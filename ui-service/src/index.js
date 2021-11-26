import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { Provider } from 'react-redux'
// import store from './store'

import { action, createStore, StoreProvider } from 'easy-peasy';

const store = createStore({
    logIn: action((state, data) => {
      state.isLoggedIn = true;
      if(data.isAdmin == true){
        state.isAdmin = true;
      }
      else{
        state.user = data;
        state.userID = data.AuthorID
      }
    }),
    logOut: action((state, data) => {
      state.user = null;
      state.userID = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    }),
    isLoggedIn: false,
    isAdmin: false
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
