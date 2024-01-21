import React from "react";

type contextType = {
     token: any,
     setToken: (value:any) => void,
}

type childrenType = {
     children: React.ReactNode,
}

export const TokenContext = React.createContext<contextType | undefined>(undefined);

export const ifTokenTrue = localStorage.getItem('authToken');


export const TokenContextProvider:React.FC<childrenType> = ({children}) => { 

     const [token, setToken] = React.useState("");

     return (
          <TokenContext.Provider value={{setToken, token}}>
               {children}
          </TokenContext.Provider>
     )
}

export const useToken = () => {
     const context = React.useContext(TokenContext);
     if(context === undefined) {
          throw new Error('undefined context user token context');
     } else {
          return context;
     }
}