import React, { useEffect, useState } from 'react';
import styles from './styles/Posts.module.css';
import Image from 'next/image';
import user from '../assets/dots_3.svg';
import heart from '../assets/heart.svg';
import redheart from '../assets/Liked.svg';
import message from '../assets/message.svg';
import comment from '../assets/comment.svg';
import savepost from '../assets/savepost.svg';
import emoji from '../assets/emoji.svg'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore';
import { DataBase } from '../firebase';
import {useSession} from 'next-auth/react';
import Moment from 'react-moment';
// import userimg from '../assets/user.png';
function Posts({id,postimg,username,userimg,caption}) {
    const {data:session} = useSession();
    const [Comment,setComment] = useState("");
    const [CommentArr,setCommentArr] = useState([]);
    
    const [likes,setlikes] = useState([]);
    const [haslike,sethaslike] = useState(false);

   
    const sendComment = async (e)=>{
        e.preventDefault();
        const commentTosend = Comment;
        setComment("")
        await addDoc(collection(DataBase,'posts',id,'comments'),{
            comment: commentTosend,
            usernmae: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });
    };
    const likepost = async () => {
        console.log(haslike)
        if(haslike){
            await deleteDoc(doc(DataBase,'posts',id,'likes',session.user.uid));
        }
        else{
            await setDoc(doc(DataBase,'posts',id,'likes',session.user.uid),{
                username:session.user.username, 
            });
        }
    };

    useEffect(() => 
    onSnapshot(query(collection(DataBase,'posts',id,'comments'),orderBy('timestamp','desc')),snapshot =>{
       setCommentArr(snapshot.docs);
    }), [DataBase,id]);

    useEffect(()=>{
        onSnapshot(collection(DataBase,'posts',id,'likes'),
        (snapshot) => setlikes(snapshot.docs))
        
     } ,[DataBase,id])

    useEffect(
        ()=>
            sethaslike((likes.findIndex( (like) => like.id === session?.user?.uid) )!== -1)
        ,[likes]
    );

    return (
        <div>
            <main className={styles.mainPost}>
                {/*Top Section*/}
                <div className={styles.top}>
                    <div className={styles.user}>
                        <div className={styles.profile}>
                            {/*Image */}
                            <Image src={userimg} height={70} width={70} alt="user profile"/>
                        </div>
                        <div className={styles.username}>{username}</div>
                    </div>
                    <div className={styles.more}>
                        <Image src={user} alt="more" />
                    </div>
                </div>

                {/*Middle Section*/}

                <div className={styles.postImage}>
                    
                    <Image 
                        src={postimg} 
                        className={styles.post} 
                        alt="post"
                        height={500}
                        width={620}
                        objectFit='cover'
                        
                        />
                </div>

                {/*Bottom Section*/}
                <div className={styles.bottomsectionBox}>
                    <div className={styles.Bottomsection}>
                        <div className={styles.left}>
                            {haslike ?<div onClick={likepost} className={styles.icons}>
                                <Image src={redheart} height={25}width={25} alt="like" />
                            </div> : <div onClick={likepost} className={styles.icons}>
                                <Image src={heart} height={25}width={25} alt="like" />
                            </div>}
                            <div className={styles.icons}>
                                <Image src={comment} height={25}width={25} alt="comment" />
                            </div>
                            <div className={styles.icons}>
                                <Image src={message} height={25}width={25} alt="message" />
                            </div>

                        </div>
                        <div className={styles.icons}>
                                <Image src={savepost} height={25}width={25} alt="message" />
                        </div>
                        
                    </div>
                        {/*Caption */}
                        {likes.length>0 &&
                        <div className={styles.likes}>{likes.length} Likes</div>}
                    <div className={styles.captionSection}>
                        

                         <div className={styles.username}>pavitra.js</div>
                         <div className={styles.caption}>
                             {caption}
                         </div>
                    </div>

                    {/*Comment*/}
                    {CommentArr.length > 0 &&  (
                        <div className={styles.wholeCommentBox}>
                            {CommentArr.map((comts)=>{
                                if(comts.data().userImage){
                                    return(
                                        <div key={comts.id} className={styles.mainCommentbox}>
                                            <div className={styles.userimage}>
                                                <Image src={comts.data().userImage} 
                                                alt="user"
                                                height={60}
                                                width={60}
                                                /> 
                                            </div>
                                            <div className={styles.commentbox}>
                                                <div className={styles.leftcomment}>
                                                    <div className={styles.usercomment}> 
                                                        {comts.data().usernmae}
                                                    </div>
                                                    {comts.data().comment}
                                                </div>
                                                <div>
                                                    <Moment interval={1000}  fromNow>
                                                        {comts.data().timestamp?.toDate()}
                                                    </Moment>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }
                            })}   
                        </div>
                    )}


                        {/*Comment Input*/}


                    <form className={styles.commentSection}>
                        <Image src={emoji} height={25}width={25} alt="like" />
                        <input 
                            type="text" 
                            value={Comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder='Add a comment...' 
                            className={styles.commentinput}
                        />
                        <button type='submit'
                            disabled={!Comment.trim()}
                            onClick={sendComment}
                            className={styles.postBtn}
                        >Post</button>
                    </form>

                </div>

            </main>
        </div>
    )
}

export default Posts
