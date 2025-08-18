import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
    reducerPath: 'addressApi',
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
        getAddress: builder.query({
            query: () => '/address/getaddresslist',
            providesTags: ["Address"],
        }),
        addAddress: builder.mutation({
            query: (req) => ({
                url: '/address/add',
                method: 'POST',
                body: req,
            }),
            invalidatesTags: ["Address"],
        }),
        updateAddress: builder.mutation({
            query: (req) => ({
                url: 'address/update',
                method: 'PUT',
                body: req
            }),
            invalidatesTags: ["Address"],
        }),
        removeAddress: builder.mutation({
            query: ({ id }) => ({
                url: `address/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Address"],
        })
    })
});

export const { useGetAddressQuery, useAddAddressMutation, useUpdateAddressMutation, useRemoveAddressMutation } = addressApi;

// 👇 yaha se manual trigger ke liye export kar rahe h
export const { getAddress } = addressApi.endpoints;