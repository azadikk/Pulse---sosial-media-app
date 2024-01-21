import React, { Children } from "react";
import "../src/globalstyle.scss";
import Container from "./components/Container";
import Sidebar from "./components/Sidebar";
import { ModalHeader } from "./globalmodalheader/ModalHeader";
import { UseSharePostModal } from "./contexts/SharePostModal";
import { AiOutlineFontColors } from "react-icons/ai";
import { IoCloseCircle, IoColorPaletteOutline } from "react-icons/io5";
import { RxFontSize } from "react-icons/rx";
import { MdOutlineLineWeight } from "react-icons/md";
import FontSize from "./globalmodalheader/TextSettings/FontSize";
import { UseTextSettingsContext } from "./contexts/TextSettingContext";
import FontWeight from "./globalmodalheader/TextSettings/FontWeight";
import ChangeColorText from "./globalmodalheader/TextSettings/ChangeColorText";
import { useCommentModal } from "./contexts/CommentModal";
import { userPosts } from "./data/Posts";
import CommentModal from "./uimodals/CommentModal";
import { useNavigate } from "react-router-dom";
import { MdOutlinePermMedia } from "react-icons/md";
import { FaFileImage, FaFileVideo } from "react-icons/fa6";
import { SuccessMsg } from "./errors-success/LoginError";
import { ImageModal } from "./uimodals/ImageModal";
import { useAreYouSureContext } from "./contexts/AreYouSureContext";
import { AreYouSureComponent, AreYouSureMainText } from "./uimodals/AreYouSureMsg";
import axios from "axios";
import { Api } from "./api/Api";



