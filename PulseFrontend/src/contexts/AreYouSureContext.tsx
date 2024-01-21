import React from "react";

type ContextValues = {
     sureMsg: boolean,
     setSureMsg: (value: boolean) => void,
};

type ContextPropsType = {
     children: React.ReactNode,
};

export const AreYouSureContext = React.createContext<ContextValues | undefined>(undefined);

export const AreYouSureContextProvider:React.FC<ContextPropsType> = ({children}) => {

     const [sureMsg, setSureMsg] = React.useState(false);

     return (
          <AreYouSureContext.Provider value={{setSureMsg, sureMsg}}>
               {children}
          </AreYouSureContext.Provider>
     )
}

export const useAreYouSureContext = () => {
     const context = React.useContext(AreYouSureContext);
     if(context === undefined){
          throw new Error('undefined or any error is are you sure context');
     } else {
          return context;
     }
}
