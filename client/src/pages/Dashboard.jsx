import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // <--- NEW: To get ID from URL
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import { getAnalytics } from '../services/api'; // <--- NEW: Import API

const Dashboard = () => {
  const { id } = useParams(); // Get the ID from the URL (e.g. "ad72b")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAnalytics(id);
        setData(result);
      } catch (err) {
        setError("Link not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // --- HELPER FUNCTION: Format "Last Clicked" ---
  const getLastClickedTime = () => {
    if (!data || !data.analytics || data.analytics.length === 0) return "Never";
    
    const lastTimestamp = data.analytics[data.analytics.length - 1].timestamp;
    const diffInSeconds = Math.floor((Date.now() - lastTimestamp) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return new Date(lastTimestamp).toLocaleDateString();
  };
  // ---------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-500">Loading stats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-red-500">{error}</p>
        <a href="/" className="mt-4 text-blue-600 hover:underline">Go back home</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Statistics for ID: <span className="text-blue-600 font-mono font-medium">{id}</span>
          </p>
        </div>

        {/* The Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Total Clicks */}
          <StatsCard 
            title="Total Clicks" 
            value={data.totalClicks}
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
          />

          {/* Card 2: Unique Visitors (Placeholder logic for now) */}
          <StatsCard 
            title="Unique Visitors" 
            value={data.totalClicks} // In V1, we treat clicks as visitors
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />

          {/* Card 3: Last Active */}
          <StatsCard 
            title="Last Clicked" 
            value={getLastClickedTime()}
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Placeholder for the Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center h-64">
          <div className="p-4 bg-gray-50 rounded-full mb-4">
             <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
             </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Click History Chart</h3>
          <p className="text-gray-500 max-w-sm mt-1">
            Data is being collected. Chart integration coming in next update.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;