import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 mt-8 bg-gray-100">
      <div className="container mx-auto text-center text-gray-600">
        <p className="mb-2">Created by Senyu</p>
        <div className="flex justify-center items-center gap-4">
          <a 
            href="mailto:1243669851@qq.com" 
            className="hover:text-blue-600"
          >
            QQ: 1243669851@qq.com
          </a>
          <span>|</span>
          <a 
            href="https://github.com/Senyu2333" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            GitHub: @Senyu2333
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 