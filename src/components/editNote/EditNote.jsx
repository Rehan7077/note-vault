import "./EditNote.css";
import { useContext, useEffect, useState } from "react";
import { getNoteById, updateNote, deleteNote } from "../../Firebase/userService";
import { UserContext } from "../../context/userContext";
import Loader from "../../components/loader/Loader";

export const EditNote = () => {
  const { setUserNotes, setEditNoteModal, selectedNoteId } = useContext(UserContext);
  const [note, setNote] = useState(null);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);


  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await getNoteById(selectedNoteId);
        setNote(fetchedNote);
      } catch (err) {
        console.error("Failed to fetch note:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [selectedNoteId]);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => setEditNoteModal(false), 300);
  };

  const handleSave = async () => {
    if (!note.title.trim()) return setError("Enter title")
    if (!note.content.trim()) return setError("Write something")
    setError("")
    await updateNote(selectedNoteId, note);
    alert("Note updated successfully!");
    setUserNotes((prev) =>
      prev.map((n) => (n.id === selectedNoteId ? { ...n, ...note } : n))
    );
    handleClose();
  };

  const handleDelete = async () => {
    await deleteNote(selectedNoteId);
    setUserNotes((prev) => prev.filter((n) => n.id !== selectedNoteId));
    alert("Note deleted");
    handleClose();
  };

  if (loading) return <Loader />;

  if (!note) return <p>Note not found.</p>;

  return (
    <div className={`modal-overlay ${animateOut ? "slide-out" : "slide-in"}`}
      onClick={handleClose}>
      <div className="edit-note-container" onClick={(e) => e.stopPropagation()}>
        <h1 className="edit-note-title" >Edit your note</h1>
        {error && <p className="error-message" >{error}</p>}
        <input
          value={note.title}
          placeholder="Note title"
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <textarea
          value={note.content}
          placeholder="Write your note here"
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />
        <div className="button-group">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
