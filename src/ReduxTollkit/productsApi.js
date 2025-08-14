import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SUPABASE_URL = 'https://ylfxybktrtvtdjpubqvn.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZnh5Ymt0cnR2dGRqcHVicXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNjQxODksImV4cCI6MjA3MDc0MDE4OX0.vSsgxe1HBLSKG48er3n9Ru0F6tBFnJBNjGSh0DdRknU';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SUPABASE_URL,
    prepareHeaders: (headers) => {
      headers.set('apikey', SUPABASE_ANON_KEY);
      headers.set('Authorization', `Bearer ${SUPABASE_ANON_KEY}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products'
    }),
    getProductById: builder.query({
      query: (id) => `products?id=eq.${id}`
    })
  })
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
