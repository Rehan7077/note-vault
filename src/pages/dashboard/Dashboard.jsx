import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import './Dashboard.css';
import { VisitChecker } from "../../check-visit/VisitChecker";

export const Dashboard = () => {
  const { user, userNotes, setNoteModal, setSelectedNoteId, setEditNoteModal } = useContext(UserContext);

  const recentNotes = [...userNotes]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3)

  const handleNoteClick = (note) => {
    setSelectedNoteId(note)
    setEditNoteModal(true)
  }
  return (
    <VisitChecker>
      <div className="hero-section">
        <h2 className="welcome-title">Welcome to NoteVault, {user.name}</h2>
        {userNotes.length > 0 ? (
          <>
            <h3 className="notes-length-title">You have created {userNotes.length} notes</h3>
            <h2 className="recent-notes-title" >Your recent notes</h2>
            <div className="recent-notes">

              {recentNotes.map((note) => (
                <div className="note-card" key={note.id} onClick={() => handleNoteClick(note.id)} >
                  <h3>{note.title}</h3>
                  <p>
                    {note.content.length > 50
                      ? note.content.slice(0, 100)
                      : note.content}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-note">
            <p>You haven't created any notes yet.</p>
            <button onClick={()=>setNoteModal(true)}>Create a note</button>
          </div>

        )}
      </div>
    </VisitChecker>
  );
};
