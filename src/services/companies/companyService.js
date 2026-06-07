import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/config";

export const createCompany = async ({
  uid,
  companyName,
  cnpj,
  phone,
  whatsapp,
  email,
  category,
  address,
  description = "",
}) => {
  const companyRef = doc(db, "companies", uid);

  await setDoc(companyRef, {
    uid,
    ownerId: uid,
    companyName,
    cnpj,
    phone,
    whatsapp,
    email,
    category,
    address,
    description,
    logoUrl: "",
    coverImageUrl: "",
    gallery: [],
    ratingAverage: 0,
    totalReviews: 0,
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const getCompanyById = async (uid) => {
  const companyRef = doc(db, "companies", uid);
  const companySnapshot = await getDoc(companyRef);

  if (!companySnapshot.exists()) {
    return null;
  }

  return companySnapshot.data();
};

export const updateCompany = async (uid, data) => {
  const companyRef = doc(db, "companies", uid);

  await updateDoc(companyRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};