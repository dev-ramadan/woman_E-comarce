import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SUPABASE_URL,
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
  
  endpoints: (builder) => ({
    // READ: Get all products
    getProducts: builder.query({
      query: () => 'products',
      providesTags: ["Products"],
    },
  ),

    // READ: Get product by ID
    getProductById: builder.query({
      query: (id) => `products?id=eq.${id}`
    }),

    // CREATE: Add product
    addProduct: builder.mutation({
      query: ({ title, price, images, description, slug_name , category_id }) => ({
        url: 'products',
        method: 'POST',
        body: { title, price, images, description, slug_name ,category_id },
      }),
      invalidatesTags: ["Products"]
    }),

    // UPDATE: Edit product
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products?id=eq.${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: ["Products"]
    }),

    // DELETE: Remove product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products?id=eq.${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Products"]
    })
  })
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productsApi;
