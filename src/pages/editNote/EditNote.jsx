import "./EditNote.css";
import { useContext, useEffect, useState } from "react";
import { getNoteById, updateNote, deleteNote } from "../../Firebase/userService";
import { UserContext } from "../../context/userContext";

export const EditNote = ({ noteId }) => {
  const { setUserNotes, setEditNoteModal } = useContext(UserContext);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await getNoteById(noteId);
        setNote(fetchedNote);
      } catch (err) {
        console.error("Failed to fetch note:", err);
      }
    };
    fetchNote();
  }, [noteId]);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => setEditNoteModal(false), 300);
  };

  const handleSave = async () => {
    await updateNote(noteId, note);
    alert("Note updated successfully!");
    setUserNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, ...note } : n))
    );
    handleClose();
  };

  const handleDelete = async () => {
    await deleteNote(noteId);
    setUserNotes((prev) => prev.filter((n) => n.id !== noteId));
    alert("Note deleted");
    handleClose();
  };


  if (!note) return <p>Note not found.</p>;

  return (
    <div className={`modal-overlay ${animateOut ? "slide-out" : "slide-in"}`} onClick={handleClose}>
      <div className="edit-note-container">
        <h2>Title</h2>
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <h2>Content</h2>
        <textarea
          value={note.content}
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
