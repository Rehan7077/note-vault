import { Routes, Route } from "react-router-dom";
import { Landing } from "../pages/Landing/Landing";
import { Login } from "../pages/Login/Login";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { NewNote } from "../components/new-note/NewNote";
import { Profile } from "../pages/Profile/Profile";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { AllNotes } from "../pages/all-notes/AllNotes";

import Loader from "../components/loader/Loader";

export const AppRouter = () => {
  const { user, loading } = useContext(UserContext);
  if (loading) return <Loader />;
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/newnote" element={user ? <NewNote /> : <Navigate to="/login" />} />
      <Route path="/allnotes" element={<AllNotes />} />
 
    </Routes>
  );
};
