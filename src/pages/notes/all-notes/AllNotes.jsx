import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserNotes } from "../../../Firebase/userService";
import { UserContext } from "../../../context/userContext";
import Loader from "../../../components/loader/Loader";
import './AllNotes.css'
export const AllNotes = () => {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()


  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;
      try {
        const userNotes = await getUserNotes(user);
        setNotes(userNotes);

      } catch (err) {
        console.error("Failed to fetch user notes");
      } finally {
        setLoading(false)
      }
    };

    fetchNotes();
  }, [user]);
  const handleNoteClick = (note) => {
    navigate(`/note/${note.id}`)
  }

  if (loading) return <Loader />


  return (

    <div>
      <h1 className="title">All Notes</h1>
      {notes.length > 0 ? (
        <div className="grid-container">
          {notes.map((note) => (
            <div key={note.id} className="notes" onClick={() => handleNoteClick(note)}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
};
