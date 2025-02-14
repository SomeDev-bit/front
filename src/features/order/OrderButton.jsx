import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useOrderCreateMutation } from "./orderApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeCarts } from "../cart/cartSlice";

export function OrderButton({ totalAmount, carts }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const handleOpen = () => setOpen(!open);
  const [orderCreate, { isLoading }] = useOrderCreateMutation();
  const handelConfirm = async () => {
    try {
      await orderCreate({
        body: {
          totalAmount,
          userId: user._id,
          products: carts
        },
        token: user.token
      }).unwrap();
      dispatch(removeCarts());
      toast.success('order created successfully');
      handleOpen();
    } catch (err) {
      toast.error(err.data?.message || err.data);
      handleOpen();
    }
  }


  return (
    <>
      <Button size="sm" onClick={handleOpen} variant="gradient">
        Create Order
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Are You sure ?</DialogHeader>
        <DialogBody>
          to order these products !
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button

            loading={isLoading}
            variant="gradient" color="green" onClick={handelConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}