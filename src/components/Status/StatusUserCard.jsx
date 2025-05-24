import React from 'react'
import { useNavigate } from 'react-router-dom'

function StatusUserCard() {
    const navigate=useNavigate();

    const handleNavigate=()=>{
        navigate(`/status/{userId}`)
    }
  return (
    <div className='flex items-center p-3 cursor-pointer' onClick={handleNavigate} >
        <div>
            <img className='rounded-full w-7 h-7 lg:h-10 lg:w-10 cursor-pointer' src="https://cdn.pixabay.com/photo/2023/11/07/02/33/wind-power-generation-8370867_1280.jpg" alt="" />
        </div>
        <div className='text-white ml-2'>
            <p>Radhakrishn</p>
        </div>
    </div>
  )
}

export default StatusUserCard