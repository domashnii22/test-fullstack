import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Category', 'Product'],
  endpoints: builder => ({
    getCategories: builder.query({
      query: ({ page, limit }) => ({
        url: 'category',
        params: { page, limit },
      }),
      providesTags: ['Category'],
    }),
    getProducts: builder.query({
      query: ({ page, limit }) => ({
        url: 'product',
        params: { page, limit },
      }),
      providesTags: ['Product'],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category', 'Product'],
    }),
    addCategory: builder.mutation({
      query: category_name => ({
        url: `category`,
        method: 'POST',
        body: category_name,
      }),
      invalidatesTags: ['Category', 'Product'],
    }),
    editCategory: builder.mutation({
      query: ({ id, category_name }) => ({
        url: `category/${id}`,
        method: 'PATCH',
        body: { category_name: category_name },
      }),
      invalidatesTags: ['Category', 'Product'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useGetProductsQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
} = mainApi;
