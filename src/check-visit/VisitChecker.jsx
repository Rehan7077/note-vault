import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import Loader from "../components/loader/Loader";

export const VisitChecker = ({ children }) => {
  const { user, setNoteModal } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!user) return;

    const checkVisit = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const today = new Date().toDateString();
          const lastVisit = snap.data().lastVisitDate;

          if (lastVisit !== today) { 
            setNoteModal(true)
            await updateDoc(userRef, { lastVisitDate: today });
          }
        }
      } catch (err) {
        console.log("Error:", err)
      } finally {
        setLoading(false);
      }
    };

    checkVisit();
  }, [user, navigate]);

  if (!user || loading) return <Loader/>
    return children;
};
