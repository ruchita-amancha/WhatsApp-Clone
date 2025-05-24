import { BASE_API_URL } from "../../config/api"
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

export const createChat=(chatData,token)=>async(dispatch)=>{
    try{
        console.log(chatData);
        
        const res=await fetch(`${BASE_API_URL}/api/chats/single`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(chatData)
        })

        const data=await res.json();
        console.log("create message",data);
        dispatch({type:CREATE_CHAT,payload:data})
        
    }
    catch(error){
        console.log("catch error",error);
        
    }
}

export const createGroupChat=(chatData)=>async(dispatch)=>{
    try{

        const res=await fetch(`${BASE_API_URL}/api/chats/group`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${chatData.token}`
            },
            body:JSON.stringify(chatData.group)
        })

        const data=await res.json();
        console.log("create group chat",data);
        dispatch({type:CREATE_GROUP,payload:data})
        
    }
    catch(error){
        console.log("catch error",error);
        
    }
}

export const getUsersChat=(chatData)=>async(dispatch)=>{
    try{

        const res=await fetch(`${BASE_API_URL}/api/chats/user`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${chatData.token}`
            },
        })

        const data=await res.json();
        console.log("users chat",data);
        dispatch({type:GET_USERS_CHAT ,payload:data})
        
    }
    catch(error){
        console.log("catch error",error);
        
    }
}