export default function App() {
  const { sharePostModal, setModal } = UseSharePostModal();
  const { sureMsg, setSureMsg } = useAreYouSureContext();
  const navigate = useNavigate();

  const {
    value,
    setValue,
    valueweight,
    setValueweight,
    valuecolor,
    setTextColor,
  } = UseTextSettingsContext();
  const { 
    commentModal
  } = useCommentModal();

  const [fontSizeModal, setFontSizeModal] = React.useState<boolean>(false);
  const [fontWeightModal, setFontWeightModal] = React.useState<boolean>(false);
  const [changeTextColor, setChangeTextColor] = React.useState<boolean>(false);
  const [changeTextDecoration, setTextDecoration] = React.useState<boolean>(false);


  const handleFontSizeModal = () => {
    setFontSizeModal(!fontSizeModal);
    setFontWeightModal(false);
    setChangeTextColor(false);
  };

  const handleFontWeightModal = () => {
    setFontWeightModal(!fontWeightModal);
    setFontSizeModal(false);
    setChangeTextColor(false);
  };

  const handleChangeColorModal = () => {
    setChangeTextColor(!changeTextColor);
    setFontSizeModal(false);
    setFontWeightModal(false);
  };

  const getTextDecorationOnTheText = () => {
    setTextDecoration(!changeTextDecoration);
    setChangeTextColor(false);
    setFontSizeModal(false);
    setFontWeightModal(false);
  };

  // Refresh if modal closes the text settings
  React.useEffect(() => {
    setFontSizeModal(false);
    setFontWeightModal(false);
    setChangeTextColor(false);
    setValue("14px");
    setValueweight("400");
    setTextColor("black");
    setTextDecoration(false);
  }, [sharePostModal]);

  // This function, step by step controller on the font sizes
  const getValidFontSizes = (size: string) => {
    const validSize = [
      "14px",
      "15px",
      "16px",
      "17px",
      "18px",
      "19px",
      "20px",
      "21px",
    ];
    return validSize.includes(size) ? size : "14px";
  };

  // This function, step by step controller on the font sizes
  const getValidFontWeights = (weight: string) => {
    const validWeights = ["200", "400", "500", "700"];
    return validWeights.includes(weight) ? weight : "400";
  };

  const globalTextAreaFontSizes = {
    fontSize: getValidFontSizes(value),
  };

  const globalTextAreaFontWeights = {
    fontWeight: getValidFontWeights(valueweight),
  };

  const globalTextColors = {
    color: valuecolor,
  };

  //assign the object for the style prop my properties
  const globalTextAreaStyles = Object.assign(
    {},
    globalTextAreaFontSizes,
    globalTextAreaFontWeights,
    globalTextColors
  );

  const [mediaModal, setMediaModal] = React.useState<boolean>(false);
  const mediamodalref = React.useRef(null);
  const openMediaModal = () => {
    setMediaModal(true);
  }

  //if outside click for media modal
  React.useEffect(() => {
    const outsideClickForMediaModal = (e:MouseEvent) => {
      if (mediaModal && mediamodalref.current && !(mediamodalref.current as any).contains(e.target)) {
        setMediaModal(false);
      }  
    }

    document.addEventListener('mousedown', outsideClickForMediaModal);
    return () => {document.removeEventListener('mousedown', outsideClickForMediaModal)}
  }, [mediaModal])

  //image, video and emoji selector
  type typeSelectors = {
    id: number,
    icon: any,
    title: string,
  }
  const SelectorMedia:typeSelectors[] = [
    {
      id: 1,
      icon: <FaFileImage id='img-icon'/>,
      title: 'Şəkil'
    },
    {
      id: 2,
      icon: <FaFileVideo id='video-icon' />,
      title: 'Video',
    },
  ]

  const [selected, setSelected] = React.useState<any>();
  const [uploadFiles, setUploadFiles] = React.useState<any>();
  const [selectedVideo, setSelectedVideo] = React.useState<any>();
  const [showMsg, setShowMsg] = React.useState<boolean>(false);
  const [showUserSelectedMedia, setShowUserSelectedMedia] = React.useState<boolean>(false);

  const handleSelect = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  }

  const handleFileChange = async (e: any) => {
    const uploadFiles = await e.target.files[0];
    if (uploadFiles) {
      setVideoMediaDescription("");
      setImageMediaDescription("");

      const fileType = uploadFiles.type.split('/')[0];

      if (fileType === 'image' || fileType === 'video') {
        setMediaModal(false);
        if (fileType === 'image') {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelected(reader.result);
            setSelectedVideo(null);
          }
          reader.readAsDataURL(uploadFiles);
          setUploadFiles(uploadFiles);

        } else if (fileType === 'video') {
          const videoUrl = URL.createObjectURL(uploadFiles);
          setSelectedVideo(videoUrl); 
          setSelected(null);

        } else if (fileType !== 'video' || fileType !== 'image'){
          setShowMsg(true);
        }

      } else {
        setShowMsg(!showMsg);
      }
    }
  }
  

  const MediaModal = () => {
    return (
      <div className="media-modal" ref={mediamodalref}>
      {SelectorMedia.map((mediaselector) => (
        <div 
        key={mediaselector.id}
        onClick={() => handleSelect()} 
        className={
          mediaselector.id === 1 ? 'image-selector' : 
          mediaselector.id === 2 ? 'video-selector' : ''
          }>
            {mediaselector.icon}
            <span>{mediaselector.title}</span>
          <input 
           name="fileInput"
           id="fileInput"
           type="file" 
           onChange={handleFileChange}
           style={{display: 'none'}}
          />
        </div>
      ))}
     
      </div>
    )
  }

