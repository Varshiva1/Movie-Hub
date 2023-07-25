import React, { useEffect,useState } from 'react'

import axios from 'axios';
import { computeHeadingLevel } from '@testing-library/react';
import Pagination from './Pagination';
function Movies() {

const [movies, setMovies]=useState([]);
const[pageNum, setPageNum]=useState(1);

const onNext=()=>{
setPageNum(pageNum+1);
}
const onPrev=()=>{
    if (pageNum>1){

 setPageNum(pageNum-1);
    }
}

useEffect(()=>{
    (function(){

        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=7af0a3ff53ab2ff0f3f224bb58d5b777&page=${pageNum}`)
        .then((res)=>{
            setMovies(res.data.results);
           
        });
    })()
    
    },[pageNum])
console.log(movies);
    return (
        <div>
            <div className='text-2xl mb-8 font-bold text-center'>
                Trending Movies
            </div>
            <div className='flex flex-wrap'>
               
                {movies.map((movie)=>
                    (<div key={movie.id}
                className='w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-5 md:h[40vh] md:w[180px] hover:scale-110 duration-300 relative flex '
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})` }}>

                <div className='text-white font-bold text-centre w-full bg-gray-900 bg-opacity-60'>
                  {movie.title}
                </div>
                </div>)
                    )}

             </div>
             <Pagination pageNumProp={pageNum} onNextProp={onNext} onPrevProp={onPrev}/>
        </div>
 );
}

            export default Movies