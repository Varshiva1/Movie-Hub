import { createSlice } from "@reduxjs/toolkit";

// Get from localStorage if available
const saved = localStorage.getItem("watchList");
const initialState = {
  data: saved ? JSON.parse(saved) : [],
};

const watchListSlice = createSlice({
    name: "watchList",
    initialState,
    reducers:{
        addToWatchList: (state,action)=>{
            state.data.push(action.payload)
            localStorage.setItem("watchList", JSON.stringify(state.data)); // Update localStorage

        },
        removeFromWatchList: (state,action)=>{
            state.data = state.data.filter((ele) => ele.id !== action.payload.id);
      localStorage.setItem("watchList", JSON.stringify(state.data)); // Update localStorage


            // const movie = action.payload;
            // const filteredData = state.data.filter((ele) => ele.id !== movie.id);
            // state.data = filteredData;
    }
        
    }
})


export default watchListSlice.reducer;
export const {addToWatchList,removeFromWatchList} = watchListSlice.actions