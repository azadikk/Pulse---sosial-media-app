import React from 'react'
import '../../globalmodalheader/TextSettings/textsettings.scss';
import { UseTextSettingsContext } from '../../contexts/TextSettingContext';

type propType = {
     setFontSizeModal: (value: boolean) => void,
     fontSizeModal: boolean
}
const FontSize = ({setFontSizeModal, fontSizeModal}:propType) => {
     
     type fontSizeElementType = {
          id: number,
          title?: string,
     }

     const fontSizeElements:fontSizeElementType[] = [
          {id: 1, title: '14px'},
          {id: 2, title: '15px'},
          {id: 3, title: '16px'},
          {id: 4, title: '17px'},
          {id: 5, title: '18px'},
          {id: 6, title: '19px'},
          {id: 7, title: '20px'},
          {id: 8, title: '21px'},
     ]

     const { setFontSize } = UseTextSettingsContext();


     //if outside click for media modal
     const fontsizemodal = React.useRef(null);
    React.useEffect(() => {
      
     const outsideClickForSettingsTextModal = (e:MouseEvent) => {
       if (fontsizemodal && fontsizemodal.current && !(fontsizemodal.current as any).contains(e.target)) {
         setFontSizeModal(false);
       }  
     }
 
     document.addEventListener('mousedown', outsideClickForSettingsTextModal);
     return () => {document.removeEventListener('mousedown', outsideClickForSettingsTextModal)}
   }, [fontSizeModal])

  return (
    <div className='fontsize-modal' ref={fontsizemodal}>
     {fontSizeElements.map((element) => (
          <div key={element.id} className='fontsizes'>
               <span className='title'
               onClick={ () =>
                    element.id === 1 ? setFontSize('14px')
                    : element.id === 2 ? setFontSize('15px')
                    : element.id === 3 ? setFontSize('16px')
                    : element.id === 4 ? setFontSize('17px')
                    : element.id === 5 ? setFontSize('18px')
                    : element.id === 6 ? setFontSize('19px')
                    : element.id === 7 ? setFontSize('20px')
                    : element.id === 8 ? setFontSize('21px') : ()=>{} 
               }
               >{element.title}</span>
          </div>
     ))}
    </div>
  )
}

export default FontSize