import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabasae/createclient";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const orderApi = createApi({
    reducerPath: 'orderApi',
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
    endpoints: (builder) => ({
        setOrder: builder.mutation({
            query: (order) => ({
                url: 'ordrs',
                method: "POST",
                body: order
            }),
            invalidatesTags: ["Ordrs"]
        }),
        getOrder: builder.query({
            query: () => 'ordrs',
            providesTags: ["Products"],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `ordrs?id=eq.${id}`,
                method: 'PATCH', 
                body: { status },
            }),
            invalidatesTags: ['Orders'],
        }),
    })
})

export const { useSetOrderMutation, useGetOrderQuery, useUpdateOrderStatusMutation } = orderApi