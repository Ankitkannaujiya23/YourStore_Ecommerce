import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const forgotPasswordApi = createApi({
    reducerPath: 'forgotPasswordApi',
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
        forgotPassword: builder.mutation({
            query: (request) => ({
                url: '/user/forgotPassword',
                method: "POST",
                body: request
            })
        }),
        resetPassword: builder.mutation({
            query: ({ token, ...request }) => ({
                url: `/user/updatePassword/${token}`,
                method: 'POST',
                body: request
            })
        })
    })
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = forgotPasswordApi;