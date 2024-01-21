import React from "react";

type textSettingsType = {
     value: string,
     setValue: (value:string) => void,
     valueweight: string,
     setValueweight: (value:string) => void,
     setFontSize: (value:string) => void,
     setFontWeight: (value:string) => void,
     setTextColor: (value:string) => void,
     valuecolor: string,
}

type contextType = {
     children: React.ReactNode,
}

export const TextSettingsContext = React.createContext<textSettingsType | undefined>(undefined);

export const TextSettingsContextProvider:React.FC<contextType> = ({children}) => {

     const [value, setValue] = React.useState<string>("");

     const [valueweight, setValueweight] = React.useState<string>("");

     const [valuecolor, setValueColor]  = React.useState<string>("");

     const setFontSize = (fontSizeValue:string) => {
          setValue(fontSizeValue);
     }

     const setFontWeight = (fontWeightValue:string) => {
          setValueweight(fontWeightValue);
     }

     const setTextColor = (textColorValue:string) => {
          setValueColor(textColorValue);
     }

     return (
          <TextSettingsContext.Provider 
          value=
          {{
           value,
           setValue, 
           valueweight,
           setValueweight,
           setFontSize,
           setFontWeight,
           setTextColor,
           valuecolor,
          }}>
               {children}
          </TextSettingsContext.Provider>
     )
} 

export const UseTextSettingsContext = () => {
     const context = React.useContext(TextSettingsContext);
     if(context === undefined) {
          throw new Error('undefined is context use text settings context');
     } else {
          return context;
     }
}

export const UseFontWeightContext = () => {
     const context = React.useContext(TextSettingsContext);
     if(context === undefined) {
          throw new Error('undefined is context use text settings context');
     } else {
          return context;
     }
}

export const UseTextColorContext = () => {
     const context = React.useContext(TextSettingsContext);
     if(context === undefined) {
          throw new Error('undefined is context use text settings context');
     } else {
          return context;
     }
}