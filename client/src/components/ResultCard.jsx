import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResultCard = ({ shortUrl, originalUrl }) => {
  const [isCopied, setIsCopied] = useState(false);

  // --- THE FIX IS HERE ---
  // We extract the real ID from the shortUrl prop
  // If shortUrl is "http://localhost:5000/qlJ6aRZ4", this grabs "qlJ6aRZ4"
  const shortId = shortUrl ? shortUrl.split('/').pop() : null;
  // -----------------------

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!shortUrl) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 px-4 animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="grow min-w-0 text-center md:text-left">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Your Short Link is Ready!
            </h3>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl font-bold text-blue-600 hover:underline truncate"
              >
                {shortUrl}
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-1 truncate max-w-md">
              Redirects to: {originalUrl}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 min-w-[140px] justify-center
              ${isCopied 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {isCopied ? 'Copied!' : 'Copy URL'}
          </button>

        </div>
        
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Want to track clicks?</span>
          
          {/* Now this link points to the REAL ID */}
          <Link 
            to={`/analytics/${shortId}`} 
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View Analytics &rarr;
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default ResultCard;