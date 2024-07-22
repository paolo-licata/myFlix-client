import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies.js";

export const store = configureStore({
	reducer: { movies: moviesReducer }
});