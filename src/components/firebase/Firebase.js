import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRLLO5Ux_40PvV0-8LkX8S1RK2HIygY0Q",

  authDomain: "instagram-43c3f.firebaseapp.com",

  projectId: "instagram-43c3f",

  storageBucket: "instagram-43c3f.appspot.com",

  messagingSenderId: "701647219261",

  appId: "1:701647219261:web:7c9b9c560a50d4d30fd854",

  measurementId: "G-XS03CEBNFD",
};

// Initialize Firebase

const Firebase = () => {
  initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth();

  const publicMethods = {};
  publicMethods.getAuth = () => {
    return auth;
  };

  publicMethods.signIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
  };

  publicMethods.signOut = () => {
    signOut(auth);
  };

  // This gives you a Google Access Token. You can use it to access the Google API.

  /*

  //const db = getFirestore();

  publicMethods.getCharacterLocations = async () => {
    const querySnapshot = await getDocs(collection(db, "characterLocations"));
    const data = [];
    querySnapshot.forEach((doc) => {
      const current = doc.data().data;
      data.push(...current);
    });
    return data;
  };  

  publicMethods.getLeaderboard = async () => {
    const collectionRef = collection(db, "leaderboard");
    const docSnap = await getDocs(collectionRef);
    const data = [];
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  }; 
  
  publicMethods.pushToLeaderboard = async (username, time) => {
    console.log("called");
    const docRef = await addDoc(collection(db, "leaderboard"), {
      name: username,
      timetaken: time,
    });
    return docRef;
  }; */

  return publicMethods;
};

export { Firebase };
