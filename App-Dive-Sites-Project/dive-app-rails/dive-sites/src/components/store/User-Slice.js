import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {username: ''},
    reducers: {
        changeUser(state, action) {
            state.username = action.payload;
        }
    }
});

export const {changeUser} = userSlice.actions
export default userSlice.reducer