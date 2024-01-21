import React from 'react'
import { IoMdPhotos } from "react-icons/io";
import { FaRegFileVideo } from "react-icons/fa6";
import '../../styles/containeruitils.scss';
import { BsEmojiDizzy } from "react-icons/bs";
import { SharePostModal } from '../../contexts/SharePostModal';
import { useUserInfo } from '../../contexts/UserInfo';
import { useProfileContext } from '../../contexts/UserProfileContext';
import { useNavigate } from 'react-router-dom';


const SharePostMainContainer = () => {

  const navigate = useNavigate();

  const { toggleModal } = React.useContext(SharePostModal)!;
  const { userInfo, getUsersById } = useUserInfo();
  const { selectedImage } = useProfileContext();
  React.useEffect(() => {
    getUsersById();
  }, [])

  return (
    <div className='share-post-area'>
      <div className='share-content'>
        <section className='share'>
        {Object.keys(userInfo).map((userprofile) => (
          <img 
          onClick={() => navigate('/profil')}
          key={userprofile}
          src={selectedImage as string && selectedImage || userInfo[userprofile].userProfile ? 
            (userInfo[userprofile].userProfile) : "../Vector.svg"} 
          width={50}
          height={50}
          />
        ))}
        
        <textarea cols={70} rows={1} 
        readOnly
        onClick={toggleModal}
        className='share-post-input'
        placeholder='Bu günün nəbzini paylaş..'
        />
        </section>
   
      </div>
    </div>
  )
}

export default SharePostMainContainer