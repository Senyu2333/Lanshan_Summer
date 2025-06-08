import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmed = window.confirm('确定要退出登录吗？');
        if (confirmed) {
            dispatch(logout());
            navigate('/login');
        }
    };

    return (
        <div>
            <Header username={user ? user.username : '游客'} onLogout={handleLogout} />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout; 