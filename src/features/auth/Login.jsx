
import { Button, IconButton, Input, Typography } from '@material-tailwind/react'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useUserLoginMutation } from './authApi'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addUser } from './userSlice'

const Login = () => {
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='max-w-[370px] p-4 mt-[5%] mx-auto space-y-7'>
      <div>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to Login.
        </Typography>
      </div>

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={async (val) => {
          try {
            const response = await loginUser(val).unwrap();
            dispatch(addUser(response.data));
            toast.success('successfully login');
            nav(-1);
          } catch (err) {
            toast.error(err.data?.message || err.data);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors, }) => (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <Input
                type='email'
                name='email'
                onChange={handleChange}
                value={values.email}
                label='Email' />
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type={show ? "text" : "password"}
                label="Password"
                name='password'
                value={values.password}
                onChange={handleChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />

              <IconButton variant="text" className="!absolute right-1  rounded">
                <i className={show ? "fa fa-unlock" : "fa fa-lock"} onClick={() => setShow(!show)} />
              </IconButton>

            </div>


            <Button loading={isLoading} type='submit' className='w-full py-[10px] ' size='sm'>Submit</Button>

          </form>
        )}
      </Formik>


      <Typography color="gray" className="mt-4 text-center font-normal">
        Don't have an account ?
        <Button onClick={() => nav('/register')} variant='text' className="font-medium text-gray-900">
          Sign Up
        </Button>
      </Typography>

    </div>
  )
}

export default Login
