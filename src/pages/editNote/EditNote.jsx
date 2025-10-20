import './EditNote.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getNoteById, updateNote, deleteNote } from "../../Firebase/userService";
import Loader from "../../components/loader/Loader";

export const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await getNoteById(id);
        setNote(fetchedNote);
      } catch (err) {
        console.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSave = async () => {
    await updateNote(id, note); 
    alert("Note saved!");
  };

  const handleDelete = async () => {
    await deleteNote(id);
    alert("Note deleted!");
    navigate("/allnotes");
  };

  if (loading) return <Loader />;

  if (!note) return <p>Note not found.</p>;

  return (
    <div  className='edit-note-container'>
      <h2>Title</h2>
      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
  
      />
      <h2 style={{color:"black"}}>Content</h2>
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        style={{ width: "100%", height: "300px", padding: "8px", fontSize: "16px" ,color:"black" }}
      />
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};