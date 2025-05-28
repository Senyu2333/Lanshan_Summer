import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ username, onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const showHeader = location.pathname !== '/login' && location.pathname !== '/register';


    const handleBack = () => {
        navigate(-1); //
    };

    return showHeader ? (
        <header
            style={{
                width: '100%',
                padding: '1rem 0',
                backgroundColor: '#3b82f6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
            }}
        >
            <button
                onClick={handleBack}
                style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: '1px solid white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                }}
            >
                返回
            </button>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: 'white',
                }}
            >
        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
          {username}
        </span>
                <button
                    onClick={onLogout}
                    style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: '1px solid white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '1rem',
                    }}
                >
                    登出
                </button>
            </div>
        </header>
    ) : null;
};

export default Header;
