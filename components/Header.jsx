import React, { useState } from 'react';
import styles from './styles/Header.module.css';
import Image from 'next/image';

import logo from '../assets/Instagram_logo.svg';
import home from '../assets/home.svg';
import messanger from '../assets/messanger.svg';
import newpost from '../assets/newpost.svg';
import Explore from '../assets/Explore.svg';
import heart from '../assets/heart.svg';
import camera from '../assets/camera.svg';
import user from '../assets/user.png';

import { MdSearch } from "react-icons/md";
import BottomNav from './BottomNav';
import { signIn, signOut, useSession } from 'next-auth/react';

import {useDispatch,useSelector} from 'react-redux';
import { select, ShowModel } from '../Redux/actions/ModelSlice';

function Header() {
    const [SiconOn,setSionOn] = useState(false);

    const {data: session} = useSession();
    const value= useSelector(select);
    const dispatch = useDispatch();
    return (
        
        <div className={styles.nav}>
            <div className={styles.main}>
                {/*left*/}

                <div className={styles.camera}>
                    <Image src={camera} alt='logo'/>  
                </div>
                <div className={styles.logo}>
                    <Image src={logo} alt='logo'/>  
                </div>

                {/*Middle*/}

                <div className={styles.search}>
                        <div className={SiconOn? styles.Searchicon :styles.searchicon}>
                            <MdSearch color='#B3B3B3'/>
                        </div>
                        <input onClick={()=>setSionOn(!SiconOn)} className={styles.searchinput} type="text" placeholder='Search'/>
                </div>  

                {/*Right*/}

                <div className={styles.menu}>
                    <div className={styles.home} >
                        <Image src={home} alt='home'/>
                    </div>
                    {session ?(
                        <>
                        <div className={styles.messanger} ><p>2</p>
                        <Image src={messanger} alt='messanger'/>
                        </div>
                        <div onClick={()=>dispatch(ShowModel())} className={styles.newpost} >
                            <Image src={newpost} alt='newpost'/>
                        </div>
                        <div className={styles.Explore} >
                            <Image src={Explore} alt='Explore'/>
                        </div>
                        <div className={styles.heart} >
                            <Image src={heart} alt='heart'/>
                        </div>
                        <div onClick={signOut} className={styles.user} >
                            <Image src={session.user.image} height={100} width={100} alt='user'/>
                        </div >
                        </>
                    ):(
                        <>
                        <button onClick={signIn}>Sign in</button>
                        </>
                    )}

                    {/*Bottom Navigation*/}


                    
                </div>
            </div>
            <BottomNav/>
        </div>
      
    )
}

export default Header
