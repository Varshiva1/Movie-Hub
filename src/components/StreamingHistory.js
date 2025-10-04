import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearStreamingHistory } from '../store/slice';
import { Link } from 'react-router-dom';

const StreamingHistory = () => {
  const dispatch = useDispatch();
  const streamingHistory = useSelector((state) => state.watchList.streamingHistory);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your streaming history?')) {
      dispatch(clearStreamingHistory());
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Streaming History</h1>
          {streamingHistory.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Clear History
            </button>
          )}
        </div>

        {streamingHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              No streaming history yet
            </div>
            <p className="text-gray-500">Start watching movies to see your history here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamingHistory.map((record, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 rounded-lg p-6 hover:bg-opacity-70 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {record.movieTitle}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Streamed on {formatDate(record.timestamp)}
                    </p>
                  </div>
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    {record.service}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link
                    to={`/movie/${record.movieId}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    View Details
                  </Link>
                  
                  <button
                    onClick={() => {
                      // In a real app, this would redirect to the streaming service
                      alert(`Redirecting to ${record.service} to stream "${record.movieTitle}"`);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Watch Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamingHistory;
