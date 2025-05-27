import React from 'react';

const Footer = () => {
  return (
      <footer
          style={{
            width: '100%',
            padding: '1rem 0',
            marginTop: '2rem',
            backgroundColor: '#f3f4f6' // 对应 bg-gray-100
          }}
      >
        <div
            style={{
              maxWidth: '1024px',
              margin: '0 auto',
              textAlign: 'center',
              color: '#4b5563' // 对应 text-gray-600
            }}
        >
          <p style={{ marginBottom: '0.5rem' }}>Created by Senyu</p>
          <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem'
              }}
          >
            <a
                href="mailto:1243669851@qq.com"
                style={{ textDecoration: 'none', color: '#4b5563' }}
            >
              QQ: 1243669851@qq.com
            </a>
            <span>|</span>
            <a
                href="https://github.com/Senyu2333"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: '#4b5563' }}
            >
              GitHub: @Senyu2333
            </a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
