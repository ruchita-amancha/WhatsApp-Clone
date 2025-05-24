import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../Redux/Auth/Action';
import { useDispatch, useSelector } from 'react-redux';

function Profile({ handleCloseOpenProfile }) {

    const [flag, setFlag] = useState(false);
    const [username, setUsername] = useState(null);
    const [tempPicture, setTempPicture] = useState(null)
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();

    const data = {
        id: auth.reqUser.id,
        token: localStorage.getItem("token"),
        data: { full_name: username },
    }

    const handleFlag = () => {
        setFlag(true)
    }

    const handleCheckClick = () => {
        setFlag(false);
        handleUpdateName()
    }

    const handleNavigate = () => {
        navigate(-1)
    }

    const handleChange = (e) => {
        setUsername(e.target.value)
        console.log(username);

    }

    const uploadToCloudiary = (pics) => {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "whatsapp");
        data.append("cloud_name", "dcq1kf9ux");
        fetch("https://api.cloudinary.com/v1_1/dcq1kf9ux/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("imgurl", data);
                setTempPicture(data.url.toString());

                const dataa = {
                    id: auth.reqUser.id,
                    token: localStorage.getItem("token"),
                    data: { profile_picture: data.url.toString() },
                }
                dispatch(updateUser(dataa));

            })
    }

     const handleUpdateName=(e)=>{
            const data = {
            id: auth.reqUser.id,
            token: localStorage.getItem("token"),
            data: { full_name: username },
        }
        if(e.target.key==="Enter")
          dispatch(updateUser(data))
        
      }

    return (
        <div className='w-full h-full'>
            <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
                <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleCloseOpenProfile} />
                <p className='cursor-pointer font-semibold'>Profile</p>
            </div>

            {/*Update Profile pic section */}
            <div className='flex flex-col justify-center items-center my-12'>
                <label htmlFor="imgInput">
                    <img className='rounded-full w-[15vw] h-[15vw] cursor-pointer' src={auth.reqUser?.profile_picture || tempPicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png%22:(auth.reqUser?.id%20!==%20currentChat.users[0]?.id%20?%20currentChat.users[0].profile_picture%20||%20%22https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png%22%20:%20currentChat.users[1].profile_picture%20||%20%22https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
                </label>
                <input onChange={(e) => uploadToCloudiary(e.target.files[0])} type="file" id="imgInput" className='hidden' />
            </div>

            {/* Name section */}
            <div className='bg-white px-3'>
                <p className='py-3'>Your Name</p>
                {!flag && <div className='w-full flex justify-between items-center'>
                    <p className='py-3'>{username || "username"}</p>
                    <BsPencil className='cursor-pointer' onClick={handleFlag} />
                </div>}

                {flag && <div className='w-full flex justify-between items-center py-2'>
                    <input onClick={handleUpdateName} onChange={handleChange} className='w-[80%] outline-none border-b-2 border-blue-700 p-2' type="text" placeholder='Enter your name' />
                    <BsCheck2 onClick={handleCheckClick} className='cursor-pointer text-2xl' />

                </div>}
            </div>

            <div className='px-3 my-5'>
                <p className='py-10'>This is not your username, this name will be visible to your whatsapp contacts</p>
            </div>
        </div>
    )
}

export default Profile