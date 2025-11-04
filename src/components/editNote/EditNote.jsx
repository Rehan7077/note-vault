import "./EditNote.css";
import { useContext, useEffect, useState } from "react";
import { getNoteById, updateNote, deleteNote } from "../../Firebase/userService";
import { UserContext } from "../../context/userContext";

export const EditNote = () => {
  const { setUserNotes, setEditNoteModal, selectedNoteId } = useContext(UserContext);
  const [note, setNote] = useState(null);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await getNoteById(selectedNoteId);
        setNote(fetchedNote);
      } catch (err) {
        console.error("Failed to fetch note:", err);
      }
    };
    fetchNote();
  }, [selectedNoteId]);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => setEditNoteModal(false), 300);
  };

  const handleSave = async () => {
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
