import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import watchListReducer from "../store/slice"

export const store = configureStore({
    reducer:{
        watchList : watchListReducer
    }
})

export default function StoreProvider({children}){
    return <Provider store={store}>{children}</Provider>
}