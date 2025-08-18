import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabasae/createclient";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log(`${SUPABASE_URL}/rest/v1/`);

export const cartApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${SUPABASE_URL}/rest/v1/`,
        prepareHeaders: async (headers) => {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token
            headers.set('apikey', SUPABASE_ANON_KEY);
            headers.set('Authorization', `Bearer ${token}`);
            headers.set('Content-Type', 'application/json');
            return headers
        }

    }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: (product) => ({
                url: 'cart',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Cart']
        }),
        getProductCart: builder.query({
            query: (user_id) => `cart?select=*,products(*)&user_id=eq.${user_id}`,
            providesTags: ['Cart'],

        }),
        updateCart: builder.mutation({
            query: ({ id, quantity }) => ({
                url: `cart?id=eq.${id}`,
                method: "PATCH",
                body: { quantity },
            }),
            invalidatesTags: ['Cart'],
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `cart?id=eq.${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Cart']
        }),
        deleteUserCart: builder.mutation({
            query: (userId) => ({
                url: `cart?user_id=eq.${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Cart'],
        })

    })
})

export const { useAddToCartMutation, useGetProductCartQuery, useUpdateCartMutation, useDeleteItemMutation , useDeleteUserCartMutation } = cartApi