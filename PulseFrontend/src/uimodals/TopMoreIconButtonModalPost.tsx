import React from 'react';
import { GrHide } from "react-icons/gr";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { FaRegFaceGrinHearts } from "react-icons/fa6";
import '../globalstyle.scss';

type morebuttonItemType = {
     id: number, 
     title: string, 
     icon: any,
}

const TopMoreIconButtonModalPost = () => {

     const moreButtonItems:morebuttonItemType[] = [
          {id: 1, title: 'Postu gizlət', icon: <GrHide />},
          {id: 2, title: 'Bu postu sevmədim', icon: <IoHeartDislikeOutline />},
          {id: 3, title: 'Bu cür postları çoxalt', icon: <FaRegFaceGrinHearts />},

     ]

  return (
    <div className='morebutton-modal'>
     {moreButtonItems.map((item) => (
          <nav key={item.id}>
               <span>{item.icon}</span>
               <li>{item.title}</li>
          </nav>
     ))}
    </div>
  )
}

export default TopMoreIconButtonModalPost