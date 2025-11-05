import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db, auth } from "../Firebase/config";
import { getUserNotes } from "../Firebase/userService";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [noteModal, setNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(false)
  const [loading, setLoading] = useState(true);
  const [userNotes, setUserNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (users) => {
      try {
        if (users) {
          const userRef = doc(db, "users", users.uid);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          setUser(userData);

          const notes = await getUserNotes(users);
          setUserNotes(notes);
        } else {
          setUser(null);
          setUserNotes([]);
        }
      } catch (err) {
        console.log("Fail to get user:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userNotes,
        setUserNotes,
        loading,
        setLoading,
        noteModal,
        setNoteModal,
        editNoteModal,
        setEditNoteModal,
        selectedNoteId,
        setSelectedNoteId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
