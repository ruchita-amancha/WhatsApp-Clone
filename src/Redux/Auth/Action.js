import { BASE_API_URL } from "../../config/api"
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";

export const register = (data) => async (dispatch) => {
    try {
        console.log("Sending data:", data);  // Log data being sent

        const res = await fetch(`${BASE_API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/*+json"  // Explicitly set Accept header
            },
            body: JSON.stringify(data),
        });
        const resData = await res.json();
        console.log("Register response:", resData);
        if (resData.jwt) {
            localStorage.setItem("token", resData.jwt);
        }
        console.log("Register response:", resData);
        dispatch({ type: REGISTER, payload: resData });
    } catch (error) {
        console.error("Catch error:", error.message);
    }
};




export const login=(data)=>async(dispatch)=>{
    try{
        const res=await fetch(`${BASE_API_URL}/auth/signin`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const resData=await res.json();
        if (resData.jwt) {
            localStorage.setItem("token", resData.jwt);
        }
        console.log("login",resData);
        dispatch({type:LOGIN,payload:resData})
        
    }
    catch(error){
        console.log("catch error",error);
        
    }
}

export const currentUser=(token)=>async(dispatch)=>{
    console.log("current user token",token);
    
    try{
        const res=await fetch(`${BASE_API_URL}/api/users/profile`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            
        })
        const resData=await res.json();
        console.log("current user",resData);
        dispatch({type:REQ_USER,payload:resData})
        
    }
    catch(error){
        console.log("catch error",error);
        
    }
}

export const searchUser=(keyword,token)=>async(dispatch)=>{
    console.log("search data",keyword);
    console.log(token);
    
    try{
        const res=await fetch(`${BASE_API_URL}/api/users/search/${keyword}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            
        })
        const resData=await res.json();
        console.log("Search",resData);
        dispatch({type:SEARCH_USER,payload:resData})
        
    }
    catch(error){
        console.log("catch error",error);
        
    }
}

export const updateUser=(data)=>async(dispatch)=>{
    try{
        const res=await fetch(`${BASE_API_URL}/api/users/update/${data.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${data.token}`
            },
            body:JSON.stringify(data.data)
            
        })
        const resData=await res.json();
        console.log("login",resData);
        dispatch({type:UPDATE_USER,payload:resData})
        
    }
    catch(error){
        console.log("catch error",error);
        
    }
}

export const logoutAction=()=>async(dispatch)=>{
    localStorage.removeItem("token");
    dispatch({type:LOGOUT,payload:null})
    dispatch({type:REQ_USER,payload:null})
}