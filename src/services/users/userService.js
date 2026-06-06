import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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