import { configureStore } from "@reduxjs/toolkit";

let state = {
    user : {
        firstname:"",
        lastname:""
    },
    token : ""
}

const reducer = (currentState, action) => {

}

export const store = configureStore({
    preloadedState: StaticRange,
    reducer
})