import { createSlice } from "@reduxjs/toolkit";

// Get from localStorage if available
const saved = localStorage.getItem("watchList");
const streamingSaved = localStorage.getItem("streamingHistory");
const userSaved = localStorage.getItem("user");
const initialState = {
  data: saved ? JSON.parse(saved) : [],
  streamingHistory: streamingSaved ? JSON.parse(streamingSaved) : [],
  currentStreaming: null,
  user: userSaved ? JSON.parse(userSaved) : null,
  isAuthenticated: !!userSaved,
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
        },
        addToStreamingHistory: (state, action) => {
            const streamingRecord = {
                movieId: action.payload.movieId,
                movieTitle: action.payload.movieTitle,
                service: action.payload.service,
                timestamp: new Date().toISOString(),
            };
            state.streamingHistory.unshift(streamingRecord);
            // Keep only last 50 streaming records
            if (state.streamingHistory.length > 50) {
                state.streamingHistory = state.streamingHistory.slice(0, 50);
            }
            localStorage.setItem("streamingHistory", JSON.stringify(state.streamingHistory));
        },
        setCurrentStreaming: (state, action) => {
            state.currentStreaming = action.payload;
        },
        clearStreamingHistory: (state) => {
            state.streamingHistory = [];
            localStorage.removeItem("streamingHistory");
        },
        loginUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        registerUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
        }
    }
})

export default watchListSlice.reducer;
export const {
    addToWatchList,
    removeFromWatchList,
    addToStreamingHistory,
    setCurrentStreaming,
    clearStreamingHistory,
    loginUser,
    registerUser,
    logoutUser
} = watchListSlice.actions