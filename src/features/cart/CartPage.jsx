import { Button, IconButton } from '@material-tailwind/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { baseApi } from '../../app/apiUrl';
import { setCart, singleRemoveCart } from './cartSlice';
import { OrderButton } from '../order/OrderButton';

const CartPage = () => {


  const dispatch = useDispatch();




  const { carts } = useSelector((state) => state.cartSlice);

  const total = carts.reduce((a, b) => a + b.qty * b.price, 0);


  const handleDecrement = (cart) => {
    if (cart.qty !== 1) {
      dispatch(setCart({
        ...cart,
        qty: cart.qty - 1
      }));
    }

  }

  const handleIncrement = (cart) => {
    dispatch(setCart({
      ...cart,
      qty: cart.qty + 1
    }));
  }



  return (
    <div className='p-5'>
      {carts.length === 0 ? <h1>list is empty add some</h1> :
        <div>

          <div className='space-y-4'>
            {carts.map((cart, i) => {
              return <div className='' key={cart.id}>


                <div className='flex items-center gap-32'>
                  <div>
                    <img className='w-full h-20 object-cover' src={`${baseApi}/${cart.image}`} alt="" />
                  </div>

                  <div className='flex items-center gap-4'>
                    <IconButton
                      onClick={() => handleDecrement(cart)}
                      size='sm'>
                      <i className="fas fa-minus" />
                    </IconButton>
                    <h1>{cart.qty}</h1>

                    <IconButton onClick={() => handleIncrement(cart)} size='sm'>
                      <i className="fas fa-add" />
                    </IconButton>

                  </div>
                  <h1>Rs.{cart.price}</h1>
                  <IconButton onClick={() => dispatch(singleRemoveCart(i))} size='sm'>
                    <i className="fas fa-trash" />
                  </IconButton>
                </div>




              </div>
            })}

          </div>

          <div className='flex items-end gap-5  mt-5'>
            <h1 className='font-bold text-xl'>Total</h1>
            <p>Rs.{total}</p>
          </div>



        </div>}

      {carts.length !== 0 && <div className='mt-5'>
        <OrderButton totalAmount={total} carts={carts} />
      </div>}


    </div>
  )
}

export default CartPage