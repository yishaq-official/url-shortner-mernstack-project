import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import { shortenUrl } from '../services/api';

const Home = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [recentLinks, setRecentLinks] = useState([]);

  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem('linkHistory')) || [];
    setRecentLinks(savedLinks);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);

    if (!inputUrl) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);

    try {
      const data = await shortenUrl(inputUrl);
      
      // --- THE FIX IS HERE ---
      // 1. Get the base URL from environment (Vercel) OR fallback to localhost
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // 2. Construct the link dynamically
      const fullShortUrl = `${baseURL}/${data.id}`;
      // -----------------------
      
      setShortUrl(fullShortUrl);

      const newLinkEntry = {
        id: data.id,
        original: inputUrl,
        short: fullShortUrl,
        date: new Date().toLocaleDateString()
      };

      const updatedLinks = [newLinkEntry, ...recentLinks].slice(0, 5);
      
      setRecentLinks(updatedLinks);
      localStorage.setItem('linkHistory', JSON.stringify(updatedLinks));

    } catch (err) {
      console.error(err);
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

        <ResultCard 
          shortUrl={shortUrl} 
          originalUrl={inputUrl}
        />

        {recentLinks.length > 0 && (
          <div className="w-full max-w-3xl mt-12 animate-fade-in-up">
            <h3 className="text-gray-500 font-medium mb-4 uppercase text-xs tracking-wider">
              Recent Links
            </h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {recentLinks.map((link) => (
                <div key={link.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-blue-600 font-semibold truncate">{link.short}</p>
                    <p className="text-gray-400 text-xs truncate max-w-md">{link.original}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                     <button 
                        onClick={() => navigator.clipboard.writeText(link.short)}
                        className="text-xs text-gray-500 hover:text-gray-900 font-medium"
                     >
                       Copy
                     </button>
                     <div className="h-4 w-px bg-gray-200"></div>
                     <Link 
                       to={`/analytics/${link.id}`}
                       className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                     >
                       Stats
                     </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Ekchun. Built with React & Node.
      </footer>
    </div>
  );
};

export default Home;