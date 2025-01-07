import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    // toast.error(result.error.data.message);
  }
  if (result?.error?.status === 403) {
    // toast.error(result.error.data.message);
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
      query: ({ body }) => ({
        url: `/jwt`,
        method: "POST",
        body: body,
      }),
    }),
    createUser: builder.mutation({
      query: ({ userData, email }) => {
        return {
          url: `/user/${email}`,
          method: "POST",
          body: { userData },
        };
      },
    }),
    addWishList: builder.mutation({
      query: (body) => ({
        url: `/add-wishlist`,
        method: "PATCH",
        body: body,
      }),
    }),
    addToCard: builder.mutation({
      query: (body) => ({
        url: `/card`,
        method: "POST",
        body: body,
      }),
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: `/product`,
        method: "POST",
        body: body,
      }),
    }),
    removeFromMyCart: builder.mutation({
      query: ({ email, productId }) => {
        return {
          url: `/card/${email}/${productId}`,
          method: "DELETE",
        };
      },
    }),
    deleteMyProduct: builder.mutation({
      query: ({ productId }) => {
        return {
          url: `/product/${productId}`,
          method: "DELETE",
        };
      },
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/user/${id}`,
          method: "DELETE",
        };
      },
    }),
    updateMyProduct: builder.mutation({
      query: ({ body, productId }) => {
        console.log(body);
        return {
          url: `/product/${productId}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateQuantity: builder.mutation({
      query: (body) => {
        return {
          url: `/card`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateUser: builder.mutation({
      query: ({ body, id }) => {
        console.log(body, id);
        return {
          url: `/user/${id}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    removeFromWishlist: builder.mutation({
      query: (body) => {
        return {
          url: `/remove-wishlist`,
          method: "PATCH",
          body: body,
        };
      },
    }),

    getUser: builder.query({
      query: ({ email }) => {
        return {
          url: `/user/${email}`,
        };
      },
    }),
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/users`,
        };
      },
    }),
    getWishList: builder.query({
      query: ({ email }) => {
        return {
          url: `/wishlist/${email}`,
        };
      },
    }),
    getMyCart: builder.query({
      query: ({ email }) => {
        return {
          url: `/card/${email}`,
        };
      },
    }),
    getMyProduct: builder.query({
      query: ({ email }) => {
        return {
          url: `/products/${email}`,
        };
      },
    }),
    getSingleProduct: builder.query({
      query: ({ productId }) => {
        return {
          url: `/product/${productId}`,
        };
      },
    }),
  }),
});

export const {
  useGetProductQuery,
  useJWTMutation,
  useAddWishListMutation,
  useGetUserQuery,
  useGetWishListQuery,
  useGetMyCartQuery,
  useRemoveFromMyCartMutation,
  useUpdateQuantityMutation,
  useAddToCardMutation,
  useRemoveFromWishlistMutation,
  useGetMyProductQuery,
  useDeleteMyProductMutation,
  useUpdateMyProductMutation,
  useGetSingleProductQuery,
  useCreateUserMutation,
  useGetAllUserQuery,
  useAddProductMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = baseApi;
