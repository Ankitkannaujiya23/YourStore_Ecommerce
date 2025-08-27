import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'usersApi',
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
        getUserDetails: builder.query({
            query: () => 'user/getUserDetail'
        }),
        updateUserDetails: builder.mutation({
            query: (req) => ({
                url: 'user/updateuser',
                method: "POST",
                body: req
            })
        })
    })
});

export const { useGetUserDetailsQuery, useUpdateUserDetailsMutation } = usersApi;

