import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

export const createCompany = async ({
  uid,
  companyName,
  cnpj,
  phone,
  whatsapp,
  email,
  category,
  description,
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