import { auth, provider, db } from "./config";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  where,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const today = new Date().toDateString();

export const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
        createdAt: new Date(),
        lastVisitDate: today,
      },
      { merge: true }
    );
    setUser({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      profilePic: user.photoURL,
    });

    console.log(user);
    return user;
  } catch (err) {
    console.log("Failed to login:", err);
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (err) {
    console.error("Logout error:", err);
  }
};

export const getUserNotes = async (user) => {
  try {
    const q = query(collection(db, "notes"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Error fetching user notes:", err);
    throw err;
  }
};

export const getNoteById = async (id) => {
  const noteRef = doc(db, "notes", id);
  const noteSnap = await getDoc(noteRef);
  if (noteSnap.exists()) {
    return { id: noteSnap.id, ...noteSnap.data() };
  }
  return null;
};

export const updateNote = async (id, note) => {
  const noteRef = doc(db, "notes", id);
  await updateDoc(noteRef, {
    title: note.title,
    content: note.content,
  });
};

export const deleteNote = async (id) => {
  const noteRef = doc(db, "notes", id);
  await deleteDoc(noteRef);
};
