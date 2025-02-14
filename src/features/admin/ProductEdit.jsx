import React from 'react'
import { useParams } from 'react-router';
import ProductEditForm from './ProductEditForm';
import { useGetProductQuery } from '../product/productApi';

const ProductEdit = () => {

  const { id } = useParams();
  const { data, isLoading, error } = useGetProductQuery(id);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>

      <ProductEditForm data={data} />


    </div>
  )
}

export default ProductEdit
