import React from "react";


type areyusureType = {
  children: React.ReactNode;
};

export const AreYouSureComponent: React.FC<areyusureType> = ({ children }) => {
  return <div className="are-you-sure-modal">{children}</div>;
};

export const AreYouSureMainText: React.FC<areyusureType> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}