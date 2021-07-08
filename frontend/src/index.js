import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBs4tfv8QLdmBV4SS7HjgMLM7kg8YI_IRU",
  authDomain: "offlineclasses-59502.firebaseapp.com",
  projectId: "offlineclasses-59502",
  storageBucket: "offlineclasses-59502.appspot.com",
  messagingSenderId: "928456831128",
  appId: "1:928456831128:web:5f3ea85a0c1ba5eb61e0ed"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
