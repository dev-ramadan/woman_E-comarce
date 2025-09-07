import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const promoCodeApi = createApi({
    reducerPath: 'promoCodeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SUPABASE_URL}/rest/v1`,
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
    tagTypes: ["PromoCode"],
    endpoints: (builder) => ({
        // READE
        getAllPromoCode: builder.query({
            query: () => 'sale',
            providesTags: ["PromoCode"]
        }),
        // CREATE
        createPromoCode : builder.mutation({
            query:({promocode , discount})=>({
                url : 'sale',
                method : 'POST',
                body : {promocode , discount}
            }),
            invalidatesTags : ['PromoCode']
        }),
        // DELETE
        deletePromoCode : builder.mutation({
            query:(id) =>({
                url : `sale?id=eq.${id}`,
                method : "DELETE"
            }),
            invalidatesTags : ["PromoCode"]
        }),
    })
});

export const {useGetAllPromoCodeQuery , useCreatePromoCodeMutation , useDeletePromoCodeMutation} = promoCodeApi
