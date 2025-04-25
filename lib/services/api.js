import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://dummyjson.com/",
    // You can add custom headers here if needed
    // headers: { ... }
  }),
  endpoints: (builder) => ({
    // Example endpoint
    getExample: builder.query({
      query: (userId) => `users/${userId}`,
    }),
    getAllTodos: builder.query({
      query: () => "todos",
    }),
    // Add more endpoints here
  }),
});

export const { useGetExampleQuery,useGetAllTodosQuery } = api;
 