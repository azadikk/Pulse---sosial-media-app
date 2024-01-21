import axios from "axios";
import React from "react";
import { ifTokenTrue } from "./TokenContext";

type userInfoContextType = {
     userInfo: { [key: string]: 
          {
                _id: string; 
                name: string; 
                lastname: string; 
                nickname: string; 
                email: string; 
                password: string;
                userProfile: string;
                userSpecialEmoji: [string];
                userBiography: string;
          } 
     },
     setUserInfo: (value: { [key: string]: 
          { 
               _id: string; 
               name: string; 
               lastname: string; 
               nickname: string; 
               email: string; 
               password: string; 
               userProfile: string;
               userSpecialEmoji: [string];
               userBiography: string;
          } 
     }) => void,
     getUsersById: () => void,
}

type childrenType = {
     children: React.ReactNode,
}

export const UserInfoContext = React.createContext<userInfoContextType | undefined>(undefined);


export const UserInfoContextProvider:React.FC<childrenType> = ({children}) => {

     const [userInfo, setUserInfo] = React.useState<{ [key: string]: 
          { 
               _id: string; 
               name: string; 
               lastname: string; 
               nickname: string; 
               email: string; 
               password: string; 
               userProfile: string;
               userSpecialEmoji: [string];
               userBiography: string;
          } 
     }>({});

     const getUsersById = async () => {
          try {
               if(ifTokenTrue){
                    const token = localStorage.getItem('authToken');
                    const api = "http://localhost:3000/login/sendinformation";
                    const request = await axios.get(api, {headers: {
                         "Authorization": `Bearer ${token}`,
                    }})
                    if(request.data.userInfo && Array.isArray(request.data.userInfo)) {
                         const users = request.data.userInfo;
                         const userinformation: {[key:string]: {
                              _id: string,
                              name: string,
                              lastname: string,
                              nickname: string,
                              email: string,
                              password: string,
                              userProfile: string,
                              userSpecialEmoji: [string],
                              userBiography: string,
                         }} = {};
                         users.forEach((element:any) => {
                              userinformation[element._id] = {
                                   _id: element._id,
                                   name: element.name,
                                   lastname: element.lastname,
                                   nickname: element.nickname,
                                   email: element.email,
                                   password: element.password,
                                   userProfile: element.userProfile,
                                   userSpecialEmoji: element.userSpecialEmoji,
                                   userBiography: element.userBiography,
                              };
                              setUserInfo(userinformation);
                         });
                    } 
               }
          } catch (error) {
               console.log(error, 'axios error on the userinfo context')
          }
     }
     return (
          <UserInfoContext.Provider value={{setUserInfo, userInfo, getUsersById}}>
               {children}
          </UserInfoContext.Provider>
     )
}

export const useUserInfo = () => {
     const context = React.useContext(UserInfoContext);

     if(context === undefined){
          throw new Error('is undefined the userinfocontext');
     } else {
          return context;
     }
}