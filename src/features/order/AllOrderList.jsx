import React from 'react'
import { useGetAllOrdersQuery } from './orderApi';
import { OrderTable } from './OrderTable';

const AllOrderList = ({ user }) => {
  const { data, isLoading, error } = useGetAllOrdersQuery(user.token);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>

      {data && <OrderTable data={data} />}

    </div>
  )
}

export default AllOrderList
