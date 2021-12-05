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
  deleteDoc,
  doc,
  limit,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCRLLO5Ux_40PvV0-8LkX8S1RK2HIygY0Q",

  authDomain: "instagram-43c3f.firebaseapp.com",

  projectId: "instagram-43c3f",

  storageBucket: "instagram-43c3f.appspot.com",

  messagingSenderId: "701647219261",

  appId: "1:701647219261:web:7c9b9c560a50d4d30fd854",

  measurementId: "G-XS03CEBNFD",
};

const Firebase = () => {
  initializeApp(firebaseConfig);
  const db = getFirestore();
  const storage = getStorage();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const publicMethods = {};
  publicMethods.getAuth = () => {
    return auth;
  };

  publicMethods.getNotifications = async (uid) => {
    const q = query(
      collection(db, "notifications"),
      where("sentTo", "==", uid)
    );
    const docSnap = await getDocs(q);
    const data = [];
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  };

  publicMethods.likePost = async (user, pid, author) => {
    const ref = await addDoc(collection(db, "likes"), {
      uid: user.uid,
      pid: pid,
    });

    await addDoc(collection(db, "notifications"), {
      sentBy: user.uid,
      sentTo: author,
      pid: pid,
      id: ref.id,
      photoURL: user.photoURL,
    });
  };

  publicMethods.unlikePost = async (id) => {
    await deleteDoc(doc(db, "likes", id));
    const q = query(collection(db, "notifications"), where("id", "==", id));
    const docSnap = await getDocs(q);
    docSnap.forEach((item) => {
      deleteDoc(doc(db, "notifications", item.id));
    });
  };

  publicMethods.getLikes = async (pid) => {
    const q = query(collection(db, "likes"), where("pid", "==", pid));
    const docSnap = await getDocs(q);
    const data = [];
    docSnap.forEach((doc) => {
      const likeId = doc.id;
      data.push({ ...doc.data(), likeIdentifier: likeId });
    });
    return data;
  };

  publicMethods.checkForUser = async (username) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const docSnap = await getDocs(q);
    return docSnap.empty;
  };

  publicMethods.signIn = async (username) => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docSnap = await getDocs(q);
    if (docSnap.empty) {
      console.log("usernot found");
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authprovider: "google",
        email: user.email,
        profilePictureUrl: user.photoURL,
        username: username === "" ? user.displayName : username,
      });
    }
  };

  publicMethods.signOut = () => {
    signOut(auth);
  };

  publicMethods.uploadFile = async (user, file) => {
    const uuid = uuidv4();
    const storageRef = ref(storage, `images/${user.uid}"/"${uuid}`);
    await uploadString(storageRef, file, "data_url");

    const url = await getDownloadURL(storageRef);
    await addDoc(collection(db, "images"), {
      downloadUrl: url,
      likes: {},
      uploadedBy: user.uid,
      name: uuid,
      timestamp: Timestamp.now(),
      info: { username: user.displayName, photoURL: user.photoURL },
    });
  }; //convert

  publicMethods.getImages = async () => {
    console.log("getting");
    const q = query(
      collection(db, "images"),
      orderBy("timestamp", "desc"),
      limit(2)
    );
    const docSnap = await getDocs(q);
    const data = [];
    docSnap.forEach((doc) => {
      const id = doc.id;
      data.push({ ...doc.data(), id: id }); //add img ids here
    });
    return data;
  };

  publicMethods.getNextImageBatch = async (timestamp) => {
    console.log("called");
    console.log(timestamp);
    const q = query(
      collection(db, "images"),
      where("timestamp", "<", timestamp),
      limit(2)
    );

    const docSnap = await getDocs(q);
    const data = [];
    docSnap.forEach((doc) => {
      const id = doc.id;
      data.push({ ...doc.data(), id: id }); //add img ids here
    });
    return data;
  };

  publicMethods.getUserImages = async (uid) => {
    const q = query(
      collection(db, "images"),
      where("uploadedBy", "==", uid),
      orderBy("timestamp", "asc")
    );
    const docSnap = await getDocs(q);
    const data = [];
    docSnap.forEach((doc) => {
      const id = doc.id;
      data.push({ ...doc.data(), id: id });
    });
    return data;
  };

  publicMethods.addComment = async (text, imgId, user) => {
    await addDoc(collection(db, "comments"), {
      imageId: imgId,
      comment: text,
      author: user.displayName,
      timestamp: Timestamp.now(),
      uid: user.uid,
      posterInfo: {
        poster: user.displayName,
        photoURL: user.photoURL,
      },
    });
  };

  publicMethods.getImageComments = async (imgId) => {
    const q = query(
      collection(db, "comments"),
      where("imageId", "==", imgId),
      orderBy("timestamp", "asc")
    );
    const docSnap = await getDocs(q);
    const data = [];
    docSnap.forEach((doc) => {
      const id = doc.id;
      data.push({ ...doc.data(), id: id });
    });
    return data;
  };

  return publicMethods;
};

export { Firebase };
