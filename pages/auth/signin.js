import React from 'react';
import styles from './signin.module.css';
import {getProviders,signIn as signinprovider} from 'next-auth/react';

import Image from 'next/image';
import logo from '../../assets/Instagram_logo.svg';
import Header from '../../components/Header';
export default function signIn({providers}) {
    return (
        <>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <div className={styles.mainPage}>
                        
                        <Image 
                            src={logo} 
                            alt='instagram logo'
                            height={300}
                            width={300}
                            className={styles.instalogo}
                        />
                        <p className={styles.diclaimer}>This is not real Instagram, This build is for learning purposes only.</p>
                        <p className={styles.developer}>Made by Pavitra Behara</p>
                    <button className={styles.signinBtn} onClick={() => signinprovider(provider.id,{callbackUrl:'/'})}>
                        Sign in with {provider.name}
                    </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export async function getServerSideProps(){
    const providers = await getProviders();
    return{
        props:{
            providers,
        }
    };
}


