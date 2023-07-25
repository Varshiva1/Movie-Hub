import React from 'react'
import next from '../images/next.png'
function pagination(props) {
  let { pageNumProp, onNextProp, onPrevProp } = props
  return (
    <div className='flex justify-center my-4 hover:scale-110 text-white'>


      <div onClick={onPrevProp} className='border-2 p2 rounded-l-xl hover:scale-110 border-blue-400'>
       previous
      </div>
      <div className='border-2 border-r-1'>
        {pageNumProp}
      </div>
      <div onClick={onNextProp} className='border-2 p2 rounded-r-xl hover:scale-110 border-blue-400'>
      <img src={next} color='white'  className='w-[20px]'/>
      </div>
    </div>
  )
}

export default pagination
