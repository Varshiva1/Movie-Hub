import React from 'react'
import next from '../images/next.png';
import back from '../images/back.png';
function pagination(props) {
  let { pageNumProp, onNextProp, onPrevProp } = props
  return (
    <div className=' w-100% flex justify-center my-4 text-white'>


      <div onClick={onPrevProp} className='p2 rounded-r-xl hover:scale-110'>
        <img src={back} className='w-[30px] invert' alt='previous' />
      </div>
      <div className='border-3 border-r-1 mx-8'>
        {pageNumProp}
      </div>
      <div onClick={onNextProp} className=' p2 rounded-r-xl hover:scale-110'>
        <img src={next} className='w-[30px] invert' alt='next' />
      </div>
    </div>
  )
}

export default pagination
