import { collection, limit, orderBy, query, where } from "firebase/firestore";

const getFollowBatch = (db, timestamp, following) => {
  const q = query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    where("timestamp", "<", timestamp),
    where("uploadedBy", "in", following),
    limit(2)
  );
  return q;
};

const getNextBatch = (db, timestamp) => {
  const q = query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    where("timestamp", "<", timestamp),
    limit(2)
  );
  return q;
};

const getFirstFollowBatch = (db, following) => {
  const q = query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    limit(2),
    where("uploadedBy", "in", following)
  );

  return q;
};

const getFirstBatch = (db) => {
  const q = query(
    collection(db, "images"),
    orderBy("timestamp", "desc"),
    limit(2)
  );

  return q;
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
};
