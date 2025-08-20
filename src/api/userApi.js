import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabasae/createclient";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: async ({ url, body }) => {
        if (url === 'signup') {
            const { data, error } = await supabase.auth.signUp(body);
            if (error) {
                return { error: { status: 400, data: { message: error.message } } };
            }
            return { data }
        }
        if (url === 'login') {
            const { data, error } = await supabase.auth.signInWithPassword(body);
            if (error) {
                return { error: { status: 400, data: { message: error.message } } };
            }
            return { data }
        }
        return { data: null }
    },
    endpoints: (builder) => ({

        signUp: builder.mutation({
            query: ({ email, password, displayName }) => ({
                url: 'signup',
                method: "POST",
                body: {
                    email,
                    password,
                    options: {
                        data: {
                            display_name: displayName
                        }
                    }
                },
            })
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: "POST",
                body: credentials
            })
        })
    })

});

export const { useSignUpMutation, useLoginMutation } = userApi