import React from "react";

type CommentModalContextType = {
     commentModal: { [key: number]: boolean },
     setCommentModal: (value: { [key: number]: boolean }) => void,
     handleCommentModal: (value: number) => void,
}

type contextType = {
     children: React.ReactNode,
}

export const CommentModalContext = React.createContext<CommentModalContextType | undefined>(undefined);

export const CommentModalContextProvider:React.FC<contextType> = ({ children }) => {

     const [commentModal, setCommentModal] = React.useState<{[key: number]: boolean}>({});
     
     const handleCommentModal = (postid: number) => {
          setCommentModal((prevModal) => ({
               ...prevModal,
               [postid]: true,
          }));
     }

     return (
          <CommentModalContext.Provider 
           value={{handleCommentModal, setCommentModal, commentModal}}>
               {children}
          </CommentModalContext.Provider> 
     )
}

export const useCommentModal = () => {
     const context = React.useContext(CommentModalContext);
     if(context === undefined){
          throw new Error('undefined is context but i dont to be why');
     } else {
          return context;
     }
}