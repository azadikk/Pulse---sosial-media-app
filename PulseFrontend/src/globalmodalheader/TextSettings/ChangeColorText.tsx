import React from 'react';
import '../../globalmodalheader/TextSettings/textsettings.scss';
import { UseTextColorContext } from '../../contexts/TextSettingContext';

type propType = {
  setChangeTextColor: (value:boolean) => void,
  changeTextColor: boolean,
}

const ChangeColorText = ({setChangeTextColor, changeTextColor}:propType) => {
  
  const { setTextColor } = UseTextColorContext();
  const changetextcolorref = React.useRef(null);

  //if outside click for media modal
  React.useEffect(() => {
  
  const outsideClickForSettingsTextModal = (e:MouseEvent) => {
    if (changetextcolorref && changetextcolorref.current && !(changetextcolorref.current as any).contains(e.target)) {
      setChangeTextColor(false);
    }  
  }
  
  document.addEventListener('mousedown', outsideClickForSettingsTextModal);
  return () => {document.removeEventListener('mousedown', outsideClickForSettingsTextModal)}
  }, [changeTextColor])

  return (
    <div className='change-color-modal' ref={changetextcolorref}>
     <input type='color' onChange={(e) => {setTextColor(e.target.value)}}/> 
    </div>
  )
}

export default ChangeColorText