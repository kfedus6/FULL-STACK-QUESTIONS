import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const store = setupStore()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <App />
        <ToastContainer position='bottom-left' theme='light' transition={Slide} autoClose={3000} />
    </Provider>
)
