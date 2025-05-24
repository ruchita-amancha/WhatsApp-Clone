import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import SelectedMember from './SelectedMember'
import ChatCard from '../ChatCard/ChatCard'
import NewGroup from './NewGroup'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../Redux/Auth/Action'

function CreateGroup({setIsGroup}) {

    const [newGroup, setNewGroup] = useState(false)
    const [groupMember, setGroupMember] = useState(new Set())
    const [query, setQuery] = useState("")
    const token = localStorage.getItem("token")
    const { auth } = useSelector(store => store)
    const dispatch = useDispatch();

    const handleRemoveMember = (item) => {
        groupMember.delete(item);
        setGroupMember(groupMember);
    }
    const handleSearch = (keyword, token) => {
        dispatch(searchUser(keyword, token))
    }

    const handleAddMember = (item) => {
        groupMember.add(item);
        setGroupMember(new Set(groupMember)); // Trigger re-render
        setQuery(""); // Clear search input
    }
    return (
        <div className='w-full h-full'>
            {!newGroup && (
                <div>
                    <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
                        <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
                        <p className="text-xl font-semibold">Add Group Participants</p>
                    </div>
                    <div className="relative bg-white py-4 px-3">
                        <div className="flex space-x-2 flex-wrap space-y-1">
                            {groupMember.size > 0 && Array.from(groupMember).map((item) => (
                                <SelectedMember handleRemoveMember={() => handleRemoveMember(item)} member={item} key={item?.id} />
                            ))}
                        </div>

                        <input
                            type="text"
                            className="outline-none border-b border-[#8888] p-2 w-[93%]"
                            placeholder="Search User"
                            onChange={(e) => {
                                const searchTerm = e.target.value;
                                setQuery(searchTerm);
                                handleSearch(searchTerm, token);
                            }}
                            value={query}
                        />
                    </div>

                    <div className="bg-white overflow-y-scroll h-[50.2vh]">
                        {Array.isArray(auth.searchUser) && auth.searchUser.length > 0 ? (
                            auth.searchUser.map((item) => {
                                console.log(item); // Log the item here

                                return (
                                    <div onClick={() => handleAddMember(item)} key={item?.id}>
                                        <hr />
                                        <ChatCard userImg={item.profile_picture} name={item.full_name} />
                                    </div>
                                );
                            })
                        ) : (
                            query && <p>No users found</p> // Handle case where no users are found or searchUser is empty
                        )}

                    </div>

                    <div className="bottom-10 py-10 flex bg-slate-200 items-center justify-center">
                        <div className="bg-green-600 rounded-full p-4" onClick={() => setNewGroup(true)}>
                            <BsArrowRight className="text-white font-bold text-3xl cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}


            {newGroup && <NewGroup groupMember={groupMember} setIsGroup={setIsGroup} />
}

        </div>
    )
}

export default CreateGroup