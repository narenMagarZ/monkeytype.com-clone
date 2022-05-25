import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import {Provider} from 'react-redux'
import {legacy_createStore as createStore} from 'redux'
import reducer from './globalstate/reducer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={createStore(reducer)}>
        <App />
    </Provider>
);
