import React, { useRef, useState } from 'react';
import styles from './styles/Model.module.css';
import Image from 'next/image';
import camera from '../assets/camera.svg';
//fireBase
import {DataBase,storage} from '../firebase';
import {ref,getDownloadURL,uploadString} from '@firebase/storage'; 
import {addDoc,collection,updateDoc,serverTimestamp,doc} from '@firebase/firestore';
import {useSession} from 'next-auth/react';
//Redux
import {useDispatch,useSelector} from 'react-redux';
import { select, ShowModel } from '../Redux/actions/ModelSlice';
//Framer Motion
import {motion} from 'framer-motion';

function Model() {
    const [loading,setLoading] = useState(false);
    const value= useSelector(select);
    const dispatch = useDispatch();
    const filePickerRef = useRef(null);
    const captionRef = useRef(null); 
    const [selectedFile,setSelectedFile] = useState(null);
    const {data:session} = useSession();

    const addImageToHost = (e) =>{
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload=(readerEvent) =>{
            setSelectedFile(readerEvent.target.result)
        }
    }
    const uploadPost = async ()=>{
        if(loading) return;

        setLoading(true);
        //these data is going to stored in firestore
        const docRef = await addDoc(collection(DataBase,'posts'),{
            username:session.user.username,
            caption:captionRef.current.value,
            profileImg:session.user.image,
            timestamp:serverTimestamp()
        });
         
        const imageRef = ref(storage,`posts/${docRef.id}/image`);

        await uploadString(imageRef,selectedFile,"data_url").then(async snapshot =>{
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(DataBase, 'posts',docRef.id),{
                image:downloadURL,
            })
        });
        dispatch(ShowModel());
        setLoading(false);
        setSelectedFile(null);
    }
    return (
        <motion.div  
        initial={{opacity:0,scale:0}}
        animate={{opacity:1,scale:1}}
        exit={{opacity:0,scale:0}}
        transition={{duration:0.3,type:'spring' ,stiffness:110}}
        className={styles.main}>
            <div className={styles.model}>
                {selectedFile ? (
                   <div className={styles.imgpost}>
                        <Image src={selectedFile} alt='post' width={180} height={80}/>
                   </div>
                ):(     
                <div onClick={()=>filePickerRef.current.click()} className={styles.cameraimg}>
                    <Image src={camera} alt='camera' height='100%' width='100%'/>
                </div>
                )}
                
                <p>Upload a photo</p>
                <input 
                ref={filePickerRef}
                hidden
                
                onChange={addImageToHost}
                type="file" placeholder='Please enter a caption' />
                <input  
                    type="text" 
                    ref={captionRef}
                    disabled={!selectedFile}
                    placeholder='Please enter a caption'
                 />
                <button onClick={uploadPost}>{loading ? "Uploading..." : "Upload Post"}</button>
            </div>
        
        </motion.div>
    )
}

export default Model
