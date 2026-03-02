import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getTokenFromState = (getState) => {
  const state = getState();
  return state?.AuthSlice?.user?.token;
};

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  tagTypes: ["Collection"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL || "http://localhost:5001/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getTokenFromState(getState);
      if (token) {
        headers.set("token", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: () => "/collections",
      providesTags: ["Collection"],
    }),
    getCollectionById: builder.query({
      query: (id) => `/collection/${id}`,
      providesTags: (result, error, id) => [{ type: "Collection", id }],
    }),
    getCollectionProductsBySlug: builder.query({
      query: (slug) => `/collection/${slug}/products`,
    }),
    addCollection: builder.mutation({
      query: (collection) => ({
        url: "/collection",
        method: "POST",
        body: collection,
      }),
      invalidatesTags: ["Collection"],
    }),
    updateCollection: builder.mutation({
      query: ({ id, ...collection }) => ({
        url: `/collection/${id}`,
        method: "PUT",
        body: collection,
      }),
      invalidatesTags: (result, error, arg) => [
        "Collection",
        { type: "Collection", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionByIdQuery,
  useGetCollectionProductsBySlugQuery,
  useAddCollectionMutation,
  useUpdateCollectionMutation,
} = collectionApi;
