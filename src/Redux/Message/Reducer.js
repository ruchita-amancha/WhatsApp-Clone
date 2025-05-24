import { ADD_MESSAGE, CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType"

const initialState = {
    messages: [],
    newMessage: null
}

export const messageReducer = (store = initialState, { type, payload }) => {
    if (type === CREATE_NEW_MESSAGE) {
        return { ...store, newMessage: payload }
    }
    else if (type === GET_ALL_MESSAGE) {
        return { ...store, messages: payload }
    }
    else if (type === ADD_MESSAGE) {
        return {
            ...state,
            messages: [...state.messages, action.payload],
        }
    }
    // else if(type===NEW_MESSAGE_RECEIVED)
    //     return {
    //       ...state,
    //       messages: [...state.messages, action.payload], // 👈 this adds the new real-time message
    //     };
    return store
}