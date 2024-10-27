import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MyMap } from './Map/Map';
import reportWebVitals from './reportWebVitals';
import SearchForm from './custom';
import ChatBot from './ChatBot';
import 'font-awesome/css/font-awesome.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cityName=urlParams.get('location')
const question = urlParams.get('question')
root.render(
  <>
  <MyMap cityName={cityName} question = {question}></MyMap>
    <SearchForm></SearchForm>
    {/* <ChatBot></ChatBot> */}
  </>
);



reportWebVitals();
