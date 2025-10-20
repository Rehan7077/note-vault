import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import './Dashboard.css';
import { getUserNotes } from "../../Firebase/userService";
import { VisitChecker } from "../../check-visit/VisitChecker";
import Loader from "../../components/loader/Loader";
export const Dashboard = () => {
  const { user, } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!user) return <Loader />;
        const userNotes = await getUserNotes(user);
        setNotes(userNotes);
      } catch (err) {
        console.log("Failed to fetch user notes in dashboard:", err);
      } finally {
        setLoading(false)
      }
    };

    fetchNote();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <VisitChecker>
      <div className="hero-section">
        <h2 className="welcome-title">Welcome to NoteVault, {user.name}</h2>
        {notes.length > 0 ? (
          <h3 style={{ margin: "10px" }}>You have created {notes.length} notes</h3>
        ) : (
          <p>You haven't created any notes yet.</p>
        )}
      </div>
    </VisitChecker>
  );
};
