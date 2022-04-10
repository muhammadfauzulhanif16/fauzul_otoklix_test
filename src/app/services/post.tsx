import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../type";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://limitless-forest-49003.herokuapp.com/",
  }),
  tagTypes: ["Post"],
  endpoints: ({ query, mutation }) => ({
    createPost: mutation({
      query: (body: any) => {
        return {
          url: "posts",
          method: "POST",
          body,
        };
      },
    }),
    readPostById: query({
      query: (id) => `posts/${id}`,
    }),
    readAllPosts: query<Post[], void>({
      query: () => "posts",
    }),
    updatePost: mutation({
      query: ({ id, values }) => {
        console.log("id", id);
        console.log("patch", values);

        return {
          url: `posts/${id}`,
          method: "PUT",
          body: values,
        };
      },
    }),
    deletePost: mutation({
      query: (id) => {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useReadPostByIdQuery,
  useReadAllPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
