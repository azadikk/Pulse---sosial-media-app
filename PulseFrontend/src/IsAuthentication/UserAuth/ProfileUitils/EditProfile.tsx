import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../contexts/UserInfo";
import EditProfileModal from "./EditProfileModal";
import { useProfileContext } from "../../../contexts/UserProfileContext";
import { SuccessMsg } from "../../../errors-success/LoginError";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { VList } from "virtua";
import axios from "axios";
import { ifTokenTrue } from "../../../contexts/TokenContext";
import { Api } from "../../../api/Api";
import MainInformations from "./EditProfileUitils/MainInformations";
import UsernameProfile from "./EditProfileUitils/UsernameProfile";
import About from "./EditProfileUitils/About";
import SpecialEmoji from "./EditProfileUitils/SpecialEmoji";
import SaveChangesButtons from "./EditProfileUitils/SaveChangesButtons";
import { useAreYouSureContext } from "../../../contexts/AreYouSureContext";

//get interface for emoji types
interface Emoji {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
}




const EditProfile = () => {
  
  const {
    selectedImage,
    editProfileModal,
    handleProfileChange,
    handleInputChange,
    getUserProfile,
    setChanges,
    changes,
  } = useProfileContext();

  const { userInfo, getUsersById } = useUserInfo();
  const { sureMsg } = useAreYouSureContext();
  const { sidebaropen } = useSidebarContext();
  const navigate = useNavigate();


  const handleDiscard = () => {
    const ifUserAuth = localStorage.getItem("ifUserFirstLogin");
    if (ifUserAuth === "true") {
      localStorage.setItem("ifUserFirstLogin", "false");
    }
    const timeout: NodeJS.Timeout = setTimeout(() => {
      navigate("/profil");
    }, 200);
    return () => clearTimeout(timeout);
  };

  //if user changes anything in own profile and,
  //if user click the save changes then save changes!
  const [loadingbutton, setLoadingButton] = React.useState<boolean>(false);

  const handleSaveChanges = () => {
    setLoadingButton(true);
    setChanges(false);

    const timeout: NodeJS.Timeout = setTimeout(() => {
      setLoadingButton(false);
      alert('deyisiklikler qeyd edildi');
      handleSubmitBiography();
      window.location.reload();
    }, 2500);
    return () => clearTimeout(timeout);
  };

  //if user changes the about, smiles and writing in own special text
  const [fieldChanges, setFieldChanges] = React.useState<string>("");

  const handleFieldChanges = (value: string) => {
    setFieldChanges(value);
  };

  //BIGORAPHY States and functions
  //get the textarea value
  const [textareaChanges, setTextareaChanges] = React.useState<string>("");

  //send the bio to database
  const [userBio, setUserBio] = React.useState<string>("");
  const handleSubmitBiography = async () => {
    const token = ifTokenTrue;
    const userBioText = textareaChanges;

    try {
      const request = await axios.post(
        Api.userBioApi,
        { userBiography: userBioText },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      if (request.data) {
        console.log("data gonderildi user bio!");
        setFieldChanges("");
        // setChanges(true);

      } else {
        console.log("request.data deyil ! user bio gonderilmedi !");
      }
    } catch (error) {
      console.log("bio gonderilmedi", error);
    }
  };

  //get the bio to database
  const getBiographyOnTheDatabase = async () => {
    const token = ifTokenTrue;
    try {
      const getReq = await axios.get(Api.getUserBio, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (getReq.data && getReq.data.userBio) {
        setUserBio(getReq.data.userBio);
      } else {
        console.log("sehv var biography alinmadi getReq not found or anything do this error");
      }
    } catch (error) {
      console.log("bio alinamadi", error);
    }
  };

  //SPECIAL EMOJI MODAL and States ( or functions )
  const [specEmojiModal, setSpecEmojiModal] = React.useState<boolean>(false);
  const [emojies, setEmojies] = React.useState<Emoji[]>([]);

  //Special emoji function
  const handleSelectYourSpecialEmoji = () => {
    setSpecEmojiModal(true);
  };

  //get emoji on the open source emoji api
  const [selectedEmoji, setSelectedEmoji] = React.useState<{
    [key: string]: boolean;
  }>({});

  const [showSelectedEmojies, setShowEmojies] = React.useState<{
    [key: string]: boolean;
  }>({});

  const getEmojiLists = async () => {
    const emojiApi = "https://emoji-api.com/emojis?access_key=83706d835f78b299ece1d348f9b8ad3e302d870d";
    const req = await axios.get(emojiApi);
    try {
      if (req.data) {
        setEmojies(req.data);
      }
    } catch (error) {
      console.log("emojie not allowed", error);
    }
  };

  const maxSelectEmoji: number = 3; //allowed max emoji select count

  //if user over the max select emoji count ?
  const [showMsg, setShowMsg] = React.useState<string>("");

  const handleSelectEmoji = (slug: string) => {
    const selectedCount = Object.values(selectedEmoji).filter((selected) => selected).length;

    if (selectedCount < maxSelectEmoji || selectedEmoji[slug]) {
      setSelectedEmoji((prevSelected) => ({
        ...prevSelected,
        [slug]: true,
      }));

      setShowEmojies((prevShow) => ({
        ...prevShow,
        [slug]: true,
      }));
    } else {
      setShowMsg("overEmojies");
      const timeout: NodeJS.Timeout = setTimeout(() => {
        setShowMsg("");
      }, 6000);
      return () => clearTimeout(timeout);
    }
  };

  const deleteSelectedEmoji = (slug: string) => {
    setSelectedEmoji((prevDel) => ({
      ...prevDel,
      [slug]: false,
    }));
  };

  //send to database the emojies
  const [sendingEmojies, setSendingEmojies] = React.useState<string[]>([]);

  const handleSubmitEmojies = async () => {
    setSpecEmojiModal(false);
    setFieldChanges("");

    const token = ifTokenTrue;

    const uniqueEmojies = Array.from(new Set(sendingEmojies)); //unique emoji list of array

    if (uniqueEmojies.length > 0) {
      setChanges(true);

      const request = await axios.post(
        Api.userEmojiApi,
        { emojies: uniqueEmojies },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      try {
        if (request.data) {
          console.log(request.status);
        } else {
          console.log("salam");
        }
      } catch (error) {
        console.log("emoji gondeirlmedi", error);
      }
    } else if (uniqueEmojies.length <= 0) {
      setShowMsg("emptyEmojies");
      setSendingEmojies([]);
      const timeout: NodeJS.Timeout = setTimeout(() => {
        setShowMsg("");
      }, 6000);
      return () => clearTimeout(timeout);
    }
  };

  //get request for give in the database the special emojies
  const [givingEmojies, setGivingEmojies] = React.useState<string[]>([]);
  const handleGiveEmojies = async () => {
    const token = ifTokenTrue;
    try {
      const getReq = await axios.get(Api.getUserEmoji, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (getReq.data && getReq.data.emojies && Array.isArray(getReq.data.emojies)) {
        setGivingEmojies(getReq.data.emojies);
      } else {
        console.log("get req data and is array emojies not array");
      }
    } catch (error) {
      console.log("client side error emojiler alinmadi", error);
    }
  };

  React.useEffect(() => {
    handleGiveEmojies();
    getEmojiLists();
    getBiographyOnTheDatabase();
    getUsersById();
    getUserProfile();
  }, []);

  const SpecialEmojiModal = () => {
    return (
      <div className="special-emoji-modal">
        <div className="title">
          <div>
            <span>Səni tanımlayan emoji</span>
          </div>

          <div className="selected-emoji">
            {emojies.map((selected) => (
              <div key={selected.slug}>
                {selectedEmoji[selected.slug] && showSelectedEmojies[selected.slug] && (
                  <div className="emojies">
                    <span>
                      <IoIosCloseCircleOutline
                        id="closeEmoji"
                        onClick={() => {
                          {deleteSelectedEmoji(selected.slug)}
                          {setSendingEmojies((prevEmoji) => prevEmoji.filter((emoji) => emoji !== selected.character))}}
                        }
                      />
                      {selected.character}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <VList className="emojies">
          {emojies.map((emoji) => (
            <div
              key={emoji.slug}
              className={`emoji-lists ${selectedEmoji[emoji.slug] ? "selected" : ""}`}
              onClick={() => {
                {
                  handleSelectEmoji(emoji.slug);
                }
                {
                  setSendingEmojies((prevEmoji) => [...prevEmoji, emoji.character]);
                }
              }}>
              <span id="name">{emoji.subGroup}</span>
              <span>{emoji.character}</span>
            </div>
          ))}
        </VList>

        <div className="bottom-area">
          <button id="ok" onClick={() => handleSubmitEmojies()}>
            Saxla
          </button>

          <button id="no" onClick={() => setSpecEmojiModal(false)}>
            Ləğv et
          </button>
        </div>
      </div>
    );
  };

  //render Message
  const renderMessage = () => {
    switch (showMsg) {
      case 'overEmojies':
        return <SuccessMsg>Təəssüf ki, 3 ədəddən daha çox emoji seçə bilməzsiniz.</SuccessMsg>
      case 'emptyEmojies':
        return <SuccessMsg>Ən az 1 emoji seçməlisiniz.</SuccessMsg> 
      default:
        return null;
    }
  }

  return (
    <div className="edit-profile">
      {renderMessage()}

      {changes && <SuccessMsg>Yadda saxlamadığınız dəyişikliklər</SuccessMsg>}
      {editProfileModal && <EditProfileModal />}
      {specEmojiModal && <SpecialEmojiModal />}

      <UsernameProfile
        handleInputChange={handleInputChange}
        handleProfileChange={handleProfileChange}
        selectedImage={selectedImage}
        specEmojiModal={specEmojiModal}
      />

      <MainInformations specEmojiModal={specEmojiModal} />

      <About
        fieldChanges={fieldChanges}
        handleFieldChanges={handleFieldChanges}
        handleSubmitBiography={handleSubmitBiography}
        setFieldChanges={setFieldChanges}
        setTextareaChanges={setTextareaChanges}
        sidebaropen={sidebaropen}
        specEmojiModal={specEmojiModal}
        textareaChanges={textareaChanges}
        changes={changes}
        setChanges={setChanges}
      />

      <SpecialEmoji 
        fieldChanges={fieldChanges}
        givingEmojies={givingEmojies}
        handleFieldChanges={handleFieldChanges}
        handleSelectYourSpecialEmoji={handleSelectYourSpecialEmoji}
        specEmojiModal={specEmojiModal}
        changes={changes}
        setChanges={setChanges}
        emojies={emojies}
        showSelectedEmojies={showSelectedEmojies}
        selectedEmoji={selectedEmoji}
      />

      <SaveChangesButtons 
        changes={changes}
        handleDiscard={handleDiscard}
        handleSaveChanges={handleSaveChanges}
        loadingbutton={loadingbutton}
        specEmojiModal={specEmojiModal}
      />
      
    </div>
  );
};

export default EditProfile;
