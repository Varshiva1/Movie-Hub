import React, { useEffect, useState } from 'react'
import star from '../images/star.png'
import axios from 'axios';
import { computeHeadingLevel } from '@testing-library/react';
import Pagination from './Pagination';
function Movies() {

    const [movies, setMovies] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const onNext = () => {
        setPageNum(pageNum + 1);
    }
    const onPrev = () => {
        if (pageNum > 1) {

            setPageNum(pageNum - 1);
        }
    }

    useEffect(() => {
        (function () {

            axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=7af0a3ff53ab2ff0f3f224bb58d5b777&page=${pageNum}`)
                .then((res) => {
                    setMovies(res.data.results);

                });
        })()

    }, [pageNum])
    console.log(movies);
    return (
        <div className='flex flex-col gap-10 py-12'>
            <h2 className='text-5xl font-bold text-center text-white'>
                Trending Movies
            </h2>
            <div className='w-4/5 m-auto flex flex-wrap gap-5 justify-center '>

                {movies.map((movie) =>
                (
                    <div className='w-60 overflow-hidden rounded-xl border-4 hover:scale-105 duration-300 border-gray-700 text-white -inset-600 font-bold text-centre bg-opacity-20'>


                        <img src={`https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path}`} alt="img" />

                        <div className='flex gap-2 p-3 text-white'><img src={star}className='w-[20px] p-l-2' alt="img"/>{movie.vote_average.toFixed(1)}</div>
                        <div className='flex p-3 text-white'>{movie.title}</div>


                    </div>

                )
                )}

            </div>
            <Pagination pageNumProp={pageNum} onNextProp={onNext} onPrevProp={onPrev} />
        </div>
    );
}

export default Movies