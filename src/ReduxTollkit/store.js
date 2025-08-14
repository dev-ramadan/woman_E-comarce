import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import { categoriesApi } from "./categoriesApi";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(categoriesApi.middleware)
})