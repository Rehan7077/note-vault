import "./NewNote.css";
import { useState, useContext, useEffect, useRef } from "react";
import { db, auth } from "../../../Firebase/config";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

export const handlingNote = async (user, title, content) => {
  try {
    const notesRef = collection(db, "notes");
    await addDoc(notesRef, {
      title,
      content,
      createdAt: serverTimestamp(),
      userId: user.uid,
    });
    console.log("Note saved successfully");
  } catch (err) {
    console.log("Error saving note:", err);
  }
};
export const NewNote = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkVisit = async () => {
      if (!auth.currentUser) return;

      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(useRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const today = new Date().toDateString();
      }
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!title.trim()) {
      setError("Please enter a note title.");
      return;
    }
    if (!content.trim()) {
      setError("Please write something in your note.");
      return;
    }

    setError("");
    
    handlingNote(user, title, content)

    navigate("/allnotes");
  };

  return (
    <div className="new-note-page">
      <h2 className="title">What's in your mind</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
         className='input'
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="form-btn" type="submit">
          Save Note
        </button>
      </form>
    </div>
  );
};
