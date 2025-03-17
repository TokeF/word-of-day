import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


// Optionally import the services that you want to use
// import {...} from 'firebase/auth'
// import {...} from 'firebase/database';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyAJPIjFm2WFve3wtFkMGO0DZNWQ6xfwlek",
  
    authDomain: "dailyword-77828.firebaseapp.com",
  
    projectId: "dailyword-77828",
  
    storageBucket: "dailyword-77828.firebasestorage.app",
  
    messagingSenderId: "376621790874",
  
    appId: "1:376621790874:web:c7e63dd478c59b545e5123",
  
    measurementId: "G-WGW8FF4SXV"
  
  };
  
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);