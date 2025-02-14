import React from 'react'
import { useSelector } from 'react-redux';
import UserOrderList from '../order/UserOrderList';
import AllOrderList from '../order/AllOrderList';
import UserProfileForm from './UserProfileForm';

const UserProfile = () => {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className='grid grid-cols-3 p-5 gap-7'>

      <div>
        <UserProfileForm user={user} />

      </div>


      <div className='col-span-2'>
        {user.role === 'user' ? <UserOrderList user={user} /> : <AllOrderList user={user} />}
      </div>



    </div>
  )
}

export default UserProfile
