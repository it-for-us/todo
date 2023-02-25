import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PROD_API_URL } from '../../lib/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: PROD_API_URL }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
    }),
    signup: build.mutation({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: (body) => ({
        url: '/users/logout',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;
