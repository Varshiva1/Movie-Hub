import React from 'react'

function Movies() {
    return (
        <div>
            <div className='text-2xl mb-8 font-bold text-center'>
                Trending Movies
            </div>
            <div className='flex'>

                <div 
                 className='w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-5 md:h[40vh] md:w[180px] hover:scale-110 duration-300 relative flex '
                    style={{ backgroundImage: `url(${require('../images/card.webp')})` }}>

                </div>
                

                <div 
                 className='w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-5 md:h[40vh] md:w[180px] hover:scale-110 duration-300 relative flex '
                        style={{ backgroundImage: `url(${require('../images/card.webp')})` }}>

                </div>

                <div 
                 className='w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-5 md:h[40vh] md:w[180px] hover:scale-110 duration-300 relative flex '
                        style={{ backgroundImage: `url(${require('../images/card.webp')})` }}>

                </div>

             </div>

        </div>
 );
}

            export default Movies