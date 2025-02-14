import React from 'react'
import { useGetProductsQuery } from './productApi'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { baseApi } from '../../app/apiUrl';
import { useNavigate } from 'react-router';

const ProdutList = () => {
  const { isLoading, data, error } = useGetProductsQuery();
  const nav = useNavigate();
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  return (
    <div className='p-5 grid grid-cols-4 gap-5'>
      {data && data.map(({ _id, image, title, description, price }) => {
        return <Card className="" key={_id}>
          <CardHeader shadow={false} floated={false} className="h-56">
            <img
              src={`${baseApi}/${image}`}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {title}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                ${price}
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              {description}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              onClick={() => nav(`/product/${_id}`)}
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              View Detail
            </Button>
          </CardFooter>
        </Card>
      })}

    </div>
  )
}

export default ProdutList
