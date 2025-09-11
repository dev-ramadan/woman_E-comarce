import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const sectionApi = createApi({
    reducerPath: 'sectionApi',
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
    tagTypes: ["Section"],
    endpoints: (builder) => ({
        // READE
        getSectionByType: builder.query({
            query: (type) => `sections?type=eq.${type}`,
            providesTags: ["Section"]
        }),
          updateSection: builder.mutation({
    query: ({ id, data }) => ({
      url: `sections?id=eq.${id}`,
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["Section"], 
  }),
        // // CREATE
        // createPromoCode : builder.mutation({
        //     query:({promocode , discount})=>({
        //         url : 'sale',
        //         method : 'POST',
        //         body : {promocode , discount}
        //     }),
        //     invalidatesTags : ['PromoCode']
        // }),
        // // DELETE
        // deletePromoCode : builder.mutation({
        //     query:(id) =>({
        //         url : `sale?id=eq.${id}`,
        //         method : "DELETE"
        //     }),
        //     invalidatesTags : ["PromoCode"]
        // }),
    })
});

export const {useGetSectionByTypeQuery} = sectionApi
