import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "my-articles-2d85f.firebaseapp.com",
    projectId: "my-articles-2d85f",
    storageBucket: "my-articles-2d85f.appspot.com",
    messagingSenderId: "424498347539",
    appId: import.meta.env.VITE_API_ID
  };

  const app = initializeApp(firebaseConfig);
  
  export const storage = getStorage(app);
  export const db = getFirestore(app);
