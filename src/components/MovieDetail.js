import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import star from '../images/star.png';
import bookmark from '../images/bookmark.svg';
import bookmark2 from '../images/bookmark2.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchList, removeFromWatchList, addToStreamingHistory } from '../store/slice';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.watchList.data);
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showStreamingOptions, setShowStreamingOptions] = useState(false);

  // Mock streaming services data
  const streamingServices = [
    { name: 'Netflix', available: true, price: '$15.99/month', quality: '4K' },
    { name: 'Amazon Prime', available: true, price: '$14.99/month', quality: 'HD' },
    { name: 'Disney+', available: false, price: '$7.99/month', quality: 'HD' },
    { name: 'HBO Max', available: true, price: '$15.99/month', quality: '4K' },
    { name: 'Hulu', available: false, price: '$7.99/month', quality: 'HD' },
  ];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=7af0a3ff53ab2ff0f3f224bb58d5b777&append_to_response=videos,credits`
        );
        setMovie(response.data);
        
        // Check if movie is in watchlist
        const isInWatchlist = watchList.some((m) => m.id === response.data.id);
        setIsBookmarked(isInWatchlist);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, watchList]);

  const handleBookmark = () => {
    if (movie) {
      if (isBookmarked) {
        dispatch(removeFromWatchList(movie));
      } else {
        dispatch(addToWatchList(movie));
      }
      setIsBookmarked(!isBookmarked);
    }
  };

  const handleStream = (service) => {
    // Add to streaming history
    dispatch(addToStreamingHistory({
      movieId: movie.id,
      movieTitle: movie.title,
      service: service.name
    }));
    
    // In a real app, this would redirect to the streaming service
    alert(`Redirecting to ${service.name} to stream "${movie?.title}"`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-white text-2xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Back Button */}
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="lg:w-1/3">
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
              />
              {/* Bookmark Button */}
              <button
                onClick={handleBookmark}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
              >
                <img
                  src={isBookmarked ? bookmark2 : bookmark}
                  className="w-6 h-6"
                  alt="bookmark"
                />
              </button>
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:w-2/3 text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">{movie.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <img src={star} className="w-6 h-6" alt="star" />
              <span className="text-xl font-semibold">{movie.vote_average.toFixed(1)}/10</span>
              <span className="text-gray-300">({movie.vote_count} votes)</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-purple-600 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-3">Overview</h3>
              <p className="text-lg leading-relaxed text-gray-300">{movie.overview}</p>
            </div>

            {/* Movie Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-semibold text-lg mb-2">Release Date</h4>
                <p className="text-gray-300">{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Runtime</h4>
                <p className="text-gray-300">{movie.runtime} minutes</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Status</h4>
                <p className="text-gray-300">{movie.status}</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Budget</h4>
                <p className="text-gray-300">${movie.budget.toLocaleString()}</p>
              </div>
            </div>

            {/* Streaming Options */}
            <div className="mb-8">
              <button
                onClick={() => setShowStreamingOptions(!showStreamingOptions)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Where to Watch
              </button>
            </div>

            {/* Streaming Services List */}
            {showStreamingOptions && (
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Available on:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {streamingServices.map((service, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        service.available
                          ? 'border-green-500 bg-green-900 bg-opacity-20 hover:bg-opacity-30 cursor-pointer'
                          : 'border-gray-600 bg-gray-800 bg-opacity-20 opacity-50'
                      }`}
                      onClick={() => service.available && handleStream(service)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-lg">{service.name}</h4>
                          <p className="text-gray-300">{service.price}</p>
                          <p className="text-sm text-gray-400">{service.quality}</p>
                        </div>
                        <div className="text-right">
                          {service.available ? (
                            <span className="text-green-400 font-semibold">Available</span>
                          ) : (
                            <span className="text-gray-500">Not Available</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
