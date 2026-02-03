import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import { getAnalytics } from '../services/api';

// 1. Import Recharts components
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts';

const Dashboard = () => {
  const { id } = useParams();
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
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // --- HELPER 1: Format "Last Clicked" ---
  const getLastClickedTime = () => {
    if (!data || !data.analytics || data.analytics.length === 0) return "Never";
    const lastTimestamp = data.analytics[data.analytics.length - 1].timestamp;
    const diffInSeconds = Math.floor((Date.now() - lastTimestamp) / 1000);
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return new Date(lastTimestamp).toLocaleDateString();
  };

  // --- HELPER 2: Prepare Chart Data ---
  // Transforms raw timestamps into [ { date: 'Feb 3', clicks: 5 }, ... ]
  const processChartData = () => {
    if (!data || !data.analytics) return [];

    const clickCounts = {};

    data.analytics.forEach((entry) => {
      // Convert timestamp to readable date (e.g., "Feb 3")
      const date = new Date(entry.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      // Increment count for that day
      clickCounts[date] = (clickCounts[date] || 0) + 1;
    });

    // Convert object to array for Recharts
    return Object.keys(clickCounts).map((date) => ({
      date,
      clicks: clickCounts[date],
    }));
  };
  // ------------------------------------

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Loading stats...</div>;
  if (error) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500">{error}</div>;

  const chartData = processChartData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Statistics for ID: <span className="text-blue-600 font-mono font-medium">{id}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          <StatsCard 
            title="Unique Visitors" 
            value={data.totalClicks}
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
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

        {/* --- REAL CHART SECTION --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Click History (Last 7 Days)</h3>
          
          <div className="h-72 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar 
                    dataKey="clicks" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <p>No clicks yet.</p>
                <p className="text-sm mt-1">Share your link to see data!</p>
              </div>
            )}
          </div>
        </div>
        {/* ------------------------- */}

      </main>
    </div>
  );
};

export default Dashboard;