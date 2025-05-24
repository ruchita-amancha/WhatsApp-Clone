import React, { useEffect, useState } from 'react'
import { TbCircleDashed } from 'react-icons/tb';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from 'react-icons/bs';
import ChatCard from './ChatCard/ChatCard';
import MessageCard from './MessageCard/MessageCard';
import { ImAttachment } from 'react-icons/im';
import './HomePage.css'
import { useNavigate } from 'react-router-dom';
import Profile from './Profile/Profile';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CreateGroup from './Group/CreateGroup';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, logoutAction, searchUser } from '../Redux/Auth/Action';
import { createChat, getUsersChat } from '../Redux/Chat/Action';
import { createMessage,getAllMessages } from '../Redux/Message/Action';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

function HomePage() {

  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, chat, message } = useSelector(store => store);
  const token = localStorage.getItem("token");

  const [stompClient, setStompClient] = useState();
  const [isConnect, setIsConnected] = useState(false);
  const[messages,setMessages]=useState([]);

  const connect = () => {
    const sock = new SockJS("http://localhost:8081/ws");
    const temp = over(sock);
    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${token}`
    };

    temp.connect(
      headers,
      (frame) => {
        console.log("Connected: " + frame);
        setIsConnected(true);
      },
      (error) => {
        console.error("STOMP connection error:", error);
      }
    );
  };

  // const onMessageReceive = (payload) => {
  //   const receivedMessage = JSON.parse(payload.body);
  //   dispatch({ type: 'NEW_MESSAGE_RECEIVED', payload: receivedMessage });
  // }

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    setMessages([...messages,receivedMessage]);
    // dispatch({
    //   type: 'NEW_MESSAGE_RECEIVED',
    //   payload: receivedMessage,
    // });
  };

  
useEffect(()=>{
  if(message.newMessage && stompClient){
  setMessages([...messages,message.newMessage])
  stompClient?.send("/app/message",{},JSON.stringify(message.newMessage))
  }
},[message.newMessage])

useEffect(()=>{
  setMessages(message.messages )
},[message.messages])



  useEffect(() => {
    if (isConnect && stompClient && auth.reqUser&& currentChat) {
      const subscription = stompClient.subscribe("/group/" + currentChat.id.toString(), onMessageReceive);
      return () => {
        subscription.unsubscribe();
      }
    }
  }, [isConnect, stompClient, currentChat]);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    dispatch(currentUser(token));
  }, [token]);

  useEffect(() => {
    if (auth.reqUser == null) {
      navigate("/signup");
    }
  }, [auth.reqUser]);

  useEffect(() => {
    dispatch(getUsersChat({ token }));
  }, [chat.createChat, chat.CreateGroup]);

  const handleSearch = (keyword) => {
    dispatch(searchUser(keyword, token));
  }

  const handleClickOnChatCard = (userId) => {
    dispatch(createChat({ userId }, token));
  }

  const handleNavigate = () => {
    setIsProfile(true);
  }

  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGroup = () => {
    setIsGroup(true);
  }

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/signin");
  }

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
    dispatch(getAllMessages({ chatId: item.id, token }));
  }

  const handleCreateNewMessage = () => {
    dispatch(createMessage({ chatId: currentChat.id, content }));
  }

  // const messages2 = useSelector((state) => state.message.messages);


  console.log("current chat", currentChat);


  return (
    <div className='relative'>
      <div className='py-14 bg-[#00a884] w-full'> </div>
      <div className='flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] left-[2vw] w-[96vw]'>

        {/* Left Part */}
        <div className="left w-[30%] h-full bg-[#e8e9ec]">

          {/* Profile */}
          {isProfile && <div className='w-full'><Profile handleCloseOpenProfile={handleCloseOpenProfile} /></div>}

          {/* Create Group */}
          {isGroup && <CreateGroup setIsGroup={setIsGroup} />}

          {/* Home */}
          {!isProfile && !isGroup && <div className='w-full'>
            <div className='flex justify-between items-center p-3'>
              <div className='flex items-center space-x-3' onClick={handleNavigate}>
                <img className='rounded-full w-10 h-10 cursor-pointer' src={auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png%22:(auth.reqUser?.id%20!==%20currentChat.users[0]?.id%20?%20currentChat.users[0].profile_picture%20||%20%22https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png%22%20:%20currentChat.users[1].profile_picture%20||%20%22https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
                <p>{auth.reqUser?.full_name}</p>
              </div>
              <div className='space-x-3 text-2xl flex'>
                <TbCircleDashed className="cursor-pointer" onClick={() => navigate("/status")} />
                <BiCommentDetail />
                <div>
                  <BsThreeDotsVertical id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick} className="cursor-pointer" />

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>

              </div>
            </div>


            <div className='relative flex justify-center items-center bg-white px-3 py-4'>
              {/* search input */}
              <input type="text" className='border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2'
                placeholder='Search or start new chat'
                onChange={(e) => {
                  setQuerys(e.target.value)

                  handleSearch(e.target.value, token)
                }}
                value={querys}
              />
              <AiOutlineSearch className='left-5 top-7 absolute'></AiOutlineSearch>
              <div>
                <BsFilter className='ml-4 text-3xl'></BsFilter>
              </div>
            </div>
            {/* All users */}
            <div className='bg-white overflow-scroll h-[72vh] px-3'>
              {querys && Array.isArray(auth.searchUser) && auth.searchUser.map((item) => (
                <div onClick={() => handleClickOnChatCard(item.id)} key={item.id}> {/* Add a unique key if available */}
                  <hr />
                  <ChatCard
                    name={item.full_name}
                    userImg={
                      item.profile_picture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  />
                </div>
              ))}
              {/* {chat.chats && chat.chats.length > 0 && !querys && Array.isArray(chat.chats) && chat.chats.map((item) => (
                <div onClick={() => handleCurrentChat(item)} key={item.id}>
                  <hr />
                  {item.isGroup ? (
                    <ChatCard
                      name={item.chat_name}
                      userImg={item.chat_image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    />
                  ) : (
                    <ChatCard
                      isChat={true}
                      name={auth.reqUser?.id !== item.users[0]?.id ? item.users[0].full_name : item.users[1].full_name}
                      userImg={auth.reqUser?.id !== item.users[0]?.id ? item.users[0].profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" : item.users[1].profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    />
                  )}
                </div>
              ))} */}

              {chat.chats && chat.chats.length > 0 && !querys && Array.isArray(chat.chats) && chat.chats.map((item) => (
                <div onClick={() => handleCurrentChat(item)} key={item.id}>
                  <hr />
                  {item.group ? (  // Check for 'group' instead of 'isGroup'
                    <ChatCard
                      name={item.chat_name || "Unnamed Group"}  // Fallback for null chat_name
                      userImg={item.chat_image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    />
                  ) : (
                    <ChatCard
                      isChat={true}
                      name={
                        auth.reqUser?.id !== item.users[0]?.id
                          ? item.users[0].full_name
                          : item.users[1]?.full_name || "Unknown User"
                      }
                      userImg={
                        auth.reqUser?.id !== item.users[0]?.id
                          ? item.users[0]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          : item.users[1]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                    />
                  )}
                </div>
              ))}

            </div>
          </div>}
        </div>

        {/* Right Part */}
        {/* Default image  */}
        {!currentChat && <div className="right w-[70%] flex flex-col items-center justify-center h-full ">
          <div className="w-full flex justify-center bg-[#fafaf0]">
            <img
              className="w-[100%] h-auto object-contain border-none"
              src="web2.jpeg"
              alt=""
            />
          </div>
        </div>}

        {/* Message part */}
        {currentChat && <div className='w-[70%] relative bg-blue-100'>
          <div className='heander absolute top-0 w-full bg-[#f0f2f5]'>
            <div className='flex justify-between'>
              <div className='flex py-3 space-x-4 items-center px-3'>
                <img className='rounded-full w-10 h-10 cursor-pointer' src={currentChat.isGroup ? currrentChat.chat_image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" : (auth.reqUser?.id !== currentChat.users[0]?.id ? currentChat.users[0].profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" : currentChat.users[1].profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")}
                  alt="" />
                <p>{currentChat.group ? currentChat.chat_name : (auth.reqUser.id === currentChat.users[0].id ? currentChat.users[1].full_name : currentChat.users[0].full_name)}</p>
              </div>
              <div className='py-3 space-x-4 items-center px-3 flex '>
                <AiOutlineSearch />
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className='px-10 h-[82vh] overflow-y-scroll '>
            <div className='space-y-1 flex flex-col justify-center  mt-20 py-2'>
              {messages.length>0 && messages.map((item, i) => (
                <MessageCard isReqUserMessage={item.user.id!==auth.reqUser.id} content={item.content} />
              ))}
            </div>
          </div>
              

          {/* Footer Part */}
          <div className='footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl'>
            <div className='flex justify-between items-center px-5 relative '>
              <BsEmojiSmile className='cursor-pointer' />
              <ImAttachment />
              <input className='py-2 outline-none border-none bg-wh pl-4 rounded-md w-[85%]' type="text" onChange={(e) => (
                setContent(e.target.value)
              )}
                placeholder="Type a message"
                value={content}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    handleCreateNewMessage();
                    setContent("")
                  }
                }}
              />
              <BsMicFill />
            </div>
          </div>
        </div>
        }
      </div>

    </div>
  )
}

export default HomePage