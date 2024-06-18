import { configureStore } from "@reduxjs/toolkit";

let state = {
    user : {
        firstname : "",
        lastname : ""
    },
    connected : false,
    token: "",
}

const reducer = (currentState, action) => {
    switch (action.type) {
        
        case "setFirstname": {
            return {...currentState,user : {...currentState.user , firstname : action.payload}}
        }

        case "setLastname": {
            return {...currentState,user : {...currentState.user , lastname : action.payload}}
        }

        case "setConnected": {
            return {...currentState, connected : action.payload}
        }

        case "setToken": {
            return {...currentState, token: action.payload}
        }
    
        default:
            return currentState;
    }
}

export const store = configureStore({
    preloadedState: state,
    reducer
})