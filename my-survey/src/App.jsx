import React from 'react'
import AppRouter from './router';
import Footer from './components/Footer';
import Header from './components/Header';
function App() {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
      <div className="flex-grow">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}

export default App
