import { mainApi } from '../../app/mainApi';



export const productApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getProducts: builder.query({
      query: (q) => ({
        url: '/products',
        method: 'GET'
      }),
      providesTags: ['Product'],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      }),
      // providesTags: ['Product'],
    }),

    addProduct: builder.mutation({
      query: (q) => ({
        url: '/products',
        body: q.body,
        method: 'POST',
        headers: {
          Authorization: q.token
        }
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        body: q.body,
        method: 'PATCH',
        headers: {
          Authorization: q.token
        }
      }),
      invalidatesTags: ['Product'],
    }),

    removeProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        headers: {
          Authorization: q.token
        },
        method: 'DELETE'
      }),
      invalidatesTags: ['Product'],
    }),


  })

});

export const { useGetProductsQuery, useAddProductMutation, useRemoveProductMutation, useGetProductQuery, useUpdateProductMutation } = productApi;