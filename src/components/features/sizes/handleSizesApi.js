import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const handleSizesApi = createApi({
    reducerPath: 'handleSizesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_URL || "http://localhost:5001/api/",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().AuthSlice.user.token;
            if (token) {
                headers.set('token', token);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSizes: builder.query({
            query: () => 'sizes'
        }),
        getSizeById: builder.query({
            query: (id) => `size/${id}`
        }),
        addSize: builder.mutation({
            query: (request) => ({
                url: 'size',
                method: 'POST',
                body: request
            })
        }),
        updateSize: builder.mutation({
            query: ({ id, ...request }) => ({
                url: `size/${id}`,
                method: 'PUT',
                body: request
            })
        }),
        deleteSize: builder.mutation({
            query: (id) => ({
                url: `size/${id}`,
                method: 'DELETE'
            })
        })
    })
});


export const { useGetSizesQuery, useGetSizeByIdQuery, useAddSizeMutation, useUpdateSizeMutation, useDeleteSizeMutation } = handleSizesApi;