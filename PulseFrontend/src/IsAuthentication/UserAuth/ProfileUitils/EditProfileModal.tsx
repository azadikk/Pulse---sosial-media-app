import React from 'react'
import '../MyProfile.scss';
import { TbPhotoEdit } from "react-icons/tb";
import AvatarEditor from 'react-avatar-editor'
import { useProfileContext } from '../../../contexts/UserProfileContext';
import axios from 'axios';
import { ifTokenTrue } from '../../../contexts/TokenContext';

type SettingType = {
     id: number,
     option: string | number | undefined,
     type: string,
     labelName: string,
}

const EditProfileModal = () => {

//start cropping if user adjusts image on their computer or any device
     const { selectedImage, setSelectedImage, setEditProfileModal, setChanges } = useProfileContext();
     const editorRef = React.useRef<AvatarEditor | null>(null);
     const [scale, setScale] = React.useState<number>(1);
     const [rotation, setRotation] = React.useState<number>(0);

//when you save the picture
     const handleSave = async () => {
          setChanges(true);
          setEditProfileModal(false);

          if (editorRef.current) {
               const canvas = editorRef.current.getImageScaledToCanvas();
               const croppedImg = canvas.toDataURL('image/jpeg', 0.1);
               setSelectedImage(croppedImg);
                    try {
                      const token = ifTokenTrue;
                      const formData = new FormData();
                      formData.append('uploadedImage', croppedImg);

                      //if user token true then send form data to database and save user profile to database collection
                      if(token){
                        const api = 'http://localhost:3000/userprofile'; //api for requests
                        const getUploadDatabase = await axios.post(api, formData, {
                          headers: {"Authorization": `Bearer ${token}`, "Content-Type": 'multipart/form-data'}
                        })
                        try {
                          if(getUploadDatabase.data){
                               console.log('send user Profile image')
                          }else{
                            console.log('error uploading not getUploadOnDatabase')
                          }
                        } catch (error) {
                          console.log('dont sending user profile')
                        }
                      }
               
                    }catch(error){
                      console.log('catch err sorgu gondeirlmedi', error);
                    }
           } else {
               return;
           }
     };
 
//settings on the picture inputs
     const inputSettings:SettingType[] = [
          {
               id: 1,
               option: scale,
               type: 'range',
               labelName: 'Zoom/Yaxınlaşdır-Uzaqlaşdır'
          },
          {
               id: 2,
               option: rotation,
               type: 'range',
               labelName: 'Rotasyon/Döndür'
          }
     ]
   
  return (
    <div className='cropper-modal'>
     <div className='top-title'>
          <span>Profili tənzimlə</span>
          <TbPhotoEdit id='photoedit-icon'/>
     </div>

      <div className="cropper">
       <div className='avataredit'>
          <AvatarEditor 
          ref={editorRef}
          image={selectedImage as string}
          width={250}
          height={250}
          color={[255, 255, 255, 0.6]}
          scale={scale}
          rotate={rotation}
          />    
       </div>

       <div className='settings'>
          <div className='setting-input'>
          {inputSettings.map((inputs) => (
               <div key={inputs.id}>
               <label>{inputs.labelName}</label>
               <input 
                 type={inputs.type}
                 value={inputs.option || ''}
                 max={inputs.id === 1 ? '3' : ''}
                 min={inputs.id === 1 ? '1' : ''}
                 step={inputs.id === 1 ? '0.1' : ''}
                 onChange={
                    inputs.id === 1 ? (e) => setScale(parseFloat(e.target.value)) :
                    inputs.id === 2 ? (e) => setRotation(parseFloat(e.target.value)) : ()=>{}
                    }
               />
               </div>
          ))}
          </div>
       </div>
      </div>

     <div className="exit-or-ok">
          <div className='ok'>
               <button
                onClick={handleSave}
               >Təsdiqlə</button>
          </div>
          <div className='exit'>
               <button>Ləğv et</button>
          </div>
     </div>
    </div>
  )
}

export default EditProfileModal