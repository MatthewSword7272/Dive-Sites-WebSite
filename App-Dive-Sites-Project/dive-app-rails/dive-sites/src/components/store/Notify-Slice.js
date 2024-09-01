import {createSlice} from "@reduxjs/toolkit";

const notifySlice = createSlice({
    name: 'notify',
    initialState: {action_name: ''},
    reducers: {
        added(state) {
            state.action_name = "Added"
        },
        deleted(state) {
            state.action_name = "Deleted"
        }
    }
});

export default notifySlice.reducer
export const notifyActions = notifySlice.actions;
