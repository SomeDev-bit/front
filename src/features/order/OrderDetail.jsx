import React from 'react'
import { useGetOrderByIdQuery } from './orderApi'
import { useParams } from 'react-router';
import { baseApi } from '../../app/apiUrl';

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOrderByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }



  return (
    <div className='p-5'>

      <div>
        <h1>Order By :- {data.userId.username} | Email:- {data.userId.email}|</h1>
      </div>

      <div className='mt-5'>
        {data.products.map(({ title, qty, price, _id, image }) => {
          return <div key={_id} className='flex  items-center gap-3 mb-4'>
            <img className='h-[50px] w-[50px] object-cover' src={`${baseApi}/${image}`} alt="" />
            <p>{title} | Qty:-{qty} | Price:-{price}</p>
          </div>
        })}
      </div>

    </div>
  )
}

export default OrderDetail
