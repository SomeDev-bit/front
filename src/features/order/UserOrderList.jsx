import React from 'react'
import { useGetOrderByUserQuery } from './orderApi'
import { OrderTable } from './OrderTable';


const UserOrderList = ({ user }) => {
  const { data, isLoading, error } = useGetOrderByUserQuery(user.userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>

      {data && <OrderTable data={data} />}

    </div>
  )
}

export default UserOrderList
