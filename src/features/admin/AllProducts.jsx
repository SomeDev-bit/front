import React from 'react'
import { useGetProductsQuery, useRemoveProductMutation } from '../product/productApi'

import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import { baseApi } from '../../app/apiUrl';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const TABLE_HEAD = ["Product", "Title", "Product_ID", "Edit", "Remove"];


const AllProducts = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const nav = useNavigate();
  const [removeProduct, { isLoading: load }] = useRemoveProductMutation();
  const { user } = useSelector((state) => state.userSlice);


  const handleRemove = async (id) => {
    try {
      await removeProduct({ id, token: user?.token }).unwrap();
      toast.success('product removed successfully');
    } catch (err) {


      toast.error(err.data?.message || err.data);
    }
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography>{error}</Typography>
  }


  return (
    <div className='p-5'>

      <div className='flex justify-end mb-6'>
        <Button onClick={() => nav('/add-product')} >Add Product</Button>
      </div>

      <div className='px-10'>


        <Card className="h-full w-full overflow-scroll ">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(({ _id, image, title, }, index) => {
                const classes = "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Avatar src={`${baseApi}/${image}`} />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button onClick={() => nav(`/edit-product/${_id}`)} variant='text'>
                        Edit
                      </Button>
                    </td>
                    <td className={classes}>
                      <Button
                        onClick={() => handleRemove(_id)}
                        loading={load}
                        variant='text'>
                        Remove
                      </Button>


                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

    </div>
  )
}

export default AllProducts


