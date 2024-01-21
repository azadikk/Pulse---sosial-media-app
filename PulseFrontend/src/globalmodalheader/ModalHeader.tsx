import React, { ReactHTMLElement } from "react";
import { IoIosClose, IoMdShare } from "react-icons/io";
import { UseSharePostModal } from "../contexts/SharePostModal";
import { useAreYouSureContext } from "../contexts/AreYouSureContext";

type modalTitleType = {
     children: React.ReactNode,
}

export const ModalTitle:React.FC<modalTitleType> = ({children}) => {
     return (
          <div className="title-modal">
               {children}
          </div>
     )
}


export const ModalHeader = ({selected}:any) => {
     const { setSureMsg } = useAreYouSureContext();

     const { setModal } = UseSharePostModal();

     const handleCloseModal = () => {
          if(selected){
               setSureMsg(true);
          } else {
               setModal(false);
          }
     }

     return (
         <div className="modal-header">
          <IoIosClose className='close-modal-icon' 
          onClick={handleCloseModal} 
          />
          <ModalTitle>
               <span><IoMdShare style={{position: 'relative', right: '0.5rem', fontSize: '19px'}}/>Bir şey paylaş..</span>
          </ModalTitle>
         </div>
     )
}