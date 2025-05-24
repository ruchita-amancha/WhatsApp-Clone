import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs'
import { useDispatch } from 'react-redux';

import { createGroupChat } from '../../Redux/Chat/Action';

function NewGroup({ groupMember, setIsGroup }) {
  const [isImageUploading, setImageUploading] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const uploadToCloudinary = async (pics) => {
    try {
      setImageUploading(true);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "whatsapp");
      data.append("cloud_name", "dcq1kf9ux");

      const res = await fetch("https://api.cloudinary.com/v1_1/dcq1kf9ux/image/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      console.log("imgurl", result);
      setGroupImage(result.url.toString());
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleCreateGroup = () => {
    let userIds = [];

    // if (Array.isArray(groupMember)) {
        for (let user of groupMember) {
            userIds.push(user.id);
        }
    // } else {
    //     console.error("groupMember is not an array", groupMember);
    // }

    const group = {
        userIds,
        chat_name: groupName,
        chat_image: groupImage,
    };

    const data = {
        group,
        token
    };

    dispatch(createGroupChat(data));
    setIsGroup(false);
};


  return (
    <div className='w-full h-full'>
      <div className="flex items-center bg-[#008069] text-white space-x-10 pt-16 px-10 pb-5">
        <BsArrowLeft className='cursor-pointer text-2xl font-bold' />
        <p className='text-xl font-semibold'>New group</p>
      </div>

      <div className="flex justify-center items-center my-12 flex-col">
        <label htmlFor="imgInput" className='relative'>
          <img
            className='rounded-full w-[15vw] h-[15vw] cursor-pointer'
            src={groupImage || "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=600"}
            alt=""
          />
          {isImageUploading && <CircularProgress className='absolute top-[5rem] left-[6rem]' />}
        </label>
        <input
          type="file"
          id="imgInput"
          className='hidden'
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
        />
      </div>

      <div className='w-full justify-between flex items-center py-2 px-5'>
        <input
          className='w-full outline-none border-b-2 border-green-700 px-2 bg-transparent'
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      {groupName && (
        <div className='py-10 bg-slate-200 flex items-center justify-center'>
          <Button onClick={handleCreateGroup}>
            <div className='bg-[#0c977d] flex rounded-full p-4'>
              <BsCheck2 className='text-white font-bold text-3xl cursor-pointer' />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}

export default NewGroup;
