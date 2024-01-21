import React, { Children } from 'react'
import { useUserInfo } from '../../../../contexts/UserInfo'
import { FaInfo } from 'react-icons/fa6'
import { FaRegEdit } from 'react-icons/fa'
import { useAreYouSureContext } from '../../../../contexts/AreYouSureContext'

type SpecialEmojiType = {
     fieldChanges: string, 
     specEmojiModal: boolean, 
     handleFieldChanges: (value:string) => void, 
     handleSelectYourSpecialEmoji: () => void,
     givingEmojies: string[],
     changes: boolean,
     setChanges: (value: boolean) => void,
     emojies: Emoji[],
     showSelectedEmojies: {[key:string]: boolean} ,
     selectedEmoji: {[key:string]: boolean}
}

interface Emoji {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
}


const SpecialEmoji = ({
     fieldChanges, specEmojiModal, handleFieldChanges, handleSelectYourSpecialEmoji, givingEmojies,
     changes, setChanges, emojies, showSelectedEmojies, selectedEmoji
}:SpecialEmojiType) => {

     const { userInfo } = useUserInfo();
     const { sureMsg } = useAreYouSureContext();

     const EmojiRendererCondition = () => {
      return (
        <React.Fragment>
          {changes ? (
            emojies.map((selected) => (
              showSelectedEmojies[selected.slug] && selectedEmoji[selected.slug] && (
                <span key={selected.slug}>
                  {selected.character}
                </span>
              )
            ))
          ) : (
            <span id="emoji">
              {Object.keys(userInfo).map((userinfo) => userInfo[userinfo].userSpecialEmoji)}
            </span>
          )}
        </React.Fragment>
      );
    };

  return (
    <React.Fragment>
     {fieldChanges === "specialEmoji" ? (
        <div className="specialemoji"
          style={{
          pointerEvents: specEmojiModal || sureMsg ? "none" : "unset", 
          userSelect: specEmojiModal || sureMsg ? "none" : "unset",
          opacity: specEmojiModal || sureMsg ? '50%' : 'unset'
          }}>
          <div className="title">
            <div className="spec">
              <span>Dəyişdir:</span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaInfo id="infoIcon" />
                <span id="spec2">Sizi tanımlayan emojinizi seçin</span>
              </div>
            </div>
            <FaRegEdit id="editIcon" onClick={() => handleFieldChanges("specialEmoji")} />
          </div>

          <div className="main">
            <img src="../emojisvg.svg" />
            <div className="select-your-emoji">
              <span onClick={() => handleSelectYourSpecialEmoji()}>Emojini seç 🦾</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="specialemoji"
          style={{
            pointerEvents: specEmojiModal || sureMsg ? "none" : "unset",
            userSelect: specEmojiModal || sureMsg ? "none" : "unset",
            opacity: specEmojiModal || sureMsg ? '50%' : 'unset'
          }}>
          <div className="title">
            <span>Məni tanımlayan emoji</span>
            <FaRegEdit id="editIcon" onClick={() => handleFieldChanges("specialEmoji")} />
          </div>

          <div className={`main ${givingEmojies && "main2"}`}>
            <img src="../emojisvg.svg" />
            {Object.keys(userInfo).map((userinfo) => (
              <React.Fragment key={userinfo}>
                {userInfo[userinfo].userSpecialEmoji.toString().length === 0 ? (
                  <span id="not-spec-emoji">Hələki emojiniz yoxdur..</span>
                ) : (
                  <div className="givin-emojies">
                    <span id="emoji">
                      {EmojiRendererCondition()}
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default SpecialEmoji