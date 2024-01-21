import React from "react";
import "../errors-success/errors.scss";
import { MdOutlineDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";


type loginType = {
  children: React.ReactNode;
};

export const ErrorComponent: React.FC<loginType> = ({ children }) => {
  return (
    <div className="error-login">
      <span>{children}</span>
    </div>
  );
};

export const ErrorComponent2: React.FC<loginType> = ({ children }) => {
  return (
    <div className="error-login error-login2">
      <span>{children}</span>
    </div>
  );
};

export const ErrorComponent3: React.FC<loginType> = ({ children }) => {
  return (
    <div className="error-login success-msg">
      <span>{children}</span>
    </div>
  );
};

export const SuccessMsg: React.FC<loginType> = ({ children }) => {

     const [deleteWarn, setDeleteWarn] = React.useState<boolean>(false);
     const DeleteWarn = () => {
          setDeleteWarn(true);
     }

  return (
    <div className="successed" style={{display: deleteWarn ? 'none' : ''}}>
      <IoWarningOutline id='warnicon'/>
      <span>{children}</span>
      <MdOutlineDelete id='deletewarn' onClick={DeleteWarn}/>
    </div>
  );
};
