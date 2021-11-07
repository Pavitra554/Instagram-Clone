// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from '@firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCDtXlH_GQfhGc5jfmFH4Rssa-QSFDkh2k",
  authDomain: "instagram-clone-2e460.firebaseapp.com",
  projectId: "instagram-clone-2e460",
  storageBucket: "instagram-clone-2e460.appspot.com",
  messagingSenderId: "271912125557",
  appId: "1:271912125557:web:178a8e2641bab8f3ef643c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const DataBase = getFirestore();
const storage = getStorage();


export {app,DataBase,storage};
