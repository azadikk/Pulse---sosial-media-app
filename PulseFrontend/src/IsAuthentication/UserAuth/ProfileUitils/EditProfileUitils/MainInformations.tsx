import React from 'react'
import { useUserInfo } from '../../../../contexts/UserInfo'
import { useAreYouSureContext } from '../../../../contexts/AreYouSureContext';

const MainInformations = ({specEmojiModal}:{specEmojiModal:boolean}) => {

     const { userInfo } = useUserInfo();

     type inputFieldTypes = {
          id: number;
          inputType: string;
          labelName: string;
          value?: string;
        };
      
     const inputFields: inputFieldTypes[] = [
     { id: 1, inputType: "text", labelName: "Ad" },
     { id: 2, inputType: "text", labelName: "Soyad" },
     { id: 3, inputType: "text", labelName: "Nick" },
     { id: 4, inputType: "email", labelName: "Email" },
     { id: 5, inputType: "password", labelName: "Şifrə" },
     ];

     const { sureMsg } = useAreYouSureContext();

  return (
     <div className="main-informations" style={{
          pointerEvents: specEmojiModal || sureMsg ? "none" : "unset",
          userSelect: specEmojiModal || sureMsg ? "none" : "unset",
          opacity: specEmojiModal || sureMsg ? '50%' : 'unset'
        }}>
        <div className="title">
          <span>Şəxsi məlumatlarım</span>
        </div>
        {inputFields.map((fields) => (
          <div className="input-fields" key={fields.id}>
            <input
              type={fields.inputType}
              autoComplete="none"
              readOnly
              value={
                fields.id === 1
                  ? Object.values(userInfo).find((item) => item !== null)?.name ||
                    "MƏLUMATLAR ALINARKƏN, BİR XƏTA BAŞ VERDİ"
                  : fields.id === 2
                  ? Object.values(userInfo).find((item) => item !== null)?.lastname ||
                    "MƏLUMATLAR ALINARKƏN, BİR XƏTA BAŞ VERDİ"
                  : fields.id === 3
                  ? Object.values(userInfo).find((item) => item !== null)?.nickname ||
                    "MƏLUMATLAR ALINARKƏN, BİR XƏTA BAŞ VERDİ"
                  : fields.id === 4
                  ? Object.values(userInfo).find((item) => item !== null)?.email ||
                    "MƏLUMATLAR ALINARKƏN, BİR XƏTA BAŞ VERDİ"
                  : fields.id === 5
                  ? Object.values(userInfo).find((item) => item !== null)?.password ||
                    "MƏLUMATLAR ALINARKƏN, BİR XƏTA BAŞ VERDİ"
                  : ""
              }
            />
            <label>{fields.labelName}</label>
            <button id="change">Dəyiş</button>
          </div>
        ))}

        <div className="help">
          <section>
            <span>Problem var</span>
            <img src="../helpme.svg" />
          </section>
        </div>
      </div>
  )
}

export default MainInformations