import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabasae/createclient";

const SUPABASE_URL = 'https://ylfxybktrtvtdjpubqvn.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZnh5Ymt0cnR2dGRqcHVicXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNjQxODksImV4cCI6MjA3MDc0MDE4OX0.vSsgxe1HBLSKG48er3n9Ru0F6tBFnJBNjGSh0DdRknU';

export const cartApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: SUPABASE_URL,
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
        })

    })
})

export const { useAddToCartMutation, useGetProductCartQuery, useUpdateCartMutation , useDeleteItemMutation} = cartApi