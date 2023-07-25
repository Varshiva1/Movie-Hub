import React from 'react'

import movies from '../images/movie.png'

import { Link } from 'react-router-dom'
function NavBar() {
  return (

    <div className='flex border space-x-10 items-center pl-4 py-5'>

      <img src={movies} className='w-[60px]' alt='Movielogo' />

      <Link to='/' className='text-blue-500'>Movies</Link>
      <Link to='/watchlist' className='text-blue-500'>Watchlist</Link>


    </div>

  )
}

export default NavBar
