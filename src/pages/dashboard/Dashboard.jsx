import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import './Dashboard.css';
import { getUserNotes } from "../../Firebase/userService";
import { VisitChecker } from "../../check-visit/VisitChecker";

export const Dashboard = () => {
  const { user, userNotes} = useContext(UserContext);
  
  const recentNotes = [...userNotes]
  .sort((a, b)=>b.createdAt-a.createdAt)
  .slice(0,3)

  return (
    <VisitChecker>
      <div className="hero-section">
        <h2 className="welcome-title">Welcome to NoteVault, {user.name}</h2>
        {userNotes.length > 0 ? (
          <h3 style={{ margin: "10px" }}>You have created {userNotes.length} notes</h3>
        ) : (
          <p>You haven't created any notes yet.</p>
        )}
      </div>
    </VisitChecker> 
  );
};
