import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              {/* Simple link icon (pure SVG for visuals) */}
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-800 tracking-tight">
              እቅጩን
            </span>
          </div>

          {/* Right Side: GitHub/Portfolio Link (Optional) */}
          <div>
            <a 
              href="#" 
              className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              My Portfolio
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;