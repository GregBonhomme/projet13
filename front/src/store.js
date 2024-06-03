import { configureStore } from "@reduxjs/toolkit";

let state = {
    user : {
        firstname:"",
        lastname:""
    },
    token : ""
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case "setFirstname": {
            const user = {...currentState.user,firstname: action.payload}
            return {...currentState, user}
        }
        case "setLastname": {
            const user = {...currentState.user,lastname: action.payload}
            return {...currentState, user}
        }
        case "setToken": {
            const newToken = action.payload
            return {...currentState,token: newToken}
        }
    
        default:
            return currentState;
    }
}

export const store = configureStore({
    preloadedState: state,
    reducer
})