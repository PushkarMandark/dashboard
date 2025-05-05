import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com/",
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = getState().user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    // Add global error handling
    validateStatus: (response, result) => {
      if (response.status >= 400) {
        return {
          error: {
            status: response.status,
            data: result || response.statusText,
          },
        };
      }
      return { data: result };
    },
  }),
  // Add tags for cache invalidation
  tagTypes: ["User", "Todo", "Post"],
  endpoints: (builder) => ({
    // Example endpoint with caching
    getExample: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
      // Add retry logic
      extraOptions: { maxRetries: 3 },
      // Add transform response
      transformResponse: (response) =>
        // Transform response if needed
        response,
      // Add error handling
      transformErrorResponse: (response) => response.data || { message: "Unknown error occurred" },
      // Add cache configuration
      keepUnusedDataFor: 300, // Keep data for 5 minutes
    }),

    getAllTodos: builder.query({
      query: () => "todos",
      providesTags: ["Todo"],
      keepUnusedDataFor: 60, // Keep data for 1 minute
    }),

    // Example mutation with cache invalidation
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "todos",
        method: "POST",
        body: todo,
      }),
      // Invalidate relevant cache after mutation
      invalidatesTags: ["Todo"],
    }),

    updateTodo: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: patch,
      }),
      // Invalidate specific todo and the list
      invalidatesTags: (result, error, { id }) => [{ type: "Todo", id }, "Todo"],
    }),
  }),
});

// Export hooks
export const {
  useGetExampleQuery,
  useGetAllTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
} = api;
