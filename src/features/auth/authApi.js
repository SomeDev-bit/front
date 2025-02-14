import { mainApi } from '../../app/mainApi';


export const authApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    userLogin: builder.mutation({
      query: (q) => ({
        url: '/users/login',
        body: q,
        method: 'POST'
      })
    }),
    userRegister: builder.mutation({
      query: (q) => ({
        url: '/users/register',
        body: q,
        method: 'POST'
      })
    }),

    getUser: builder.query({
      query: (q) => ({
        url: `/users/${q.id}`,
        headers: {
          Authorization: q.token
        },
        method: 'GET'
      })
    }),

    userUpdate: builder.mutation({
      query: (q) => ({
        url: `/users/${q.id}`,
        body: q.body,
        headers: {
          Authorization: q.token
        },
        method: 'PATCH'
      })
    }),



  })

});

export const { useUserLoginMutation, useUserRegisterMutation, useGetUserQuery, useUserUpdateMutation } = authApi;