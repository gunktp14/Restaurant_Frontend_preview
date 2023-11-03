import React from 'react'
import profilePic from '../../assets/images/fake-profile.jpg'
import { useAppContext } from '../../context/appContext'

function ProfileModal() {
    const { user } = useAppContext()
  return (
    <div className='profile-modal'>
        <div className="detail-user">
            <p>Username : {user.username}</p>
        </div>
        <div className="detail-user">
            <p>Email : {user.email}</p>
        </div>
        <div className="detail-user">
            <p>Role : {user.role}</p>
        </div>
    </div>
  )
}

export default ProfileModal
