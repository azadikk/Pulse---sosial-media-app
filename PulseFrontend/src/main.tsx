import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SidebarContextProvider } from './contexts/SidebarContext.tsx'
import { SharePostModalProvider } from './contexts/SharePostModal.tsx'
import { TextSettingsContextProvider } from './contexts/TextSettingContext.tsx'
import { CommentModalContextProvider } from './contexts/CommentModal.tsx'
import Register from './signup/Register.tsx'
import Login from './signup/Login.tsx'
import { TokenContextProvider } from './contexts/TokenContext.tsx'
import MyProfile from './IsAuthentication/UserAuth/AutherWrapper.tsx'
import React from 'react'
import Sidebar from './components/Sidebar.tsx'
import EditProfile from './IsAuthentication/UserAuth/ProfileUitils/EditProfileWrapper.tsx'
import { UserInfoContextProvider } from './contexts/UserInfo.tsx'
import { UserProfileContextProvider } from './contexts/UserProfileContext.tsx'
import { AreYouSureContextProvider } from './contexts/AreYouSureContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <SidebarContextProvider>
    <SharePostModalProvider>
    <TextSettingsContextProvider>
    <CommentModalContextProvider>
    <TokenContextProvider>
    <UserInfoContextProvider>
    <UserProfileContextProvider>
    <AreYouSureContextProvider>

    <Routes>
        <Route path='/qeydiyyat' element={<Register />} />
        <Route path='/giriş' element={<Login />} />
        <Route path='/' element={<App />} />
        <Route path='/profil' element={
            <React.Fragment>
                <Sidebar />
                <MyProfile />    
            </React.Fragment>
        } />

        <Route path='/profil/profilə-düzəliş' element={
            <React.Fragment>
                <Sidebar />
                <EditProfile />
            </React.Fragment>
        } />
    </Routes>
    
    </AreYouSureContextProvider>
    </UserProfileContextProvider>
    </UserInfoContextProvider>
    </TokenContextProvider>
    </CommentModalContextProvider>
    </TextSettingsContextProvider>
    </SharePostModalProvider>
    </SidebarContextProvider>
    </BrowserRouter>
)
