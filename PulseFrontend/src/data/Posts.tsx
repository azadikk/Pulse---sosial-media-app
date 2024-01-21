import { BsHeartPulse, BsFillHeartPulseFill  } from "react-icons/bs";
import { LiaComments } from "react-icons/lia";

type PostType = {
     id: number,
     userProfile: string,
     postDescript: string,//
     username: string,
     time: string,
     image?: string,//
     video?: string,//
     text?: string,//
     icons: any,
     likes: number,//
     comments: string,//
}

const nowTime = new Date().getHours();

const customIcons = { 
     likeIcon: <BsHeartPulse />,  
     fillLikeIcon: <BsFillHeartPulseFill  />,
     commentIcon: <LiaComments />
};


export const userPosts:PostType[] = [
     {
          id: 1,
          userProfile: './profexam.jpg',
          postDescript: 'Qirpilacaq herkese! yeni bir video ile qarsinizdayam! Structured Query Language) Verilənlər bazası tezliklə / soon ... #kody_az #kodyaz #sql #database #course #mysle qarsinizdayam! Structured Query Language) Verilənlər bazası tezliklə / soon ... #kody_az #kodyaz #sql #database #course #mysle qarsinizdayam! Structured Query Language) Verilənlər bazası tezliklə / soon ... #kody_az #kodyaz #sql #database #course #mysle qarsinizdayam! Structured Query Language) Verilənlər bazası tezliklə / soon ... #kody_az #kodyaz #sql #database #course #mysqlaz #sql #database #course #mysqlaz #sql #database #course #mysqlaz #sql #database #course #mysqlaz #sql #database #course #mysqlaz #sql #database #course #mysql',
          username: 'azaad.dd',
          time: `${nowTime + 'saat əvvəl'}`,
          image: './imageback.jpg',
          icons: customIcons,
          likes: 10.000,
          comments: 'salam',
     },
     {
          id: 2,
          userProfile: './profexam.jpg',
          postDescript: 'Sala111 herkese! yeni bir video!Sala111 herkese! yeni bir video!Sala111 herkese! yeni bir video!Sala111 herkese! yeni bir video!Sala111 herkese! yeni bir video!Sala111 herkese! yeni bir video!Sala111 herkese! yeni bir video!',
          username: 'azaad.dd',
          time: `${nowTime + 'saat əvvəl'}`,
          image: './profexam.jpg',
          icons: customIcons,
          likes: 10.000,
          comments: 'salam',
     },
     {
          id: 3,
          userProfile: './profexam.jpg',
          postDescript: 'Sala111 herkese! yeni bir video!',
          username: 'azaad.dd',
          time: `${nowTime + 'saat əvvəl'}`,
          image: './imageback.jpg',
          icons: customIcons,
          likes: 10.000,
          comments: 'salam',
     },
     {
          id: 4,
          userProfile: './profexam.jpg',
          postDescript: 'Sala111 herkese! yeni bir video!',
          username: 'azaad.dd',
          time: `${nowTime + 'saat əvvəl'}`,
          image: './imageback.jpg',
          icons: customIcons,
          likes: 10.000,
          comments: 'salam',
     },
     {
          id: 5,
          userProfile: './profexam.jpg',
          postDescript: ' quos voluptas ex ipsam quo, fugit itaque architectoquos voluptas ex ipsam quo, fugit itaque architectoquos voluptas ex ipsam quo, fugit itaque architectoquos voluptas ex ipsam quo, fugit itaque architecto',
          username: 'azaad.dd',
          time: `${nowTime + 'saat əvvəl'}`,
          image: './imageback.jpg',
          icons: customIcons,
          likes: 10.000,
          comments: 'salam',
     },
]