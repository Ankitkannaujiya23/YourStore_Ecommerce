import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: "cartApi",
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
        syncCart: builder.mutation({
            query: (request) => ({
                url: '/cart/sync',
                method: "POST",
                body: request
            })
        }),
        addToCart: builder.mutation({
            query: (request) => ({
                url: '/cart/add',
                method: "POST",
                body: request
            })
        }),
        updateCart: builder.mutation({
            query: (request) => ({
                url: '/cart/update',
                method: "PUT",
                body: request
            })
        }),
        removeCartItem: builder.mutation({
            query: (request) => ({
                url: '/cart/remove',
                method: "DELETE",
                body: request
            })
        })
    })
});

export const { useSyncCartMutation, useAddToCartMutation, useUpdateCartMutation, useRemoveCartItemMutation } = cartApi;