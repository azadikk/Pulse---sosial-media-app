import React from 'react'
import EditProfile from './EditProfile'
import { useSidebarContext } from '../../../contexts/SidebarContext'

const EditProfileWrapper = () => {

  const { sidebaropen } = useSidebarContext();

  return (
    <div className='edit-profile-wrapper' style={{ width: sidebaropen ? '85%' : '' }}>
      <EditProfile />
    </div>
  )
}

export default EditProfileWrapper