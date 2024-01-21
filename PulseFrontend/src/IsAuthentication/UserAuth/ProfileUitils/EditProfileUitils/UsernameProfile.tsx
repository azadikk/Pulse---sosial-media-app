import React from 'react'
import { useUserInfo } from '../../../../contexts/UserInfo'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useAreYouSureContext } from '../../../../contexts/AreYouSureContext';

type UsernameProfileProps = {
     specEmojiModal: boolean;
     handleProfileChange: (value: any) => void;
     handleInputChange: (value: any) => void;
     selectedImage: any;
};

const UsernameProfile = ({specEmojiModal,handleProfileChange,handleInputChange,selectedImage}:UsernameProfileProps) => {

     const { userInfo } = useUserInfo();
     const navigate = useNavigate();
     const { sureMsg } = useAreYouSureContext();

  return (
     <React.Fragment>
     {Object.keys(userInfo).map((userinfo) => (
          <div key={userinfo} className="top-username-profile"
            style={{
              pointerEvents: specEmojiModal || sureMsg ? "none" : "unset",
              userSelect: specEmojiModal || sureMsg ? "none" : "unset",
              opacity: specEmojiModal || sureMsg ? '50%' : 'unset'
            }}>
            <FaArrowLeft id='backToProfile' onClick={() => {navigate('/profil')}}/>
            <div className="profile-wrapper">
              <div className="profile">
                {selectedImage && typeof selectedImage === "string" ? (
                  <img src={userInfo[userinfo].userProfile || selectedImage ? userInfo[userinfo].userProfile : '../Vector.svg'} 
                    alt="selected profile" />
                ) : (
                  <img src="./Vector.svg" />
                )}
              </div>
              <span className="username">{userInfo[userinfo].nickname}</span>
            </div>
            <button id="change-profile" onClick={handleProfileChange}>
              Profili dəyiş
            </button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
              name="uploadedImage"
              onChange={handleInputChange}
            />
          </div>
        ))}
     </React.Fragment>
  )
}

export default UsernameProfile