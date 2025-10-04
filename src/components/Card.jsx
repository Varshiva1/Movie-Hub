import star from "../images/star.png";
import bookmark from "../images/bookmark.svg";
import bookmark2 from "../images/bookmark2.svg";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchList, removeFromWatchList } from "../store/slice";

export default function Card({ celebs, movie, showBookmark = false }) {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.watchList.data);

  // Determine which data is being rendered (movie or celebrity)
  const imagePath = movie?.poster_path || celebs?.profile_path;
  const title = movie?.title || celebs?.name;
  const vote = movie?.vote_average;

  useEffect(() => {
    if (movie) {
      const isInWatchlist = watchList.some((ele) => ele.id === movie.id);
      setToggle(isInWatchlist);
    }
  }, [movie, watchList]);

  return (
    <div className="relative overflow-hidden rounded-xl border-4 hover:scale-105 duration-300 border-gray-800 text-white bg-opacity-20 group">
      {/* Bookmark Button (only for movies) */}
      {showBookmark && movie && (
        <div
          className="drop-shadow-md hover:drop-shadow-xl absolute cursor-pointer hover:scale-110 z-20 top-2 right-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setToggle(!toggle);
            toggle
              ? dispatch(removeFromWatchList(movie))
              : dispatch(addToWatchList(movie));
          }}
        >
          <img
            src={toggle ? bookmark2 : bookmark}
            className="w-[40px] mx-0.5"
            alt="bookmark"
          />
        </div>
      )}

      {/* Play Button (only for movies) */}
      {movie && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center z-10 pointer-events-none group-hover:pointer-events-auto">
          <Link
            to={`/movie/${movie.id}`}
            className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-2xl pointer-events-auto"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </Link>
        </div>
      )}

      {/* Image */}
      <img
        src={`https://image.tmdb.org/t/p/original${imagePath}`}
        alt={title}
        className="w-full h-[350px] object-cover"
      />

      {/* Rating (only for movies) */}
      {vote !== undefined && (
        <div className="flex gap-2 p-3 text-white">
          <img src={star} className="w-[20px]" alt="star" />
          {vote.toFixed(1)}
        </div>
      )}

      {/* Title */}
      <div className="flex p-3 text-white text-xl font-semibold justify-center">
        {title}
      </div>
    </div>
  );
}
