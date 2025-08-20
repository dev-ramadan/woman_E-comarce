import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SUPABASE_URL}/rest/v1/`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.session?.access_token;
            headers.set('apikey', SUPABASE_ANON_KEY);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            } else {
                headers.set('Authorization', `Bearer ${SUPABASE_ANON_KEY}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        setOrder: builder.mutation({
            query: (order) => ({
                url: 'ordrs',
                method: "POST",
                body: order
            }),
            invalidatesTags: ["Orders"]
        }),
        getOrder: builder.query({
            query: () => 'ordrs',
            providesTags: ["Orders"],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `ordrs?id=eq.${id}`,
                method: 'PATCH',
                headers: {
                    Prefer: 'return=representation'
                },
                body: { status },
            }),
            invalidatesTags: ['Orders'],
        }),
    })
})

export const { useSetOrderMutation, useGetOrderQuery, useUpdateOrderStatusMutation } = orderApi