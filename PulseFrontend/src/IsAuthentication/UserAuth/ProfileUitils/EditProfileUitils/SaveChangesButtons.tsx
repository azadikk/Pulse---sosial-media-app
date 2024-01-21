import React from 'react'
import { useAreYouSureContext } from '../../../../contexts/AreYouSureContext'

type SaveChangesButtonsPropsType = {
     loadingbutton: boolean,
     handleDiscard: () => void,
     handleSaveChanges: () => void,
     specEmojiModal: boolean,
     changes: boolean,
}

const SaveChangesButtons = ({loadingbutton,changes,handleDiscard,handleSaveChanges,specEmojiModal}:SaveChangesButtonsPropsType) => {

  const { sureMsg } = useAreYouSureContext();

  return (
     <div className="save-changes"
     style={{
       pointerEvents: specEmojiModal || sureMsg ? "none" : "unset",
       userSelect: specEmojiModal || sureMsg ? "none" : "unset",
       opacity: specEmojiModal || sureMsg ? '50%' : 'unset'
     }}>
     <button
       id={loadingbutton ? "loadingAnimButton" : "ok"}
       style={{ background: !changes ? "#696969" : "" }}
       onClick={() => {
         changes && handleSaveChanges();
       }}>
       {loadingbutton ? "Saxlanılır..." : changes ? "Dəyişikliklər var.." : "Dəyişiklikləri saxla"}
     </button>
     <button id="discard" onClick={handleDiscard}>
       Geri
     </button>
   </div>
  )
}

export default SaveChangesButtons