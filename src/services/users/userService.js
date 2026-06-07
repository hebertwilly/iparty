import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const createClientUser = async ({
  uid,
  fullName,
  document,
  phone,
  address,
  email,
}) => {
  const userRef = doc(db, "users", uid);

  await setDoc(userRef, {
    uid,
    role: "client",
    fullName,
    document,
    phone,
    address,
    email,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const createPartnerUser = async ({
  uid,
  companyName,
  email,
  phone,
}) => {
  const userRef = doc(db, "users", uid);

  await setDoc(userRef, {
    uid,
    role: "partner",
    displayName: companyName,
    email,
    phone,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const getUserById = async (uid) => {
  const userRef = doc(db, "users", uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    return null;
  }

  return userSnapshot.data();
};