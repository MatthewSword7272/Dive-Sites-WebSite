import {configureStore} from "@reduxjs/toolkit";
import notifyReducer from './Notify-Slice'
import userReducer from './User-Slice'

const store = configureStore({
    reducer: {
        action: notifyReducer,
        user: userReducer
    }
});

export default store;