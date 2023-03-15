import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOCAL_EXPRESS_API_URL } from '../../lib/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: LOCAL_EXPRESS_API_URL }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    signup: build.mutation({
      query: (body) => ({
        url: '/users/register',
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
