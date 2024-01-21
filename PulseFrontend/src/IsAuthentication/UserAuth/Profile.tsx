import React from 'react'
import '../UserAuth/MyProfile.scss';
import { IoIosImages } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { LuTextSelect } from "react-icons/lu";
import ImagesCategory from './ProfileUitils/ImagesCategory';
import VideosCategory from './ProfileUitils/VideosCategory';
import TextsCategory from './ProfileUitils/TextsCategory';
import AllCategory from './ProfileUitils/AllCategory';
import EditProfile from './ProfileUitils/EditProfileWrapper';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../contexts/UserInfo';
import { ProfileImage } from '../../uimodals/ImageModal';

const Profile = () => {
     const { userInfo } = useUserInfo();

     //section selectors (images, videos and texts selectors)
     const [selectors, setSelectors] = React.useState<string>('all');
     const navigate = useNavigate();
     
     const handleSelector = (selected:string) => {
          setSelectors(selected);
     }

     //if user logged in first login connect the profile editing modal
     const [ifFirstLoginModal, setIfFirstLoginModal] = React.useState<boolean>(false);

     React.useEffect(() => {
          const firstLogin = localStorage.getItem('ifUserFirstLogin');
          if(firstLogin === 'true'){
               setIfFirstLoginModal(true);
          } else {
               setIfFirstLoginModal(false);
          }
     }, []);

     //show user profile if he clicked the profile image
     const [showUserProfile, setShowUserProfile] = React.useState<boolean>(false);
     const ShowProfile = () => {
          setShowUserProfile(true);
     }

     const { getUsersById } = useUserInfo();
     React.useEffect(() => {
          getUsersById();
     }, []);
 
  
  return (
     <React.Fragment>
     {ifFirstLoginModal ? (
     <React.Fragment>
     <EditProfile />
     </React.Fragment>
     ):( 
     <React.Fragment>
     {localStorage.getItem('authToken') ? (
     <div className='profile'>

{/* IF USER CLICKED THE OWN PROFILE IMAGE OPEN THE PROFILE  */}
     {showUserProfile && <ProfileImage setShowUserProfile={setShowUserProfile}/>}
{/* IF USER CLICKED THE OWN PROFILE IMAGE OPEN THE PROFILE  */}

     {Object.keys(userInfo).map((userinfo) => (
     <div className='profile-main' key={userinfo}>
      <div className='wrapper'>
          <div className="profile-wrapper" onClick={() => ShowProfile()}>
          <img src={userInfo[userinfo].userProfile ? userInfo[userinfo].userProfile : '../Vector.svg'} />
          </div>
          <div className='user-infos'>
          <div className='top-info'>
               <section className='username-and-buttons'>
                         <span className='username'>{userInfo[userinfo].nickname}</span>
                    <button id='editProfile'
                    onClick={() => navigate('/profil/profilə-düzəliş')}
                    >Profilə düzəliş</button>
                    <button id='showArchive'>Keçmişi aç</button>
               </section>
               <section className='followers-counts'>
                    <span className='posts'><strong>32</strong>Postlarınız</span>
                    <span className='followers'><strong>134K</strong>İzləyiciniz</span>
                    <span className='following'><strong>358</strong>İzlədiyiniz</span>
               </section>
          </div>
          <div className='biography'>
               <section className='about'>
                    <span>Haqqında</span>
                    <p>
                    {userInfo[userinfo].userBiography.toString().length === 0 ? (
                         <strong style={{color: '#696969'}}>Bio"nuz boş görsənir.. <strong id='add-bio'
                         onClick={() => navigate('/profil/profilə-düzəliş')}
                         >Bio əlavə et</strong></strong>
                    ) : (userInfo[userinfo].userBiography)}
                    </p>
               </section>

               <div className='special-env'>
                    <div className='special-emoji'>
                         <div id='emoji'>
                         {userInfo[userinfo].userSpecialEmoji.toString().length === 0 ? (
                              <span>Hmm..🤨 Özəl emojiniz yoxdur. <span id='selectEmoji'
                              onClick={() => navigate('/profil/profilə-düzəliş')}
                              >Emoji seçin</span></span>
                         ):(
                              <div className='emojies'>
                              <span id='emoji'>
                                   {userInfo[userinfo].userSpecialEmoji} <span>- sizi tanımlayan emojilər</span>
                              </span>
                              </div>
                         )}
                         </div>
                    </div>
               </div>
          </div>
          </div>
      </div>     

     </div>
     ))}
     <div className='contents-main'>
               <div className='contents'>
                    <div className='titles'>
                         <div className='all-section'
                         onClick={() => handleSelector('all')}
                         style={{background: selectors === 'all' ? '#303030' : ""}}
                         >
                              <IoIosImages id='img-icon' />
                              <span>Hamısı</span>
                         </div>
                         <div className='images-section'
                         onClick={() => handleSelector('images')}
                         style={{background: selectors === 'images' ? '#303030' : ""}}
                         >
                              <IoIosImages id='img-icon' />
                              <span>Şəkillər</span>
                         </div>
                         <div className='videos-section'
                         onClick={() => handleSelector('videos')}
                         style={{background: selectors === 'videos' ? '#303030' : ""}}
                         >
                              <BiSolidVideos id='img-icon' />
                              <span>Videolar</span>
                         </div>
                         <div className='texts-section'
                         onClick={() => handleSelector('texts')}
                         style={{background: selectors === 'texts' ? '#303030' : ""}}
                         >
                              <LuTextSelect id='img-icon' />
                              <span>Mətnlər</span>
                         </div>
                    </div>

                    <div className='shares'>
                         {selectors === 'images' ? (
                              <ImagesCategory />
                         ): selectors === 'videos' ? (
                              <VideosCategory />
                         ): selectors === 'texts' ? (
                              <TextsCategory />
                         ): selectors === 'all' ? (
                              <AllCategory />
                         ) : null}
                    </div>
               </div>
     </div>
     </div>     
     ):(
     <>{navigate('/giriş')}</>
     )}
     </React.Fragment>
     )}
    
    </React.Fragment>
  )
}

export default Profile