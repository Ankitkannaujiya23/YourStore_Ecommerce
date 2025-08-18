import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: 'orderApi',
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
        createOrder: builder.mutation({
            query: (req) => ({
                url: '/order/create',
                method: "POST",
                body: req
            })
        })
    })
})

export const { useCreateOrderMutation } = orderApi;