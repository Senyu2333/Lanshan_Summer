import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppRouter from './router';
import Footer from './components/Footer';
import Header from './components/Header';
import { logout } from './store/authSlice';

function App() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header username={user ? user.username : '游客'} onLogout={handleLogout} />
            <div className="flex-grow">
                <AppRouter />
            </div>
            <Footer />
        </div>
    );
}

export default App;
