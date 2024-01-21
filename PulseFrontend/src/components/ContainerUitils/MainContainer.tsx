import React from 'react'
import SharePostMainContainer from './SharePostMainContainer';
import { userPosts } from '../../data/Posts';
import { IoIosMore } from "react-icons/io";
import { BsHeartPulse } from "react-icons/bs";
import { FaHeartPulse } from "react-icons/fa6";
import { FaHeartBroken } from "react-icons/fa";
import { MdOutlineSms } from "react-icons/md";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDots, BiSolidCommentAdd  } from "react-icons/bi";
import TopMoreIconButtonModalPost from '../../uimodals/TopMoreIconButtonModalPost';
import { useCommentModal } from '../../contexts/CommentModal';
import axios from 'axios';
import { useUserInfo } from '../../contexts/UserInfo';





const MainContainer = () => {

  const { handleCommentModal, setCommentModal } = useCommentModal();
  const { userInfo } = useUserInfo();

  //trim post descriptions
  const maxPostDescriptionLength:number = 180;

  const postdescriptionref = React.useRef<HTMLDivElement | null>(null);

  const [trimDesc, setTrimDesc] = React.useState<{[key:number]: string}>({}
    );
  const [openTopMoreIconButtonModal, setOpenPostTopMoreIconButtonModal] = React.useState<{[key:number]: boolean}>({});

  //if user clicked 'daha coxunu gor';
  const handleOpenForMore = (postid: number) => {
    const updatedTrimDesc = { ...trimDesc };
  
    updatedTrimDesc[postid] = userPosts.find((element) => element.id === postid)?.postDescript || "";
  
    setTrimDesc(updatedTrimDesc);
  };

  React.useEffect(() => {
      userPosts.forEach((element) => {
        const trimDescription = element.postDescript;
        if(trimDescription.length > maxPostDescriptionLength) {
          const trim = trimDescription.trim().slice(0, maxPostDescriptionLength) + ' ... ';
          setTrimDesc((prevDesc) => ({
            ...prevDesc,
            [element.id]: trim,
          }));
        }
      })
    }, [])


  //if user clicked more icon on the post top
  const postForMoreIcon = (postid: number) => {
    setOpenPostTopMoreIconButtonModal((prevModal) => ({
      ...prevModal,
      [postid]: !prevModal[postid]
    }));
  };
  
 // like post
 const [like, setLike] = React.useState<{ [key: number]: boolean }>({});
 const handleLikePost = (postid: number) => {
   setLike((prevLike) => ({
     ...prevLike,
     [postid]: true,
   }));
 };

 // unlike post
 const handleUnlikePost = (postid: number) => {
   setLike((prevLike) => ({
     ...prevLike,
     [postid]: false,
   }));
 };

 const getLikeCount = (postid:number) => {
  return like[postid] ? 1 : 0;
 };


 interface postsTypes {
  _id: string,
  user: string,
  postDescription: string,
  postImage: string,
  postVideo: string,
  postText: string,
  postLikes: number,
  postComments: string,
 }


 //check the posts on the database
 const [posts, setPosts] = React.useState<postsTypes | any>([]);
 const getPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/getposts');
    if (response.data && Array.isArray(response.data.posts)) {
      const postsData = response.data.posts;
      setPosts(postsData);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};
 

 React.useEffect(() => {
  getPosts();
 }, [])


  return (
    <div className='main-container'>
      <SharePostMainContainer />
      <div>

      {posts.map((post:any) => (
        <div className='post-area' key={post._id}>
           <div className='post-top'>
            <div className='user-and-time'>
          
            
              <span className='username'>{post.username}</span>
              <span className='time'>{post.time}</span>
              <span className='special'>bu postu paylaşdı:</span>
            </div>

            <div className='icon-more'>
              <IoIosMore className='more' 
              onClick={() => postForMoreIcon(post._id)}
              />
            </div>
            {openTopMoreIconButtonModal[post._id] && (
              <TopMoreIconButtonModalPost />
            )}
          </div>
        </div>
      ))}
      </div>

      <div>
      {userPosts.map((post) => (
        <div className='post-area' key={post.id}>
          <div className='post-top'>
            <div className='user-and-time'>
              <div className='image-provider'>
              <img src={post.userProfile} />
              </div>
              <span className='username'>{post.username}</span>
              <span className='time'>{post.time}</span>
              <span className='special'>bu postu paylaşdı:</span>
            </div>

            <div className='icon-more'>
              <IoIosMore className='more' 
              onClick={() => postForMoreIcon(post.id)}
              />
            </div>
            {openTopMoreIconButtonModal[post.id] && (
              <TopMoreIconButtonModalPost />
            )}
          </div>

          <div className='content'>
            <img src={post.image} />
          </div>

          <div className='like-and-comment-icons'>
          <div className='icons'>
          {like[post.id] ? (
            <FaHeartPulse
              className='unlikeicon'
              onClick={() => handleUnlikePost(post.id)}
            />
          ) : (
            <BsHeartPulse
              className='like'
              onClick={() => handleLikePost(post.id)}
            />
          )}
          <MdOutlineSms className='comment' />
          </div>


            <div className='like-counts'>
              <FcLikePlaceholder className='likecountIcon' />
              <span>{getLikeCount(post.id)} Bəyənmələr</span>
            </div>
          </div>

          <div className='bottom-area'>
            <article className='username'>
              <span>{post.username} 
              <span className='special'>bunu yazdı:</span></span>
            </article>
            <section className='description'>
              <p ref={postdescriptionref}>
                {trimDesc[post.id] && post.postDescript.length > maxPostDescriptionLength ? (
                  <>
                  {trimDesc[post.id]}
                  <button className='formore' 
                  style={{display: trimDesc[post.id] === post.postDescript ? 'none' : ''}}
                  onClick={() => handleOpenForMore(post.id)}
                  >daha çoxunu gör</button>
                  </>
                  ):(
                    post.postDescript
                )}
              </p>
            </section>

            <div className='comments'>
              <div className='commit-count-and-share-input'>
                    <div className='counts-com'>
                      <BiCommentDots className='commenticon'/>
                      <span>14K Şərhlər</span>
                    </div>

                    <div className='input-field'>
                    <BiSolidCommentAdd className='inputicon'/>
                    <input type='text' 
                    name='text' 
                    autoComplete='off'
                    placeholder='Şərhini bura yaz...'
                    readOnly
                    onClick={() => handleCommentModal(post.id)}
                    />
                    </div>
              </div>

              <div className='comment-preview'>
                    <article className='user-who-commented'>
                      <section className='image-provider'>
                      <img src={post.userProfile} />
                      </section>
                      <section className='user-name'>
                        <span>{post.username}</span>
                        <span id='special'>bunu şərh etdi:</span>
                      </section>
                    </article>

                    <article className='comment-content'>
                      <p>
                        Mən bu cür birşey heç vaxt fikirləşməzdim! olmadı bu dostum..
                      </p>
                    </article>
              </div>

              <div className='show-all-comments-button'>
                    <button className='show-more-comments'
                      onClick={() => handleCommentModal(post.id)}
                    >
                      Bütün şərhlərə bax
                    </button>
                    <FaHeartBroken className='support'/>
              </div>
            </div>
          </div>
        </div>  
      ))}
      </div>
    </div>
  )
}

export default MainContainer