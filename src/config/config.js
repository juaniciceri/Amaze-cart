import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCk6xsceRzTaoOiDLV9ffg9EKLzNB7SbmY",
    authDomain: "amaze-cart.firebaseapp.com",
    databaseURL: "https://amaze-cart-default-rtdb.firebaseio.com",
    projectId: "amaze-cart",
    storageBucket: "amaze-cart.appspot.com",
    messagingSenderId: "305153051585",
    appId: "1:305153051585:web:b81ca2e94758be4cb97d40"
  };
  firebase.initializeApp(firebaseConfig);
  
  const  auth= firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  export {auth,db,storage}