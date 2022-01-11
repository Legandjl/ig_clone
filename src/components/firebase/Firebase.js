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
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

import { v4 as uuidv4 } from "uuid";
import {
  equalityQuery,
  getFirstBatch,
  getFirstFollowBatch,
  getFollowBatch,
  getNextBatch,
  getUserImageBatch,
  imageCommentQuery,
} from "./Queries";

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

  publicMethods.getDatabase = () => {
    return db;
  };

  //follow

  publicMethods.handleFollow = async (uid, userUid) => {
    await updateFollowing(uid, userUid);
    await updateFollowers(uid, userUid);
  };

  const updateFollowers = async (uid, userUid) => {
    const docSnap = await getDocs(equalityQuery(db, "users", "uid", uid));
    docSnap.forEach((item) => {
      if (item.data().followers.includes(userUid)) {
        updateDoc(item.ref, {
          followers: arrayRemove(userUid),
        });
        const followQuery = query(
          collection(db, "notifications"),
          where("sentBy", "==", userUid),
          where("type", "==", "follow")
        );

        getDocs(followQuery).then((res) => {
          res.forEach((item) => {
            deleteDoc(doc(db, "notifications", item.id));
          });
        });
      } else {
        updateDoc(item.ref, {
          followers: arrayUnion(userUid),
        });
        addDoc(collection(db, "notifications"), {
          sentBy: userUid,
          sentTo: uid,
          type: "follow",
        });
      }
    });
  };

  const updateFollowing = async (uid, userUid) => {
    const docSnap = await getDocs(equalityQuery(db, "users", "uid", userUid));
    docSnap.forEach((item) => {
      if (!item.data().following.includes(uid)) {
        updateDoc(item.ref, {
          following: arrayUnion(uid),
        });
      } else {
        updateDoc(item.ref, {
          following: arrayRemove(uid),
        });
      }
    });
  };

  publicMethods.getFollowers = async (uid) => {
    const docSnap = await getDocs(equalityQuery(db, "users", "uid", uid));
    let data = [];
    docSnap.forEach((item) => {
      data = [...item.data().followers];
    });
    return data;
  };

  publicMethods.getFollowing = async (uid) => {
    const docSnap = await getDocs(equalityQuery(db, "users", "uid", uid));
    let data = [];
    docSnap.forEach((item) => {
      data = [...item.data().following];
    });
    return data;
  };

  //likes

  publicMethods.likePost = async (appUser, pid, author) => {
    const ref = await addDoc(collection(db, "likes"), {
      uid: appUser.uid,
      pid: pid,
    });

    if (appUser.uid !== author) {
      await addDoc(collection(db, "notifications"), {
        sentBy: appUser.uid,
        sentTo: author,
        pid: pid,
        id: ref.id,
        type: "like",
      });
    }
  };

  publicMethods.unlikePost = async (id) => {
    await deleteDoc(doc(db, "likes", id));
    const docSnap = await getDocs(equalityQuery(db, "notifications", "id", id));
    docSnap.forEach((item) => {
      deleteDoc(doc(db, "notifications", item.id));
    });
  };

  publicMethods.getLikes = async (pid) => {
    const data = await getData(equalityQuery(db, "likes", "pid", pid));
    return data;
  };

  // notifications

  publicMethods.getNotifications = async (uid) => {
    const docSnap = await getDocs(
      equalityQuery(db, "notifications", "sentTo", uid)
    );

    const data = [];
    docSnap.forEach((doc) => {
      data.push({ ...doc.data(), identifier: doc.id });
    });
    return data;
  };

  // user profiles

  publicMethods.checkForUser = async (username) => {
    const docSnap = await getDocs(
      equalityQuery(db, "users", "username", username)
    );
    return docSnap.empty;
  };

  publicMethods.getUserProfile = async (uid) => {
    const data = await getData(equalityQuery(db, "users", "uid", uid));
    return data[0];
  };

  // signin/out

  publicMethods.signIn = async (username) => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const docSnap = await getDocs(equalityQuery(db, "users", "uid", user.uid));
    if (docSnap.empty) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authprovider: "google",
        email: user.email,
        profilePictureUrl: user.photoURL,
        username: username === "" ? user.displayName : username,
        followers: [],
        following: [],
      });
    }
  };

  publicMethods.signOut = () => {
    signOut(auth);
  };

  //upload

  publicMethods.uploadFile = async (user, file) => {
    const uuid = uuidv4();
    const storageRef = ref(storage, `images/${user.uid}"/"${uuid}`);
    await uploadString(storageRef, file, "data_url");

    const url = await getDownloadURL(storageRef);
    const docRef = await addDoc(collection(db, "images"), {
      downloadUrl: url,
      uploadedBy: user.uid,
      name: uuid,
      timestamp: Timestamp.now(),
    });
    return docRef.id;
  };

  //images

  publicMethods.getImages = async (followToggle, uid) => {
    let q;
    if (followToggle) {
      const following = await publicMethods.getFollowing(uid);
      if (following.length === 0) {
        return [];
      }
      q = getFirstFollowBatch(db, following);
    } else {
      q = getFirstBatch(db);
    }
    const data = await getData(q);
    return data;
  };

  publicMethods.getNextImageBatch = async (timestamp, followToggle, uid) => {
    let q;
    if (followToggle) {
      const following = await publicMethods.getFollowing(uid);
      if (following.length === 0) {
        return [];
      }
      q = getFollowBatch(db, timestamp, following);
    } else {
      q = getNextBatch(db, timestamp);
    }
    const data = await getData(q);
    return data;
  };

  publicMethods.getUserImages = async (uid) => {
    const data = await getData(getUserImageBatch(db, uid));
    return data;
  };

  publicMethods.getImageById = async (id) => {
    const docRef = doc(db, "images", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  //comments

  publicMethods.addComment = async (text, imgId, appUser) => {
    await addDoc(collection(db, "comments"), {
      imageId: imgId,
      comment: text,
      author: appUser.username,
      timestamp: Timestamp.now(),
      uid: appUser.uid,
      posterInfo: {
        poster: appUser.username,
        photoURL: appUser.profilePictureUrl,
      },
    });
  };

  publicMethods.getImageComments = async (imgId) => {
    const data = await getData(imageCommentQuery(db, imgId));
    return data;
  };

  publicMethods.deleteData = async (id, type) => {
    await deleteDoc(doc(db, type, id));
  };

  const getData = async (q) => {
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
