import React from "react";
import { userPosts } from "../data/Posts";
import "../globalstyle.scss";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineDelete, MdOutlineReport  } from "react-icons/md";
import { BiSolidCommentAdd } from "react-icons/bi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useCommentModal } from "../contexts/CommentModal";


type CommentType = {
  id: number;
  profile: string;
  username: string;
  content: string;
};

type AnswerType = {
  id: number,
  profile: string, 
  username: string,
  answer: string,
}

const CommentModal = ({ postid }: { postid: number }) => {

  const { setCommentModal, commentModal } = useCommentModal();

  const Comments: CommentType[] = [
    {
      id: 1,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
    {
      id: 2,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
    {
      id: 3,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
    {
      id: 4,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
    {
      id: 5,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
    {
      id: 6,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
    {
      id: 7,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
    {
      id: 8,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
    {
      id: 9,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
    {
      id: 10,
      profile: "./profexam.jpg",
      username: "azadikk",
      content:
        "lorem lorem lore 3itk lore mjrjgo orororoorogloremmm oorloerlltoe? :D",
    },
  ];

  const Answers: AnswerType[] = [
    {
      id: 1,
      profile: './examprofile.jpeg',
      username: 'hansdomw_13',
      answer: '',
    },
    {
      id: 2,
      profile: './examprofile.jpeg',
      username: 'hansdomw_13',
      answer: '',
    },
  ]


  const commentModalRef = React.useRef<HTMLDivElement | null>(null);
  //if modal outside clicked close the modal
  React.useEffect(() => {
    const ifOutSideClicked = (e:MouseEvent) => {
      if(commentModalRef.current && !commentModalRef.current.contains(e.target as Node) && Object.keys(commentModal).length > 0){
        setCommentModal({});
      }
    }

    document.addEventListener('mousedown', ifOutSideClicked);
    return () => {document.removeEventListener('mousedown', ifOutSideClicked)}
  }, [commentModal])


  //answer textarea comment for user
  const [answered, setAnswered] = React.useState<{[key:number]: boolean}>({});
  const handleAnswerComment = (commid: number) => {
    setAnswered((prevAnswer) => ({
      ...prevAnswer,
      [commid]: true,
    }));
  }


  //get the answer value from user
  const [answerValue, setAnswerValue] = React.useState<({[key:number]:string})>({});
  const getAnswerValueOnTheTextarea = (e:React.ChangeEvent<HTMLTextAreaElement>, commid:number) => {
    setAnswerValue((prevValue) => ({
      ...prevValue,
      [commid]: (prevValue[commid] = e.target.value),
    }));
  };

  
  //submit the answer
  const [submitAnswer, setSubmitAnswer] = React.useState<{[key:number]: boolean}>({});
  const handleSubmitAnswer = (commid: number) => {

    setSubmitAnswer((prevSubmit) => ({
      ...prevSubmit,
      [commid]: answerValue[commid] ? true : false
    }));

    if(submitAnswer) {
      setAnswered((prevansw) => ({
        ...prevansw,
        [commid]: false,
      }));
    }
  }


  const [commentArr, setCommentArr] = React.useState<string[]>([]);
  const [commentText, setCommentText] = React.useState("");


  const addTheComment = () => {
    if(commentText.trim() !== ""){
      setCommentArr((prevArr) => [...prevArr, commentText]);
      setCommentText("");
    }
  }


  const handleTextChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  }
  

  interface myAnswerCommentProps {
    answer: string,
  }

  const AnswerCommentDesign:React.FC<myAnswerCommentProps> = ({answer}:{answer:string}) => {
    return (
      <div>
    {Answers.map((answ) => (
      <div className="answered" key={answ.id} >
          <div className="user">
            <div className="left">
              <div className="image-provider">
              <img src={answ.profile} alt="answer-prof" />
              </div>
            <span className="username">
              <span id="username">{answ.username}</span>
              <span id="special">
                cavab göndərdi:
              </span>
            </span>
            </div>
            <span id="time">16 dəqiqə əvvəl</span>
          </div>

          <article className='comment-content'>
             <p>
              <span>{answer}</span>
            </p>
          </article>
          

          <div className="answer-comment">
              <span className="answer">Cavabla</span>
              <div className="icons">
              <MdOutlineDelete id='deleteicon' />
              <MdOutlineReport id='reporticon' />
           </div>
          </div>
      </div>
      ))}
      </div>
    )
  }

  return (
    <div className="comment-modal" ref={commentModalRef}>
      <div className="content">
        <div className="post-title">
          <div className="top-userfields">
            <MdArrowBackIosNew
              color="white"
              style={{ marginRight: "0.2rem" }}
            />
            <img src="./profexam.jpg" />
            <span>
              azaad.dd <span id="special">bunu paylaşdı:</span>
            </span>
          </div>
        </div>

        <div className="mini-content">
          {userPosts.map(
            (post) =>
              postid === post.id && (
                <div key={post.id} className="post-cont">
                  <img src={post.image} />
                </div>
              )
          )}
        </div>
      </div>

      <div className="right-area">
        <div className="title">
          <span>Şərhlər</span>
        </div>
      <div className="right-comments">
      {Comments.map((comment) => (
          <div className='comment-preview' key={comment.id}>
          <article className='user-who-commented'>
            <section className='image-provider'>
            <img src={comment.profile} />
            </section>
            <section className='user-name'>
              <span>{comment.username}</span>
              <span id='special'>bunu şərh etdi:</span>
              <span id='time'>21 gün əvvəl</span>
            </section>
          </article>

          <article className='comment-content'>
            <p>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sunt, ea culpa vero, soluta sit exercitationem cumque expedita eveniet corrupti adipisci debitis ducimus quibusdam hic architecto rem eligendi aspernatur dolorum!
          </span>
          </p>
          {answered[comment.id] ? (
            <React.Fragment>
            <div className="answered-input">
            <textarea 
            maxLength={10000}
            id="answ-input" 
            placeholder={`${comment.username}'ə cavab göndər..`}
            onChange={(e) => {getAnswerValueOnTheTextarea(e, comment.id)}}
            />

            <div className="submitbuttons">
            <button id="send"
            onClick={() => handleSubmitAnswer(comment.id)}
            >Göndər</button>
            <button id="exit" 
            onClick={() => setAnswered((prevAnsw) => ({...prevAnsw, [comment.id]: false}))}
            >Ləğv et</button>
            </div>

            </div>
            </React.Fragment>
          ):(
            <div className="answer-comment">
            <span className="answer"
            onClick={() => handleAnswerComment(comment.id)} 
            >Cavabla</span>
            <div className="icons">
            <MdOutlineDelete id='deleteicon' />
            <MdOutlineReport id='reporticon' />
            </div>
            </div>
          )}

          {submitAnswer[comment.id] && (
            <AnswerCommentDesign answer={answerValue[comment.id]}/>
          )}
          </article>
          </div>
        ))}
      </div>

      <div className="add-the-comment">
          <MdOutlineEmojiEmotions id='emoji'/>
          <textarea 
          placeholder="şərh paylaş.."
          onChange={handleTextChange}
          />
          <BiSolidCommentAdd id='addthecomment'
          onClick={addTheComment}
          />
      </div>
      </div>
    </div>
  );
};

export default CommentModal;
