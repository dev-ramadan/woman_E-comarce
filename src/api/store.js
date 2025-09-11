import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import { categoriesApi } from "./categoriesApi";
import { cartApi } from "./cartApi";
import { userApi } from "./userApi";
import  authSlice  from "../Redux/authSlice";
import { orderApi } from "./orderApi";
import { profileApi } from "./profileApi";
import { promoCodeApi } from "./promoCodeApi";
import { sectionApi } from "./sectionApi";

export const store = configureStore({
    reducer: {
        auth : authSlice ,
        [productsApi.reducerPath]: productsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [orderApi.reducerPath] : orderApi.reducer,
        [profileApi.reducerPath] : profileApi.reducer,
        [promoCodeApi.reducerPath] : promoCodeApi.reducer,
        [sectionApi.reducerPath] : sectionApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(categoriesApi.middleware)
            .concat(cartApi.middleware)
            .concat(userApi.middleware)
            .concat(orderApi.middleware)
            .concat(profileApi.middleware)
            .concat(promoCodeApi.middleware)
            .concat(sectionApi.middleware)
})