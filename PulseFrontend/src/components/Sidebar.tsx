import React from "react";
import "../styles/sidebar.scss";
import {
  IoIosSearch,
  IoMdNotificationsOutline,
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdExit 
} from "react-icons/io";
import { IoHomeOutline, IoSettingsOutline  } from "react-icons/io5";
import { MdOutlineTravelExplore, MdAccountCircle, MdWorkspacePremium } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GrLock, GrUnlock } from "react-icons/gr";
import { useSidebarContext } from "../contexts/SidebarContext";
import { UseSharePostModal } from "../contexts/SharePostModal";
import { ifModalOpened } from "../uimodals/GlobalStyleIfModalOpened";
import { ifTokenTrue, useToken } from "../contexts/TokenContext";
import { useAreYouSureContext } from "../contexts/AreYouSureContext";


type menuNavbarItemsType = {
  id: number;
  title: string;
  icon: any;
};

type accountNavbarItemsType = {
  id: number;
  title: string;
  icon: any;
};

const Sidebar = () => {

  const ifFirstLogin = localStorage.getItem('ifUserFirstLogin');

  const { sharePostModal } = UseSharePostModal();
  const { sureMsg } = useAreYouSureContext();

  const menuNavbarItems: menuNavbarItemsType[] = [
    { id: 1, title: "Ana səhifə", icon: <IoHomeOutline /> },
    { id: 2, title: "Kəşf et", icon: <MdOutlineTravelExplore /> },
    { id: 3, title: "Mesajlar", icon: <BiMessageSquareDots /> },
    { id: 4, title: "Bildirişlər", icon: <IoMdNotificationsOutline /> },
    { id: 5, title: "Yarat", icon: <FaRegSquarePlus /> },
  ];

  const accountNavbarItems: accountNavbarItemsType[] = [
    { id: 1, title: "Profil", icon: <MdAccountCircle /> },
    { id: 2, title: "Tənzimləmələr", icon: <IoSettingsOutline  /> },
    { id: 3, title: "Premium Pulse", icon: <MdWorkspacePremium /> },
    { id: 4, title: "Hesabdan çıx", icon: <IoMdExit  /> },
  ];

  //sidebar menu main menu close and open state management
  const [littleMenu, setLittleMenu] = React.useState<boolean>(false);
  const handleCloseSidebarLittleMenu = () => {
    setLittleMenu(!littleMenu);
  }
  
  //sidebar account menu close and open state management
  const [littleAccountMenu, setLittleAccountMenu] = React.useState<boolean>(false);
  const handleCloseSidebarLittleAccountMenu = () => {
    setLittleAccountMenu(!littleAccountMenu);
  }

  //sidebar open and close states
  const {sidebaropen, handleCloseSidebar, handleOpenSidebar} = useSidebarContext();

  //if sidebar closed use this code block on the menu, account, and other sidebar items
  const notDisplayOnTheSidebarItemsStyle = {
    display: sidebaropen ? '' : 'none',
  };
  const changeFontMarginPaddingOnTheIcons = {
    fontSize: sidebaropen ? '' : '22.5px', 
    marginRight: sidebaropen ? '' : '0', 
    paddingLeft: sidebaropen ? '' : '2.5px',
  };

  //if user exit on the app
  const handleExit = () => {
    localStorage.removeItem('authToken');
  }
  

  return (
    <div className={`sidebar ${sidebaropen ? 'openSide' : 'closeSide'}`}
    style={sharePostModal || sureMsg ? ifModalOpened : {}}
    >
      {/* Sidebar open and close icons */}
      {sidebaropen ? (
        <GrUnlock className="sidebarCloseIcon"
          onClick={handleCloseSidebar}
        />
      ) : (
        <GrLock className="sidebarOpenIcon"
          onClick={handleOpenSidebar}
        />
      )}
      {/* Sidebar open and close icons */}

      <div className="sidebar-top" style={notDisplayOnTheSidebarItemsStyle}>
        <img src="../pulselogo.svg" width={100} />
        <div className="searchinput">
          <input type="text" placeholder="Axtar" />
          <IoIosSearch className="search-icon" />
        </div>
      </div>

   
      <div className="sidebar-menu-area">
        <div className="menu-title">
          <h4 style={notDisplayOnTheSidebarItemsStyle}>
            Əsas 
            {littleMenu ? (
              <React.Fragment>
              <IoIosArrowUp className="closeIcon" 
              onClick={handleCloseSidebarLittleMenu}
              />
              <span
              onClick={handleCloseSidebarLittleMenu}
              style={{
              fontSize: '13px', 
              fontWeight: '300', 
              letterSpacing: '-1px',
              color: '#cecece',
              cursor: 'pointer'
            }}
              >menyunu göstər</span>
              </React.Fragment>
            ) : (
              <IoIosArrowDown className="closeIcon" 
              onClick={handleCloseSidebarLittleMenu}
              />
            )}
          </h4>
        </div>

        {menuNavbarItems.map((item) => (
          <nav className={`navlist ${littleMenu ? 'downMenu' : ''}`} key={item.id}>
            <Link to={
              item.id === 1 && ifTokenTrue ? '/' : '/giriş'
            } className="li">
              <span id="icons" style={changeFontMarginPaddingOnTheIcons}>{item.icon}</span> 
              {sidebaropen ? item.title : null}
            </Link>
          </nav>
        ))}
      </div>

      <div className="sidebar-account-area">
        <div className="account-title">
          <h4 style={notDisplayOnTheSidebarItemsStyle}>
            Hesab 
            {littleAccountMenu ? (
              <React.Fragment>
              <IoIosArrowUp className="closeIcon" 
              onClick={handleCloseSidebarLittleAccountMenu}
              />
              <span
              onClick={handleCloseSidebarLittleAccountMenu}
              style={{
                fontSize: '13px', 
              fontWeight: '300', 
              letterSpacing: '-1px',
              color: '#cecece',
              cursor: 'pointer'
            }}
            >menyunu göstər</span>
            </React.Fragment>
            ) : (
              <IoIosArrowDown className="closeIcon" 
              onClick={handleCloseSidebarLittleAccountMenu}
              />
            )}
          </h4>
        </div>

        {accountNavbarItems.map((item) => (
          <nav className={`navlist ${littleAccountMenu ? 'downMenu' : ''}`} key={item.id}>
            <Link
            onClick={item.id === 4 ? () => handleExit() : ()=>{}} 
            to={
              item.id === 1 && ifTokenTrue ? '/profil' : 
              item.id === 1 && ifFirstLogin === 'true' ? '/profil/profilə-düzəliş' :
              item.id === 1 && ifFirstLogin === 'false' ? '/profil' :
              item.id === 1 && !ifTokenTrue ? '/qeydiyyat' : 
              item.id === 4 ? '/giriş' : ''  
            } 
              className="li" id={item.id === 4 ? 'redBackground' : ''}>
              <span id="icons" style={changeFontMarginPaddingOnTheIcons}>{item.icon}</span>
              {sidebaropen ? item.title : null}
            </Link>
          </nav>
        ))}   
      </div>
    </div>
  );
};

export default Sidebar;
