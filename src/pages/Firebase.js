import Firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyCFaPmQS39PUFSv5_9IspzxIw-ZI9_9OCs",
  authDomain: "wmiefy-577a4.firebaseapp.com",
  databaseURL: "https://wmiefy-577a4.firebaseio.com",
  projectId: "wmiefy-577a4",
  storageBucket: "wmiefy-577a4.appspot.com",
  messagingSenderId: "529190336968",
  appId: "1:529190336968:web:4a59696c1c89f9192968fd",
  measurementId: "G-RM5Y0F8GE4"
};

Firebase.initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);
Firebase.analytics();
export default Firebase;
