import React from 'react';
import styles from './styles/BottomNav.module.css';
import Image from 'next/image';
import home from '../assets/home.svg';
import search from '../assets/search.svg';
import newpost from '../assets/newpost.svg';
import heart from '../assets/heart.svg';
import user from '../assets/user.png';

import { useSelector,useDispatch } from 'react-redux';
import { select, ShowModel } from '../Redux/actions/ModelSlice';
import { signIn, signOut, useSession } from 'next-auth/react';

function BottomNav() {
    const {data: session} = useSession();
    const value= useSelector(select);
    const dispatch = useDispatch();
    return (
        <div className={styles.mainNav}>
            <div className={styles.home} >
                <Image src={home} alt='home'/>
            </div>
            <div className={styles.search} >
                <Image src={search} alt='home'/>
            </div>
            <div onClick={()=>dispatch(ShowModel())} className={styles.newpost} >
                    <Image src={newpost} alt='newpost'/>
                </div>
            <div className={styles.heart} >
                <Image src={heart} alt='heart'/>
            </div>
            <div onClick={signOut} className={styles.user} >
                <Image src={session.user.image} height={50} width={50} alt='user'/>
            </div>
        </div>
    )
}

export default BottomNav
