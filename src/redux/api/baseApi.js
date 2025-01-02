import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const token = localStorage.getItem("beautyLuxe");
const baseQuery = fetchBaseQuery({
  baseUrl: "https://beauty-luxe-server.vercel.app",
  prepareHeaders: (headers) => {
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithJWT = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error(result.error.data.message);
  }
  if (result?.error?.status === 403) {
    toast.error(result.error.data.message);
  }

  result = await baseQuery(args, api, extraOptions);

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ title, sort, category, page }) => {
        const queryParams = new URLSearchParams({
          title: title || "",
          sort: sort || "asc",
          category: category || "",
          page: page || 1,
        }).toString();

        return `/products?${queryParams}`;
      },
    }),
    JWT: builder.mutation({
      query: (body) => ({
        url: `/jwt`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetProductQuery, useJWTMutation } = baseApi;
