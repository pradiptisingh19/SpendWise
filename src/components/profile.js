import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { updatePassword, updateProfile, onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

function Profile() {
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setNewUsername(userDoc.data().username || "");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUsernameChange = async () => {
  if (!newUsername.trim()) return;
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, { username: newUsername });
    } else {
      // If user doc doesn't exist, create it
      await setDoc(userRef, { username: newUsername });
    }

    await updateProfile(user, { displayName: newUsername });
    setMessage("Username updated successfully!");
  } catch (err) {
    console.error(err);
    setMessage("Failed to update username.");
  }
};


  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      setMessage("Password should be at least 6 characters.");
      return;
    }
    try {
      await updatePassword(user, newPassword);
      setMessage("Password updated successfully!");
    } catch (err) {
      setMessage("Failed to update password. Please re-login and try again.");
    }
  };

  return (
    <div className="profile">
      <h2>Profile Settings</h2>
      <p><strong>Email:</strong> {user?.email}</p>

      <div>
        <label>Change Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button onClick={handleUsernameChange}>Update Username</button>
      </div>

      <div>
        <label>Change Password:</label>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Update Password</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
