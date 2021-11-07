import React from 'react'
import styles from './styles/MiniProfile.module.css';
import Image from 'next/image';

import profile from '../assets/user.png';
import {  signOut,useSession } from 'next-auth/react';

function MiniProfile() {
    const {data:session} = useSession();
    return (
        <div className={styles.MiniProfileMain}>
            <div className={styles.profilewrap}>
                <div className={styles.userProfile}>
                   {session?  <Image src={session.user.image} height={50} width={50} alt='user image'/>:""}
                </div>
                <div className={styles.namesection}>
                    <h4 className={styles.userId}>{session?.user?.username}</h4>
                    <div className={styles.username}>Welcome to Instagram</div>
                </div>
            </div>
            <button onClick={signOut} className={styles.signinout}>
                Sign Out
            </button>
        </div>
    )
}

export default MiniProfile
