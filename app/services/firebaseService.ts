import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import IWordDocument from "../models/WordDocument";

// Firestore functions
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
      } as IWordDocument;
    });
    return documents;
  } catch (error) {
    throw error;
  }
};

// Default export
const firebaseService = {
  addDocument,
  getDocuments,
};

export default firebaseService;
