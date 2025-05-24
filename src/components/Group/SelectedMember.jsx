import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function SelectedMember({handleRemoveMember,member}) {
  return (
    <div className='flex items-center bg-slate-300 rounded-full'>
         <img className='rounded-full w-7 h-7 cursor-pointer' src={member.profile_picture} alt="" />
            <p className='px-2'>{member.full_name}</p>
            <AiOutlineClose onClick={handleRemoveMember} className='pr-1 cursor-pointer'/>
    </div>
  )
}

export default SelectedMember