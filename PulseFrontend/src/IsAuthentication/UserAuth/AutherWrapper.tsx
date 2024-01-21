import React from 'react'
import '../../globalstyle.scss';
import '../UserAuth/MyProfile.scss';
import { useSidebarContext } from '../../contexts/SidebarContext';
import Profile from './Profile';

const AutherWrapper = () => {

     const { sidebaropen } = useSidebarContext();

  return (
    <div className='auth-wrapper' style={{ width: sidebaropen ? '85%' : '' }}>
     <Profile />
    </div>
  )
}

export default AutherWrapper