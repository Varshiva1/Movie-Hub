
import star from '../images/star.png';
import bookmark from '../images/bookmark.svg';
import bookmark2 from '../images/bookmark2.svg';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToWatchList, removeFromWatchList } from '../store/slice';

export default function Card({ movie,showBookmark = false}) {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  return (
    <div

      className='relative w-60 overflow-hidden rounded-xl border-4 hover:scale-105 duration-300 border-gray-800 text-white -inset-600 font-bold text-centre bg-opacity-20'
    >




      <div className='drop-shadow-md hover:drop-shadow-xl absolute cursor-pointer hover:scale-110' onClick={() => {
        setToggle(!toggle);
        toggle ?
          dispatch(removeFromWatchList(movie)) : dispatch(addToWatchList(movie))
      }
      }>
        {
showBookmark &&
          <img src={toggle ? bookmark2 : bookmark} className='w-[40px] mx-0.3' alt='img' />
        }
      </div>





      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='img' />
      <div className='flex gap-2 p-3 text-white'>
        <img src={star} className='w-[20px] p-l-2' alt='img' />
        {movie.vote_average.toFixed(1)}
      </div>
      <div className='flex p-3 text-white'>{movie.title}</div>
    </div>
  )
}


// box-shadow: 5px 5px 0px 0px rgba(109,40,217);