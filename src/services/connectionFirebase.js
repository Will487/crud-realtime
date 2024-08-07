import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';


let firebaseConfig = {
    apiKey: "AIzaSyDEM7w3XpsYl3PmbkGWmTeMRglxVthWGMY",
    authDomain: "appprojeto-f7f6a.firebaseapp.com",
    projectId: "appprojeto-f7f6a",
    databaseURL: "https://appprojeto-f7f6a-default-rtdb.firebaseio.com",
    storageBucket: "appprojeto-f7f6a.appspot.com",
    messagingSenderId: "414214943440",
    appId: "1:414214943440:web:b387bd162b4c8e2deb24d5",
    measurementId: "G-B472Y93BKG"
  };

  if(!firebase.apps.lenght){
    firebase.initializeApp(firebaseConfig)

  }

  export default firebase;