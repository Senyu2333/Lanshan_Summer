import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './Layout/MainLayout';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    
    if (!user) {
        alert('您需要登录才能执行此操作');
        return <Navigate to="/login" replace />;
    }

    return <MainLayout>{children}</MainLayout>;
};

export default ProtectedRoute; 