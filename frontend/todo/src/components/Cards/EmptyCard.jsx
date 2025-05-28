import React from 'react'
import Lottie from 'lottie-react'
// import emptycard from' ./assets'
import emptyAnimation from '../../assets/emptycard.json';


const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <div className="w-64 h-64">
        <Lottie animationData={emptyAnimation} loop={true} />
      </div>
      <p className="mt-4 text-lg font-semibold">No tasks found</p>
    </div>
  )
}

export default EmptyCard
