import React from 'react'

import movies from '../images/movie.png'

function NavBar() {
  return (
    
     <div className='flex border space-x-10 items-center pl-4 py-5'>
      
      <img src={movies} className='w-[60px]'alt='Movielogo'/>

     <h3 className='text-blue-500'>Movies</h3>
     <h3 className='text-blue-500'>Watchlist</h3>

    </div>
    
  )
}

export default NavBar
