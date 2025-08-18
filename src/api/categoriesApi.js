import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const categoriesApi = createApi({
    reducerPath : 'categoriesApi',
    baseQuery : fetchBaseQuery({
        baseUrl : `${SUPABASE_URL}/rest/v1/` ,
        prepareHeaders : (headers) => {
            headers.set('apikey' , SUPABASE_ANON_KEY);
            headers.set('Authorization', `Bearer ${SUPABASE_ANON_KEY}`)
            return headers
        },
    }),
    endpoints : (builder) => ({
        getCategories : builder.query({
            query : () => 'categories'
        })
    }) 
})

export const {useGetCategoriesQuery} = categoriesApi