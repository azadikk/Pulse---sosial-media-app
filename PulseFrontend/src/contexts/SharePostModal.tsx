import React from "react";

type SharePostModalType = {
     sharePostModal: boolean,
     setModal: (value:boolean) => void,
     toggleModal: () => void,
}

type ContextType = {
     children: React.ReactNode,
}

export const SharePostModal = React.createContext<SharePostModalType | undefined>(undefined);

export const SharePostModalProvider:React.FC<ContextType> = ({ children }) => {

     const [sharePostModal, setModal] = React.useState(false);
     
     const toggleModal = () => {
          setModal(!sharePostModal);
     }

     return (
          <SharePostModal.Provider value={{
               sharePostModal, toggleModal, setModal
          }}>
          {children}
          </SharePostModal.Provider>
     )
}

export const UseSharePostModal = () => {
     const context = React.useContext(SharePostModal);
     if(context === undefined) {
          throw new Error('Undefined context share post modal in the type')
     } else {
          return context
     }
}