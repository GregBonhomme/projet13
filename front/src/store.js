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
        case "getFirstname": {
            const newFirstname = action.payload
            return {...currentState, firstname: newFirstname}
        }
    
        default:
            return currentState;
    }
}

export const store = configureStore({
    preloadedState: state,
    reducer
})