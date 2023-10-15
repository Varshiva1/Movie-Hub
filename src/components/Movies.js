import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import WatchList from './WatchList';
import Card from './Card';
import Pagination from './Pagination';
function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [watchList, setWatchList] = useState([]);
  // const [endOfList, setEndOfList] = useState(false);
  
  const onNext = () => {
    setPageNum(pageNum + 1);
  };
  const onPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  // const movieContainerRef = useRef(null);

  const addToWatchlist = (movie) => {

    let isPresent = watchList?.find((ele) => ele.id === movie.id);

    if (!isPresent){
      setWatchList([...watchList, movie]);
      
    }
  };

  const removeFromWatchlist = (movie) => {
    console.log(movie)
    
    const filtered = watchList?.filter((ele) => ele.id !== movie.id);
    setWatchList(filtered)
  }

  console.log(watchList)

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=7af0a3ff53ab2ff0f3f224bb58d5b777&page=${pageNum}`)
      .then((res) => {
        setMovies(res.data.results);
        // const newMovies = res.data.results;
        // if (newMovies.length === 0) {
        //   setEndOfList(true);
        // } else {
        //   setMovies([...movies, ...newMovies]);
        //   setPageNum(pageNum + 1);
        // }
      });
  }, [pageNum]);

  // useEffect(() => {
  //   function handleScroll() {
  //     if (
  //       movieContainerRef.current &&
  //       window.innerHeight + window.scrollY >= movieContainerRef.current.offsetHeight &&
  //       !endOfList
  //     ) {
  //       // User has scrolled to the bottom, load more movies
  //       setPageNum(pageNum + 1);
  //     }
  //   }
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [endOfList, pageNum]);

  // console.log(movies)



  return (
    <div className='w-4/5 m-auto flex flex-col gap-10 py-12'>
      <h2 className='text-5xl font-bold text-center text-white'>Trending Movies</h2>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5'>
        {movies.map((movie) => (
          <  Card key={movie.id} movie={movie} showBookmark={true}/>
        ))}
      </div>
      <Pagination pageNumProp={pageNum} onNextProp={onNext} onPrevProp={onPrev} />
   
      {/* <WatchList watchList={watchList} removeFromWatchlist={removeFromWatchlist} />   */}
        </div> 
  );
}

export default Movies;
