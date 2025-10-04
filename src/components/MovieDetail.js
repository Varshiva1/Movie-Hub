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
      {/* Hero Section with Backdrop */}
      <div className="relative">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>

        {/* Back Button */}
        <div className="relative z-10 p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 hover:bg-black/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-end">
            {/* Movie Poster */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="relative group">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Bookmark Button */}
                <button
                  onClick={handleBookmark}
                  className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-all hover:scale-110"
                >
                  <img
                    src={isBookmarked ? bookmark2 : bookmark}
                    className="w-6 h-6"
                    alt="bookmark"
                  />
                </button>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-2xl flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-2xl">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Movie Details */}
            <div className="flex-1 text-white pb-8">
              <div className="space-y-6">
                {/* Title and Rating */}
                <div>
                  <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">{movie.title}</h1>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                      <img src={star} className="w-6 h-6" alt="star" />
                      <span className="text-xl font-bold">{movie.vote_average.toFixed(1)}</span>
                      <span className="text-gray-300 text-sm">/10</span>
                    </div>
                    <div className="text-gray-300 text-lg">
                      {movie.vote_count.toLocaleString()} votes
                    </div>
                    <div className="text-gray-300 text-lg">
                      {movie.runtime} min
                    </div>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-3">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-medium shadow-lg"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <div className="max-w-4xl">
                  <h3 className="text-2xl font-bold mb-4">Overview</h3>
                  <p className="text-xl leading-relaxed text-gray-200">{movie.overview}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowStreamingOptions(!showStreamingOptions)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Where to Watch
                  </button>
                  
                  <button
                    onClick={handleBookmark}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all border border-white/20 flex items-center gap-3"
                  >
                    <img
                      src={isBookmarked ? bookmark2 : bookmark}
                      className="w-6 h-6"
                      alt="bookmark"
                    />
                    {isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="font-bold text-lg mb-3 text-white">Release Date</h4>
            <p className="text-gray-300 text-lg">{new Date(movie.release_date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="font-bold text-lg mb-3 text-white">Runtime</h4>
            <p className="text-gray-300 text-lg">{movie.runtime} minutes</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="font-bold text-lg mb-3 text-white">Status</h4>
            <p className="text-gray-300 text-lg">{movie.status}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="font-bold text-lg mb-3 text-white">Budget</h4>
            <p className="text-gray-300 text-lg">${movie.budget.toLocaleString()}</p>
          </div>
        </div>

        {/* Streaming Services Section */}
        {showStreamingOptions && (
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold mb-8 text-white text-center">Available on Streaming Platforms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {streamingServices.map((service, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                    service.available
                      ? 'border-green-500/50 bg-gradient-to-br from-green-900/20 to-green-800/20 hover:from-green-900/30 hover:to-green-800/30 cursor-pointer shadow-lg hover:shadow-green-500/20'
                      : 'border-gray-600/50 bg-gray-800/20 opacity-60'
                  }`}
                  onClick={() => service.available && handleStream(service)}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xl text-white">{service.name}</h4>
                      {service.available ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Available
                        </span>
                      ) : (
                        <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Not Available
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-300 text-lg font-semibold">{service.price}</p>
                      <p className="text-gray-400 text-sm">{service.quality} Quality</p>
                    </div>
                    {service.available && (
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors">
                        Stream Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
