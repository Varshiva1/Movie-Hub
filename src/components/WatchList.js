import star from "../images/star.png";

function WatchList(props) {
  let { watchlistprop } = props
  console.log(watchlistprop)
  return (
    <div>
      <h1>Watch List</h1>

      {
        watchlistprop?.length > 0 && watchlistprop.map((movie) =>



          <div
            key={movie.id}
            className='w-60 overflow-hidden rounded-xl border-4 hover:scale-105 duration-300 border-gray-800 text-white -inset-600 font-bold text-centre bg-opacity-20'
          >
            <div className='absolute cursor-pointer hover:scale-110'>
              {/* {watchList} */}
              {/* <img src={bookmark} className='w-[30px] mx-0.5' alt='img' /> */}
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
    </div>
  );
}

export default WatchList;
