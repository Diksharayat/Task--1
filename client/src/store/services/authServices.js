import { createApi } from "@reduxjs/toolkit/query/react";
import AxiosBaseQuery from "../axiosBaseQuery";

/* This code is creating an API using the `createApi` function from the `@reduxjs/toolkit/query/react`
library. The API is named `authApi` and has several endpoints defined using the `builder` object
passed to the `endpoints` function. Each endpoint is defined as a mutation or query with a specific
`query` object that contains the URL, method, and payload or parameters for the request. The
`transformResponse` function is also defined for each endpoint to parse the response data. The
`baseQuery` object is also defined using the `AxiosBaseQuery` function and includes the base URL for
the API. This API can be used in a React application to make HTTP requests to the server. */
export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  refetchOnReconnect: true,
  baseQuery: AxiosBaseQuery({
    baseUrl: `http://localhost:3002/users`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: `/register`,
        method: "POST",
        payload: payload,
        // responseType: 'blob',
        fileUpload: true,
      }),
      transformResponse: (response) => response,
    }),
    login: builder.mutation({
      query: (payload) => {
        console.log("Payload before login request:", payload);
        return {
          url: `/login`,
          method: "POST",
          payload: payload,
        };
      },
      transformResponse: (response) => response,
    }),

    otpVerify: builder.mutation({
      query: ({ payload }) => ({
        url: `/verify-otp`,
        method: "POST",
        payload: payload,
      }),
      transformResponse: (response) => response,
    }),

    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/forget-password",
        method: "POST",
        payload: payload,
      }),
      transformResponse: (response) => (response),
    }),
  }),
});

/* This line is exporting several hooks that can be used in a React component to interact with the API
endpoints defined in the `authApi` object. Each hook corresponds to a specific endpoint and can be
used to make a request to that endpoint and retrieve the response data. The naming convention for
the hooks is `use{EndpointName}{Query/Mutation}`, where `EndpointName` is the name of the endpoint
and `Query/Mutation` indicates whether the endpoint is a query or a mutation. These hooks are
generated automatically by the `createApi` function and can be used to simplify the process of
making API requests in a React application. */
export const { useRegisterMutation, useLoginMutation, useOtpVerifyMutation,useForgotPasswordMutation } =
  authApi;
