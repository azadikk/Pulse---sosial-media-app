import React from "react";
import '../uimodals/ImageModal.scss';
import { ModalHeader } from "../globalmodalheader/ModalHeader";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useUserInfo } from "../contexts/UserInfo";

type childrenType = {
     children: React.ReactNode,
}

export const ImageModal:React.FC<childrenType> = ({children}) => {
     return (
          <div className="image-modal">
               {children}
          </div>
     )
}

export const ProfileImage = ({setShowUserProfile}:{setShowUserProfile:any}) => {

     const { userInfo } = useUserInfo();

     return (
          <ImageModal>
               <div className="top-title">
               {Object.keys(userInfo).map((userinfo)=>(
               <span key={userinfo}
               className="user"
               >
               <span id="username">{userInfo[userinfo].nickname}</span>
               <span>- profil şəkiliniz</span>
               </span>
               ))}
               <IoIosCloseCircleOutline id='closeIcon' onClick={() => setShowUserProfile(false)}/>
               </div>

               <div className="image">
                    {Object.keys(userInfo).map((userinfo) => (
                         <img key={userinfo} src={userInfo[userinfo].userProfile ? userInfo[userinfo].userProfile : '../Vector.svg'} />
                    ))}
               </div>
          </ImageModal>
     )
}