import axios from "axios";
import React from "react";
import { ifTokenTrue } from "./TokenContext";

type UserProfileContextType = {
  selectedImage: string | ArrayBuffer | null;
  setSelectedImage: (value: string | ArrayBuffer | null) => void;
  uploadedFile: string;
  setUploadedFile: (value:string) => void;
  editProfileModal: boolean;
  setEditProfileModal: (value: boolean) => void;
  handleProfileChange: (value: any) => void;
  handleInputChange: (value: any) => void;
  getUserProfile: () => void;
  changes: boolean;
  setChanges: (value: boolean) => void;
};

type UserProfileContextChildrenType = {
  children: React.ReactNode;
};

const apiForGetProfile = 'http://localhost:3000/getuserprofile';

export const UserProfileContext = React.createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileContextProvider: React.FC<UserProfileContextChildrenType> = ({ children }) => {

     const [selectedImage, setSelectedImage] = React.useState<string | ArrayBuffer | null>(null);
     const [uploadedFile, setUploadedFile] = React.useState(''); //for uploaded file state
     const [editProfileModal, setEditProfileModal] = React.useState(false);
     const [changes, setChanges] = React.useState(false);

     const handleProfileChange = () => {
          const fileInput = document.getElementById('fileInput');
          fileInput?.click();
     }

     const handleInputChange = async (e: any) => {
        const uploadedFile = await e.target.files[0];
          if (uploadedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setSelectedImage(reader.result);
            }
            reader.readAsDataURL(uploadedFile); // for example, convert image example to url

            setUploadedFile(uploadedFile);
          }
          setEditProfileModal(true);
     }

     const getUserProfile = async () => {
      const token = ifTokenTrue;
      try {

        const getProfile = await axios.get(apiForGetProfile, {
          headers: {"Authorization": `Bearer ${token}`},
        })

        if(getProfile.data.userProfile){
          
          setSelectedImage(getProfile.data.userProfile);

        } else {
          console.log('notprofile:', getProfile.status)
        }

      }catch(error){ 
        console.log('profile alinamadi', error);
      }
     }


  return (
    <UserProfileContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        editProfileModal,
        setEditProfileModal,
        handleProfileChange,
        handleInputChange,
        setUploadedFile,
        uploadedFile,
        getUserProfile,
        setChanges, 
        changes
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useProfileContext = () => {
     const context = React.useContext(UserProfileContext);
     if(context === undefined) {
          throw new Error('undefined context user token context');
     } else {
          return context;
     }
}