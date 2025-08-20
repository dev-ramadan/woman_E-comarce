import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabasae/createclient";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SUPABASE_URL}/rest/v1/`,
        prepareHeaders: async (headers) => {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token
            headers.set('apikey', SUPABASE_ANON_KEY);
            headers.set('Authorization', `Bearer ${token}`);
            headers.set('Content-Type', 'application/json');
            return headers
        },
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories',
            providesTags: ["Caregories"],
        }),
        addCategorey: builder.mutation({
            query: ({ name, slug }) => ({
                url: 'categories',
                method: "POST",
                body: { name, slug }
            }),
            invalidatesTags: ["Caregories"]
        })
    })
})

export const { useGetCategoriesQuery, useAddCategoreyMutation } = categoriesApi