import React from "react";
import { useUserInfo } from "../../../../contexts/UserInfo";
import { MdRadioButtonUnchecked, MdOutlineCheck } from "react-icons/md";
import { FaInfo } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useAreYouSureContext } from "../../../../contexts/AreYouSureContext";
import { AreYouSureComponent, AreYouSureMainText } from "../../../../uimodals/AreYouSureMsg";
import axios from "axios";
import { Api } from "../../../../api/Api";
import { ifTokenTrue } from "../../../../contexts/TokenContext";

type AboutPropsType = {
  fieldChanges: string;
  specEmojiModal: boolean;
  handleSubmitBiography: () => void;
  textareaChanges: string;
  setFieldChanges: (value: string) => void;
  sidebaropen: boolean;
  setTextareaChanges: (value: string) => void;
  handleFieldChanges: (value: string) => void;
  changes: boolean;
  setChanges: (value: boolean) => void;
};

const About = ({
  fieldChanges,
  specEmojiModal,
  textareaChanges,
  setFieldChanges,
  sidebaropen,
  setTextareaChanges,
  changes,
  setChanges,
}: AboutPropsType) => {

  const token = localStorage.getItem('authToken');

  const { userInfo } = useUserInfo();
  const { setSureMsg, sureMsg } = useAreYouSureContext();


  //if user empty own biography ?

  const handleEmptyBio = async () => {
    try {
      const deleteBiography = await axios.delete(Api.deleteBio, {headers: {
        "Authorization": `Bearer ${token}`,
      }});

      if(deleteBiography.data){
        setSureMsg(false);
        window.location.reload();
        console.log('bio silindi', deleteBiography.status);
      } else {
        console.log('bio silinmedi', deleteBiography.status)
      }
    } catch (error) {
      console.log('bio silinmedi', error);
    }
  }

  //user special modal are you sure ?
  const SureModal = () => {
    return (
    <AreYouSureComponent>
        <div className="empty-is-biography">
          <div className="top-title">Əminsən?</div>
          <div className="content">
            <AreYouSureMainText>
              <span>Bioqrafiyanı silmək istədiyindən əminsən?</span>
            </AreYouSureMainText>

            <div className="buttons">
              <button onClick={handleEmptyBio}>Bəli</button>
              <button onClick={() => setSureMsg(false)}>Yox</button>
            </div>
          </div>
        </div>
      </AreYouSureComponent>)
  }

  //if biography is empty then run this process
  const [emptyBio, setEmptyBio] = React.useState<string>("");
  const checkTheBio = async () => {
    try {
      const checkBio = await axios.get(Api.getUserBio, {headers: {
        "Authorization": `Bearer ${token}`,
      }})

      if(checkBio.data.userBio && checkBio.data){
        console.log('bio yoxlandi');
        setEmptyBio(checkBio.data.userBio);
      } else {
        console.log('bio yoxlanmadi checkBio xeta err no23');
      }
    }catch(error){
      console.log('bio yoxlanmadi', error)
    }
  }
  
  React.useEffect(() => {
      checkTheBio();
  }, [])

  return (
    <React.Fragment>
      {sureMsg && <SureModal /> }
      {fieldChanges === "about" ? (
        <div className="about" style={{ 
          pointerEvents: specEmojiModal || sureMsg ? "none" : "unset", 
          userSelect: specEmojiModal || sureMsg ? "none" : "unset",
          opacity: specEmojiModal || sureMsg ? '50%' : 'unset'
          
          }}>
          <div className="title">
            <div className="spec2">
              <span>Dəyişdir:</span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaInfo id="infoIcon" />
                <span id="spec">Özünüzdən bəhs edin və ya sevdiyiniz şeylərdən..</span>
              </div>
            </div>
            <div className="icons">
              <span className={emptyBio.length === 0 ? 'empty-is-bio' : ''} id="no-bio-yet" 
               onClick={() => {setSureMsg(true), emptyBio.length === 0 && setSureMsg(false)}}>
                {emptyBio.length === 0 ? 'Bio boşdur' : 'Boş saxla'}
              </span>
              {textareaChanges && (
                <MdOutlineCheck
                  id="checkIcon"
                  onClick={() => { setFieldChanges(""), setChanges(true) }}
                />
              )}
              <MdRadioButtonUnchecked id="uncheckIcon" onClick={() => setFieldChanges("")} />
            </div>
          </div>

          <textarea
            id="about-textarea"
            maxLength={450}
            placeholder="Maksimum 450 hərf"
            cols={sidebaropen ? 100 : 112}
            rows={3}
            onChange={(e) => setTextareaChanges(e.target.value)}
          />
        </div>
      ) : (
        <div className="about-changed"
        style={{pointerEvents: specEmojiModal || sureMsg ? "none" : "unset", 
        userSelect: specEmojiModal || sureMsg ? "none" : "unset",
        opacity: specEmojiModal || sureMsg ? '50%' : 'unset'}}
        >
          {Object.keys(userInfo).map((userbio) => (
            <div className="about-changed2" key={userbio}>
              <div className="about-changed-title">
                <span>Haqqımda</span> 
                <FaRegEdit id="about-changed-edit-icon" onClick={() => setFieldChanges('about')}/>
              </div>
              <div className="bio">
                <p> 
                  {changes ? textareaChanges : !changes ? userInfo[userbio].userBiography : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default About;
 
