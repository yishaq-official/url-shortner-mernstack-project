import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';

const Home = () => {
  // --- TEMPORARY STATE (Just for visual testing) ---
  const [inputUrl, setInputUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulation of what happens when you click "Shorten"
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);

    // 1. Validation Logic Visual Check
    if (!inputUrl) {
      setError('Please enter a valid URL');
      return;
    }

    // 2. Loading State Visual Check
    setIsLoading(true);

    // Fake API call delay (1.5 seconds)
    setTimeout(() => {
      setIsLoading(false);
      // Fake success result
      setShortUrl('http://localhost:5000/ad72b'); 
    }, 1500);
  };
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* 1. Navigation at the top */}
      <Navbar />

      {/* 2. Main Content Area */}
      <main className="flex-grow flex flex-col items-center pt-16 pb-12 px-4 sm:px-6">
        
        {/* Pass the state down to the InputForm */}
        <InputForm 
          inputUrl={inputUrl}
          setInputUrl={setInputUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />

        {/* Pass the result down to the Card */}
        {/* This will only appear when shortUrl is not null */}
        <ResultCard 
          shortUrl={shortUrl} 
          originalUrl={inputUrl}
        />

      </main>

      {/* 3. Simple Footer (Optional) */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} ekchun. Built with React & Node.
      </footer>

    </div>
  );
};

export default Home;