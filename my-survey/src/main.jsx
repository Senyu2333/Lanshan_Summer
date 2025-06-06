import { createRoot } from 'react-dom/client'
import React from "react";
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import './index.css';
import {useDispatch} from 'react-redux'
import {loggedIn} from './store/authSlice.js'
import {useEffect} from 'react';
import axios from "axios";
function Init({children}) {
    const dispatch = useDispatch();
    useEffect(() => {
        const User = localStorage.getItem('user');
        const Token = localStorage.getItem('token');
        if(User && Token){
            try{
                const obj = JSON.parse(User);
                axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;
                dispatch(loggedIn({ user: obj, token: Token }));
            } catch (err) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    },[dispatch]);
    return <>{children}</>;
}
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <Init>
                <App />
            </Init>
        </BrowserRouter>
    </Provider>

)
