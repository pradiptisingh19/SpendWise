import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Lent = () => {
  const [lentTo, setLentTo] = useState("");
  const [amount, setAmount] = useState("");
  const [records, setRecords] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "lent"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      setRecords(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsub();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lentTo || !amount) return;

    await addDoc(collection(db, "lent"), {
      uid: user.uid,
      lentTo,
      amount: parseFloat(amount),
      createdAt: serverTimestamp(),
    });

    setLentTo("");
    setAmount("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "lent", id));
  };

  return (
    <div className="container">
      <h2>Lent Money</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Lent to (name)"
          value={lentTo}
          onChange={(e) => setLentTo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h3>Records</h3>
      <ul>
        {records.map((r) => (
          <li key={r.id}>
            {r.lentTo}: ₹{r.amount}{" "}
            <button onClick={() => handleDelete(r.id)} style={{ marginLeft: "10px", color: "white", backgroundColor:"red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lent;
