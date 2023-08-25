import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const watchListSlice = createSlice({
    name: "watchList",
    initialState,
    reducers:{
        addToWatchList: (state,action)=>{

            state.data.push(action.payload)
        },
        removeFromWatchList: (state,action)=>{
            const movie = action.payload;
            const filteredData = state.data.filter((ele) => ele.id !== movie.id);
            state.data = filteredData;
    }
        
    }
})

export default watchListSlice.reducer;
export const {addToWatchList,removeFromWatchList} = watchListSlice.actions