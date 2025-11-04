import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Loader from "../../components/loader/Loader";
import { SearchBar } from "../../components/searchBar/SearchBar";
import "./AllNotes.css";

export const AllNotes = () => {
  const { userNotes, setNoteModal, setEditNoteModal, setSelectedNoteId, loading } = useContext(UserContext);
  const [filteredNotes, setFilteredNotes] = useState([]);



  useEffect(() => {
    setFilteredNotes(userNotes);
  }, [userNotes]);

  const handleNoteClick = (note) => {
    setSelectedNoteId(note.id)
    setEditNoteModal(true)

  };

  const handleSearchChange = (searchItem) => {
    const filtered = userNotes.filter((note) =>
      note.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  if (loading) return <Loader />;

  return (
    <div className="all-notes">
      {userNotes.length > 0 ? (
        <div>
          <div className="header">
            <h1 className="title">All Notes</h1>
            <SearchBar onSearchChange={handleSearchChange} className="search-bar" />
          </div>
          {filteredNotes.length > 0 ? (
            <div className="grid-container">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="notes"
                  onClick={() => handleNoteClick(note)}
                >
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">No notes match your search.</p>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <img
            src="/empty -notes.jpg"
            alt="Empty notes illustration"
            className="empty-img"
          />
          <h2 className="empty-title">No Notes Yet</h2>
          <p className="empty-text">Start writing your first note and keep your thoughts organized</p>
          <button className="create-note-btn" onClick={() => setNoteModal(true)}>
            ➕ Create Note
          </button>
        </div>
      )}

    </div>
  );
};
