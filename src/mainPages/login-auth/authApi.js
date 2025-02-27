import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api",
    //add headers if required with prepareHeaders
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/user/signup",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
