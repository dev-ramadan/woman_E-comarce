import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const profileApi = createApi({
    reducerPath: 'profileApi',
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
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'profiles?select=id,display_name,email,created_at',
            providesTags: ['Profile']
        }),
        getUserProfile: builder.query({
            query: (userId) => `profiles?id=eq.${userId}`,
        }),

    })
})

export const { useGetUsersQuery , useGetUserProfileQuery } = profileApi