import { configureStore } from "@reduxjs/toolkit";

let state = {
    user : {
        firstname:"",
        lastname:""
    },
    logged : false
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
        case "loggedOn": {
            return {...currentState,logged: true}
        }

        case "loggedOff": {
            return {...currentState,logged: false}
        }
    
        default:
            return currentState;
    }
}

export const store = configureStore({
    preloadedState: state,
    reducer
})