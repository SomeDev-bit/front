import { mainApi } from '../../app/mainApi';


export const orderApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (token) => ({
        url: '/orders',
        headers: {
          Authorization: token
        },
        method: 'GET'
      }),
      providesTags: ['Order']
    }),


    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET'
      }),
      providesTags: ['Order']
    }),

    getOrderByUser: builder.query({
      query: (id) => ({
        url: `/orders/users/${id}`,
        method: 'GET'
      }),
      providesTags: ['Order']
    }),


    orderCreate: builder.mutation({
      query: (q) => ({
        url: '/orders',
        body: q.body,
        headers: {
          Authorization: q.token
        },
        method: 'POST'
      }),
      invalidatesTags: ['Order']
    })


  })

});

export const { useOrderCreateMutation, useGetOrderByUserQuery, useGetAllOrdersQuery, useGetOrderByIdQuery } = orderApi;