import { useContext, useState, useEffect } from "react";
import { auth, db } from "../../Firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";
import { UserContext } from "../../context/userContext";
import "./Profile.css";

export const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const [fName, lName = ""] = user.name.split(" ");
      setFirstName(fName);
      setLastName(lName);
      setEmail(user.email);
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError("First & last name are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    try {
      if (auth.currentUser.email !== email) {
        await updateEmail(auth.currentUser, email);
      }
      const userRef = doc(db, "users", auth.currentUser.uid);
      const newName = `${firstName} ${lastName}`;
      await updateDoc(userRef, {
        name: newName,
        email: email,
      });

      setUser({
        ...user,
        name: newName,
        email: email,
      });

      setError("");
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. " + err.message);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          className="profile-pic"
          src={user.profilePic}
          alt="Profile"
        />
        <div className="profile-info">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};