//send to database the user POSTS
  const [imageMediaDescription, setImageMediaDescription] = React.useState<string>("");
  const [videoMediaDescription, setVideoMediaDescription] = React.useState<string>("");


  const IfUserSelectImage = () => {
    return (
      <React.Fragment>
          <div className="user-selected-image-or-video">
            <div className="media-provider" onClick={() => setShowUserSelectedMedia(true)}>
              <img src={selected && selected} />
            </div>

            <div className="field">
              <div className="title">
              <span>Başlıq yaxud mətn əlavə edin</span>
              </div>
              <textarea 
              onChange={(e) => setImageMediaDescription(e.target.value)}
              value={imageMediaDescription}
              placeholder='İnsanlara bunu açıqlayın..'
              id="user-selected-image-or-video-textarea" 
              style={{...globalTextAreaStyles, textDecoration: changeTextDecoration ? "underline" : undefined}}
              />
            </div>
          </div>
      </React.Fragment>
    )
  }

  const IfUserSelectVideo = () => {
    return (
      <React.Fragment>
          <div className="user-selected-image-or-video">
            <div className="media-provider" onClick={() => setShowUserSelectedMedia(true)}>
              <video src={selectedVideo && selectedVideo} autoPlay/>
            </div>

            <div className="field">
              <div className="title">
              <span>Başlıq yaxud mətn əlavə edin</span>
              </div>
              <textarea 
              value={videoMediaDescription}
              onChange={(e) => setVideoMediaDescription(e.target.value)}
              placeholder='İnsanlara bunu açıqlayın..'
              id="user-selected-image-or-video-textarea" 
              style={{...globalTextAreaStyles, textDecoration: changeTextDecoration ? "underline" : undefined}}
              />
            </div>
          </div>
      </React.Fragment>
    )
  }

  const handleSubmitPost = async () => {
    try {
      setModal(false); // close the sharePostModal;
      const description = imageMediaDescription || videoMediaDescription;
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {"Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data"},
        params: {description: description}
      };

      const formData = new FormData();
      formData.append('postImg', uploadFiles);

      const sendPost = await axios.post(Api.getUserPostApi, formData, config);

      if(sendPost.data){
        console.log('post gonderildi', sendPost.status);
      } else {
        console.log('post gonderilmedi', sendPost.status)
      }

    } catch (error) {
      console.log('handlesubmitpost error', error);
    }
  }
 

  return (
    <React.Fragment>
      {localStorage.getItem('authToken') ? (

        <div className="App">

        {showUserSelectedMedia && 
        <ImageModal>
        <div className="imgmodal-title"><IoCloseCircle id='close-icon'
        onClick={() => setShowUserSelectedMedia(false)}
        /></div>
          <div id="img-modal-div">
            {selected ? (
              <img id="img-modal-img" src={selected && selected} alt="secilen-resim-video" />
            ):(
              <video src={selectedVideo && selectedVideo} controls id="video-modal-video"/>
            )}
          </div>
        </ImageModal>}

        {sureMsg && 
        <AreYouSureComponent>
        <div className="empty-is-biography">
          <div className="top-title">Əminsən?</div>
          <div className="content">
            <AreYouSureMainText>
              <span>Dəyişikliklər saxlanılmayacaq. Əminsən?</span>
            </AreYouSureMainText>

            <div className="buttons">
              <button onClick={() => {window.location.reload()}}>Bəli</button>
              <button onClick={() => setSureMsg(false)}>Yox</button>
            </div>
          </div>
        </div>
        </AreYouSureComponent>}


        {showMsg && <SuccessMsg>Yanlış format...</SuccessMsg>}

        <React.Fragment>
        {sharePostModal && (
          <div className={`share-post-modal ${sharePostModal ? "active-modal" : ""}`} 
          style={{opacity: sureMsg ? '0%' :'unset', userSelect: sureMsg ? 'none' : 'unset', pointerEvents: sureMsg ? 'none' : 'unset'}}>
            <ModalHeader selected={selected}/>
            <div className="share-area">

              <div className="text">
              {selected ? IfUserSelectImage() : selectedVideo ? IfUserSelectVideo() : ""}
              </div>
              
              <div className="settings-on-text">
                <div className="settings">
                  <RxFontSize id="textseticon" onClick={handleFontSizeModal} />
                  {fontSizeModal && <FontSize setFontSizeModal={setFontSizeModal}fontSizeModal={fontSizeModal}/>}
  
                  <MdOutlineLineWeight
                    id="textseticon"
                    onClick={handleFontWeightModal}
                  />
                  {fontWeightModal && <FontWeight setFontWeightModal={setFontWeightModal} fontWeightModal={fontWeightModal}/>}
  
                  <IoColorPaletteOutline
                    id="textseticon"
                    onClick={handleChangeColorModal}
                  />
                  {changeTextColor && <ChangeColorText setChangeTextColor={setChangeTextColor} changeTextColor={changeTextColor}/>}
  
                  <AiOutlineFontColors
                    id="textseticon"
                    onClick={getTextDecorationOnTheText}
                  />
                </div>
              </div>

              <div className="bottom-area">
                  {mediaModal && <MediaModal />}
                  <div className="add-media">
                    <button className="add-media"
                    onClick={openMediaModal}
                    >
                      <MdOutlinePermMedia id='mediaicon'/>
                      Media əlavə et
                    </button>
                  </div>
                  <div className="button">
                    <button onClick={() => handleSubmitPost()}>Paylas</button>
                  </div>
              </div>  

            </div>
          </div>
        )}
  
        {userPosts.map((post) => (
          <div key={post.id}>
            {commentModal[post.id] && <CommentModal postid={post.id}/>}
          </div>
        ))}
        
        <Sidebar />
        <Container />
        </React.Fragment>
        </div>
        ) : (
          <>{navigate('/giriş')}</>
        )}
    </React.Fragment>
  );
}
