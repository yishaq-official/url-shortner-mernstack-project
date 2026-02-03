import React from 'react';

const InputForm = ({ 
  inputUrl, 
  setInputUrl, 
  onSubmit, 
  isLoading, 
  error 
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-20 px-4">
      
      {/* 1. The Headline */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Shorten Your Loooong Links
        </h1>
        <p className="text-gray-500 text-lg">
          Paste your complicated URL below and get a clean, shareable link in seconds.
        </p>
      </div>

      {/* 2. The Form Container */}
      <form onSubmit={onSubmit} className="relative">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* The Input Field */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {/* Link Icon inside input for style */}
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            
            <input
              type="text"
              className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg focus:outline-none focus:ring-4 transition-all duration-200
                ${error 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 bg-white'
                }
              `}
              placeholder="Paste your long link here (e.g., https://super-long-site.com/...)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* The Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`px-8 py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform hover:-translate-y-0.5
              ${isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30'
              }
            `}
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>

        {/* 3. Error Message (conditionally shown) */}
        {error && (
          <div className="absolute top-full mt-2 left-0 text-red-500 text-sm font-medium flex items-center animate-pulse">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
      </form>

    </div>
  );
};

export default InputForm;