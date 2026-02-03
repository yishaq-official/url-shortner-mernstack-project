import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResultCard = ({ shortUrl, originalUrl }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Temporary ID for testing. Later this will come from the backend response.
  const shortId = "demo123"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    
    // Reset the "Copied" status after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!shortUrl) return null; // Don't show anything if there is no result yet

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 px-4 animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Side: URL Info */}
          <div className="flex-grow min-w-0 text-center md:text-left">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Your Short Link is Ready!
            </h3>
            <div className="flex items-center justify-center md:justify-start gap-2">
              {/* FIX 1: Use <a> for the external short link, NOT <Link> */}
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

          {/* Right Side: Action Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 min-w-[140px] justify-center
              ${isCopied 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {isCopied ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy URL
              </>
            )}
          </button>

        </div>
        
        {/* Bottom Strip: Analytics Teaser */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Want to track clicks?</span>
          
          {/* FIX 2: Use <Link to="..."> for internal navigation */}
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