import React from "react";

type SidebarContextType = {
     sidebaropen: boolean,
     setSidebarOpen: (value: boolean) => void,
     handleCloseSidebar: () => void,
     handleOpenSidebar: () => void,
};

type PropsType = {
     children: React.ReactNode,
};

export const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export const SidebarContextProvider:React.FC<PropsType> = ({ children }) => {

     //sidebar open and close states
     const [sidebaropen, setSidebarOpen] = React.useState<boolean>(false);
     const handleCloseSidebar = () => {
     setSidebarOpen(false);
     }
     const handleOpenSidebar = () => {
     setSidebarOpen(true);
     }

     return (
          <SidebarContext.Provider value={{ sidebaropen, setSidebarOpen, handleCloseSidebar, handleOpenSidebar }}>
               {children}
          </SidebarContext.Provider>
     )
}

export const useSidebarContext = () => {
     const context = React.useContext(SidebarContext);

     if(context === undefined){
          throw new Error('Context is undefined.');
     }

     return context;
}