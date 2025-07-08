import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Chart from "../charts";
import { deleteDoc, doc } from "firebase/firestore";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where
} from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) setUser(currUser);
      else navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    await addDoc(collection(db, "expenses"), {
      userId: user.uid,
      amount: parseFloat(amount),
      category,
      created: new Date()
    });

    setAmount("");
    setCategory("");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "expenses", id));
  } catch (err) {
    console.error("Error deleting expense:", err);
  }
};
  return (
  <>
    <div className="container">
      <h2>Welcome, {user?.email}</h2>

      <h3 style={{ marginTop: "2rem" }}>Add Expense</h3>
      <form onSubmit={handleAdd}>
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category (e.g., Food, Rent)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      {expenses.length > 0 && (
        <h3 style={{ marginTop: "1.5rem", color: "#2e7d32" }}>
          Total Spent: ₹
          {expenses.reduce((sum, exp) => sum + exp.amount, 0)}
        </h3>
      )}
        {expenses.length > 0 && (
  <>
    <h3 style={{ marginTop: "2rem" }}>Spending Breakdown</h3>
    <Chart data={expenses} />
  </>
)}

      <h3 style={{ marginTop: "2rem" }}>Your Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul>
  {expenses.map((exp) => (
    <li key={exp.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>₹{exp.amount} – {exp.category}</span>
      <button
        onClick={() => handleDelete(exp.id)}
        style={{
          margin: "0.1rem",
          padding: "6px 10px",
          backgroundColor: "#e53935",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          minWidth: "60px"
        }}
      >
        Delete
      </button>
    </li>
  ))}
</ul>

      )}
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#ddd",
          color: "#333",
          border: "none",
          padding: "0.5rem 1.2rem",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >Logout
      </button>
    </div>
    </div>
    
  </>
);

};

export default Dashboard;
