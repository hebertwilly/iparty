import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/config";

export const createProduct = async (companyId, data) => {
  const productsRef = collection(db, "products");

  const productData = {
    companyId,

    title: data.title,
    description: data.description,
    categories: data.categories,

    pricing: data.pricing,
    pricingNotes: data.pricingNotes || "",

    media: data.media,

    availability: data.availability,

    isActive: data.isActive,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(productsRef, productData);

  return docRef.id;
};

export const getProductsByCompany = async (companyId) => {
  const productsRef = collection(db, "products");

  const q = query(
    productsRef,
    where("companyId", "==", companyId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

export const getProductById = async (productId) => {
  const productRef = doc(db, "products", productId);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const updateProduct = async (productId, data) => {
  const productRef = doc(db, "products", productId);

  await updateDoc(productRef, {
    title: data.title,
    description: data.description,
    categories: data.categories,
    pricing: data.pricing,
    pricingNotes: data.pricingNotes || "",
    media: data.media,
    availability: data.availability,
    isActive: data.isActive,
    updatedAt: serverTimestamp(),
  });
};

export const toggleProductStatus = async (productId, isActive) => {
  const productRef = doc(db, "products", productId);

  await updateDoc(productRef, {
    isActive,
    updatedAt: serverTimestamp(),
  });
};