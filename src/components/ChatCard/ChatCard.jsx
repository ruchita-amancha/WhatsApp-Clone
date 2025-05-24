import React from 'react'
import { format } from 'date-fns';
function ChatCard({userImg,name,timestamp}) {
    let formattedTime = '';

    if (timestamp) {
      try {
        formattedTime = format(new Date(timestamp), 'hh:mm a');
      } catch (e) {
        console.error("Invalid timestamp:", timestamp);
        formattedTime = 'Invalid time';
      }
    }
    return (
        <div className='flex items-center justify-center py-2 group cursor-pointer'>
            <div className='w-[20%]'>
                <img className='rounded-full h-14 w-14' src={userImg} alt="" />
            </div>
            <div className='pl-5 w-[80%]'>
                <div className='flex justify-between items-center'>
                    <p className='text-lg'>{name}</p>
                    <p className='text-lg'>{formattedTime}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <p>message...</p>
                    <div className='flex space-x-2 items-center'>
                        <p className='text-xs py-1 px-2 text-white bg-green-500 rounded-full'>5</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatCard