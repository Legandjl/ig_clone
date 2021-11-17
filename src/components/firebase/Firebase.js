import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const storage = getStorage();
  const auth = getAuth();

  const publicMethods = {};
  publicMethods.getAuth = () => {
    return auth;
  };

  publicMethods.signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docSnap = await getDocs(q);
      const data = [];
      docSnap.forEach((doc) => {
        data.push(doc.data());
      });
      if (data.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authprovider: "google",
          email: user.email,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  publicMethods.signOut = () => {
    signOut(auth);
  };

  publicMethods.uploadFile = async (user, file) => {
    const storageRef = ref(storage, `images/${user.uid}"/"${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return await addDoc(collection(db, "images"), {
      downloadUrl: url,
      likes: {},
      uploadedBy: user.uid,
      name: file.name,
      timestamp: Timestamp.now(),
    });
  };

  publicMethods.getImages = async () => {
    const collectionRef = collection(db, "images");
    const docSnap = await getDocs(collectionRef);
    const data = [];
    docSnap.forEach((doc) => {
      const id = doc.id;
      data.push({ ...doc.data(), id: id }); //add img ids here
    });
    return data;
  };

  publicMethods.addComment = async (text, imgId, username) => {
    return await addDoc(collection(db, "comments"), {
      imageId: imgId,
      comment: text,
      author: username,
      timestamp: Timestamp.now(),
    }); // needs uid
  }; //del like if (uid === uid, timestamp === timestamp)

  //likes can be their own documents - bool ?

  publicMethods.getImageComments = async (imgId) => {
    const q = query(
      collection(db, "comments"),
      where("imageId", "==", imgId),
      orderBy("timestamp", "asc")
    );
    const docSnap = await getDocs(q);
    const data = [];
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };

  return publicMethods;
};

export { Firebase };
