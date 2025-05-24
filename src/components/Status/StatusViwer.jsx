import React, { useEffect, useState } from 'react'
import { Stories } from './DummyStory'
import ProgressBar from './ProgressBar';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function StatusViwer() {

    const navigate=useNavigate();
    const [currentStoryIndex,setCurrentStoryIndex]=useState(0);
    const [activeIndex,setActiveIndex]=useState(0);

    const handleNextStory=()=>{
        if(currentStoryIndex<Stories?.length-1){
            setCurrentStoryIndex(currentStoryIndex+1)
            setActiveIndex(activeIndex+1)
        }
        else{
            setCurrentStoryIndex(0);
            setActiveIndex(0)
        }
    }
    useEffect(()=>{
        const intervalId=setInterval(()=>{
            handleNextStory();
        },2000)
        return()=>clearInterval(intervalId)
    },[currentStoryIndex])

    const handleNavigate=()=>{
        navigate(-1)
    }

  return (
    <div>
        <div className='relative flex justify-center items-center h-[100vh] bg-slate-900'>
            <div className='relative'>
                <img className='max-h-[96vh] object-contain' src={Stories?.[currentStoryIndex].image} alt="" />
                <div className='absolute top-0 flex w-full'>
                    {Stories.map((item,index)=><ProgressBar key={index} duration={2000} index={index} activeIndex={activeIndex}/>)}
                </div>
            </div>
            <div>
                <BsArrowLeft onClick={handleNavigate} className='text-white text-4xl cursor-pointer absolute top-5 left-10'  />
                <AiOutlineClose onClick={handleNavigate} className='text-white text-4xl cursor-pointer absolute top-5 right-10'  />
            </div>
        </div>
    </div>
  )
}

export default StatusViwer