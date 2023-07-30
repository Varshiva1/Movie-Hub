import React from 'react';

function WatchList(props) {
  let { watchlistprop }=props
  console.log(watchlistprop)
  return (
    <div>
      <h1>Watch List</h1>
      <ul>
        {watchlistprop && watchlistprop.length > 0 ? (
          watchlistprop.map((movie) => <li key={movie.id}>{movie.title}</li>)
        ) : (
          <div className='Bold text-color bg-red-100'>No movies in watchlist</div>
        )}
      </ul>
    </div>
  );
}

export default WatchList;
