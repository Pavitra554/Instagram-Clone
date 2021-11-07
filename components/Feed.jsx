import React, { useState,useEffect } from 'react'
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import styles from './styles/Feed.module.css';
import Suggestions from './Suggestions';
import Demopost from '../assets/Demo_Post.jpg';
import Demo_post_1 from '../assets/post.jpg';
import {useSession} from 'next-auth/react';
import {useDispatch,useSelector} from 'react-redux';
import { select, ShowModel } from '../Redux/actions/ModelSlice';
import Model from './Model';
import { onSnapshot,query,collection,orderBy } from '@firebase/firestore';
import {DataBase} from '../firebase';

function Feed() {
    const {data:session} = useSession();
    const dispatch = useDispatch();
    // const [data,setData] = useState([
    //     {img:Demopost,id:1,caption:"I'm Groot, I'm Groot, I'm Groot🌱"},
    //     {img:Demo_post_1,id:2,caption:"I'm Groot, I'm Groot, I'm Groot🌱"},
    //     {img:Demo_post_1,id:3,caption:"I'm Groot, I'm Groot, I'm Groot🌱"},
    //     {img:Demopost,id:4,caption:"I'm Groot, I'm Groot, I'm Groot🌱"},
    //     {img:Demo_post_1,id:5,caption:"I'm Groot, I'm Groot, I'm Groot🌱"}
    // ]);
    const [post,setpost] = useState([]);

    const value= useSelector(select);

    useEffect(() => 
         onSnapshot(query(collection(DataBase,'posts'),orderBy('timestamp','desc')),snapshot =>{
            setpost(snapshot.docs);
    }), [DataBase]);
    
    return (
        <div className={styles.mainFeed}>
            <div className={styles.left}>
            {value && <Model/>}
                {/*Stories*/}
                <Stories/>
                {/*possts*/}
                {session && 
                    <>
                    {post.map((posts)=>{
                        if(posts.data().image){
                            return <Posts 
                            key={posts.id} 
                            id={posts.id}
                            postimg={posts.data().image} 
                            username={posts.data().username}
                            userimg = {posts.data().profileImg}
                            caption={posts.data().caption}
                            />
                        }
                    })}</>
                }
            </div>
            <div className={styles.right}>
                {/*mini profile*/}
                <MiniProfile/>
                {/* <button onClick={()=>dispatch(ShowModel())}>ENABLE SUGGESTIONS</button> */}
                {/*Suggestions*/}
                <Suggestions/>

            </div>
        </div>
    )
}

export default Feed
