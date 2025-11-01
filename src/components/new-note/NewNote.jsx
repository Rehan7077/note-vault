import "./NewNote.css";
import { useState, useContext } from "react";
import { handlingNote } from "../../Firebase/userService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";


export const NewNote = ({ modal, setModal }) => {
  const { user, setUserNotes } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [animateOut, setAnimateOut] = useState(false);
  const navigate = useNavigate();

  if (!modal) return null;

  const closeModal = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setModal(false);
      setAnimateOut(false);
      setTitle("");
      setContent("");
      setError("");
    }, 400);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("Please enter a note title.");
    if (!content.trim()) return setError("Please write something in your note.");
    setError("");
    try {
    const newNote =  await handlingNote(user, title.trim(), content.trim());
      setUserNotes((prev)=>[newNote,...prev]);
      closeModal();
      navigate("/allnotes");
    } catch(err){
      setError("Failed to save note. Try again.");
      console.log(err)
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className={`new-note-page ${animateOut ? "slide-out-page" : "slide-in-page"}`}
        onClick={(e) => e.stopPropagation()}>
        <h2 className="title">What's in your mind</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
          ></textarea>
          <div className="btns">
            <button
              type="button"
              className="form-btn cancel-btn"
              onClick={closeModal}>
              cancel
            </button>
            <button className="form-btn" type="submit">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
