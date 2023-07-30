import React, { useEffect, useState } from 'react';
import star from '../images/star.png';
import axios from 'axios';
import bookmark from '../images/bookmark (1).png';
import Pagination from './Pagination';
import WatchList from './WatchList';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [watchList, setWatchList] = useState([]);
  const [notification, setNotification] = useState('');

  const onNext = () => {
    setPageNum(pageNum + 1);
  };

  const onPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const addToWatchlist = (id) => {
    // Check if the movie is already in the watchlist to avoid duplicates
    if (!watchList.find((item) => item.id === id.id)) {
      setWatchList([...watchList, id.id]);
      console.log(setWatchList)
      setNotification(`${id.title} added to watchlist!`);
    }
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=7af0a3ff53ab2ff0f3f224bb58d5b777&page=${pageNum}`)
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [pageNum]);
// console.log(movies)
  return (
    <div className='flex flex-col gap-10 py-12'>
      <h2 className='text-5xl font-bold text-center text-white'>Trending Movies</h2>
      {notification && <p>{notification}</p>}
      <div className='w-4/5 m-auto flex flex-wrap gap-5 justify-center '>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className='w-60 overflow-hidden rounded-xl border-4 hover:scale-105 duration-300 border-gray-800 text-white -inset-600 font-bold text-centre bg-opacity-20'
          >
            <div className='absolute cursor-pointer hover:scale-110' onClick={() => addToWatchlist(movie)}>
              {watchList}
              <img src={bookmark} className='w-[30px] mx-0.5' alt='img' />
            </div>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='img' />
            <div className='flex gap-2 p-3 text-white'>
              <img src={star} className='w-[20px] p-l-2' alt='img' />
              {movie.vote_average.toFixed(1)}
            </div>
            <div className='flex p-3 text-white'>{movie.title}</div>
          </div>
        ))}
      </div>
      <Pagination pageNumProp={pageNum} onNextProp={onNext} onPrevProp={onPrev} />
      <WatchList watchlistprop={watchList} />
    </div>
  );
}

export default Movies;
