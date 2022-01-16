import { collection, limit, orderBy, query, where } from "firebase/firestore";

const getFollowBatch = (db, timestamp, following) => {
  return query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    where("timestamp", "<", timestamp),
    where("uploadedBy", "in", following),
    limit(2)
  );
};

const getUserBatch = (db, uid) => {
  return query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    limit(3),
    where("uploadedBy", "==", uid)
  );
};

const getNextUserBatch = (db, timestamp, uid) => {
  return query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    limit(3),
    where("uploadedBy", "==", uid),
    where("timestamp", "<", timestamp)
  );
};

const getNextBatch = (db, timestamp) => {
  return query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    where("timestamp", "<", timestamp),
    limit(2)
  );
};

const getFirstFollowBatch = (db, following) => {
  return query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    limit(2),
    where("uploadedBy", "in", following)
  );
};

const getFirstBatch = (db) => {
  return query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    limit(2)
  );
};

const getUserImageBatch = (db, uid) => {
  return query(
    collection(db, "images"),
    where("uploadedBy", "==", uid),
    orderBy("timestamp", "asc")
  );
};

const imageCommentQuery = (db, id) => {
  return query(
    collection(db, "comments"),
    where("imageId", "==", id),
    orderBy("timestamp", "asc")
  );
};

const followQuery = (db, userUid) => {
  return query(
    collection(db, "notifications"),
    where("sentBy", "==", userUid),
    where("type", "==", "follow")
  );
};

const equalityQuery = (db, collectionName, paramName, paramCheck) => {
  return query(
    collection(db, collectionName),
    where(paramName, "==", paramCheck)
  );
};

export {
  getFollowBatch,
  getNextBatch,
  getFirstFollowBatch,
  getFirstBatch,
  imageCommentQuery,
  getUserImageBatch,
  equalityQuery,
  followQuery,
  getUserBatch,
  getNextUserBatch,
};
