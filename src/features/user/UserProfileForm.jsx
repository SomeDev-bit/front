import { Button, IconButton, Input, Typography } from '@material-tailwind/react'
import { Formik } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import { useGetUserQuery, useUserUpdateMutation } from '../auth/authApi'

const UserProfileForm = ({ user }) => {

  const { data, isLoading, isError, error } = useGetUserQuery({ id: user.userId, token: user.token });

  const [updateUser, { isLoading: load }] = useUserUpdateMutation();



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error}</div>;

  return (
    <div className='space-y-5'>
      <div>
        <Typography variant="h4" color="blue-gray">
          Profile Update
        </Typography>

      </div>

      <Formik
        initialValues={{
          email: data.email,
          username: data.username
        }}
        onSubmit={async (val) => {
          try {
            await updateUser({
              body: val,
              token: user.token,
              id: user.userId
            }).unwrap();
            toast.success('profile updated successfully');
          } catch (err) {

            toast.error(err.data?.message || err.data);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors, }) => (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <Input
                type='username'
                name='username'
                onChange={handleChange}
                value={values.username}
                label='Username' />
            </div>
            <div>
              <Input
                type='email'
                name='email'
                onChange={handleChange}
                value={values.email}
                label='Email' />
            </div>




            <Button loading={load} type='submit' className='w-full py-[10px] ' size='sm'>Submit</Button>

          </form>
        )}
      </Formik>



    </div>
  )
}

export default UserProfileForm
