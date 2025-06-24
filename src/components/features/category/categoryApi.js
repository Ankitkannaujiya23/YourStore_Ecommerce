import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_URL || "http://localhost:5001/api",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().AuthSlice.user.token;
            if (token) {
                headers.set('token', token)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => '/category',

        }),
        addCategory: builder.mutation({
            query: (cateReq) => ({
                url: '/category',
                method: 'POST',
                body: cateReq
            })
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...updatedCateReq }) => ({
                url: `/category/${id}`,
                method: 'PUT',
                body: updatedCateReq
            })
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',

            }),
        }),
    }),
});


export const { useGetCategoryQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;