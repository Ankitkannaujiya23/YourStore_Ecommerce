import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const handleColorsApi = createApi({
    reducerPath: 'handleColorsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_URL || "http://localhost:5001/api",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().AuthSlice.user.token;
            if (token) {
                headers.set('token', token);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getColors: builder.query({
            query: () => '/colors'
        }),
        addColor: builder.mutation({
            query: (request) => ({
                url: 'color',
                method: 'POST',
                body: request
            })
        }),
        updateColor: builder.mutation({
            query: ({ id, ...request }) => ({
                url: `color/${id}`,
                method: 'PUT',
                body: request
            })
        }),
        deleteColor: builder.mutation({
            query: (id) => ({
                url: `color/${id}`,
                method: 'DELETE'
            })
        })
    })
});


export const { useGetColorsQuery, useAddColorMutation, useUpdateColorMutation, useDeleteColorMutation } = handleColorsApi;