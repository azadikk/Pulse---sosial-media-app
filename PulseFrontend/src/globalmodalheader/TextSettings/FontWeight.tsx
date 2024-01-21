import React from 'react';
import '../../globalmodalheader/TextSettings/textsettings.scss';
import { UseFontWeightContext } from '../../contexts/TextSettingContext';

type propType = {
     setFontWeightModal: (value:boolean) => void,
     fontWeightModal: boolean,
}
const FontWeight = ({setFontWeightModal, fontWeightModal}:propType) => {
     
     type fontWeightElementType = {
          id: number,
          title?: string,
     }

     const fontWeightElements:fontWeightElementType[] = [
          {id: 1, title: 'incə'},
          {id: 2, title: 'minimal'},
          {id: 3, title: 'orta'},
          {id: 4, title: 'qalın'},
     ]

     const { setFontWeight } = UseFontWeightContext();
     const fontweightmodalref = React.useRef(null);

     //if outside click for media modal
    React.useEffect(() => {

     const outsideClickForSettingsTextModal = (e:MouseEvent) => {
       if (fontweightmodalref && fontweightmodalref.current && !(fontweightmodalref.current as any).contains(e.target)) {
         setFontWeightModal(false);
       }  
     }
 
     document.addEventListener('mousedown', outsideClickForSettingsTextModal);
     return () => {document.removeEventListener('mousedown', outsideClickForSettingsTextModal)}
   }, [fontWeightModal])


  return (
    <div className='fontweight-modal' ref={fontweightmodalref}>
     {fontWeightElements.map((elements) => (
          <div key={elements.id} className='fontweights'>
               <span className='title'
               onClick={ () =>
                    elements.id === 1 ? setFontWeight('200')
                    : elements.id === 2 ? setFontWeight('400')
                    : elements.id === 3 ? setFontWeight('500')
                    : elements.id === 4 ? setFontWeight('700') : ()=>{}
               }>
                    {elements.title}
               </span>
          </div>
     ))}
    </div>
  )
}

export default FontWeight;