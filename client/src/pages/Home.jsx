import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import { shortenUrl } from '../services/api'; // <--- NEW IMPORT

const Home = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Updated to be ASYNC to handle the API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);

    // 1. Validation
    if (!inputUrl) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);

    try {
      // 2. REAL API CALL
      const data = await shortenUrl(inputUrl);
      
      // 3. Construct the full link
      // Note: In production, you would change 'localhost:5000' to your real domain
      const fullShortUrl = `http://localhost:5000/${data.id}`;
      
      setShortUrl(fullShortUrl);
    } catch (err) {
      console.error(err);
      // Better error message handling
      setError("Failed to shorten link. Is the server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <Navbar />

      <main className="flex-grow flex flex-col items-center pt-16 pb-12 px-4 sm:px-6">
        
        <InputForm 
          inputUrl={inputUrl}
          setInputUrl={setInputUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />

        {/* The ResultCard handles the "Copy" logic automatically */}
        <ResultCard 
          shortUrl={shortUrl} 
          originalUrl={inputUrl}
        />

      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Ekchun. Built with React & Node.
      </footer>

    </div>
  );
};

export default Home;