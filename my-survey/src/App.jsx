import React from 'react'
import AppRouter from './router';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}

export default App
