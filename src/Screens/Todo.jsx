import { useState, useEffect } from 'react';
import "./Todo.css";
import { collection, addDoc, setDoc, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { database } from '../Config/Firebase';

const Todo = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const todoCollectionRef = collection(database, "todos");

  useEffect(() => {
    const GetItems = async () => {
      const data = await getDocs(todoCollectionRef);
      setItems(data.docs.map((doc) => ({ id: doc.id, text: doc.data().text })));
    };

    GetItems();
  }, []);

  const addItem = async () => {
    if (input) {
      if (isEditing) {
        const itemDoc = doc(database, "todos", items[editIndex].id);
        await updateDoc(itemDoc, { text: input });
        const updatedItems = items.map((item, index) =>
          index === editIndex ? { ...item, text: input } : item
        );
        setItems(updatedItems);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const docRef = await addDoc(todoCollectionRef, { text: input });
        setItems([...items, { id: docRef.id, text: input }]);
      }
      setInput("");
    }
  };

  const deleteItem = async (index) => {
    const itemDoc = doc(database, "todos", items[index].id);
    await deleteDoc(itemDoc);
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  const editItem = (index) => {
    setInput(items[index].text);
    setIsEditing(true);
    setEditIndex(index);
  };

  const deleteAllItems = async () => {
    for (const item of items) {
      const itemDoc = doc(database, "todos", item.id);
      await deleteDoc(itemDoc);
    }
    setItems([]);
  };

  return (
    <div className="container">
      <h1>TODO</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addItem}>
        {isEditing ? "Update" : "Add"}
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <button onClick={() => editItem(index)} className="btn btn-secondary">Edit</button>
            <button onClick={() => deleteItem(index)} className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <button onClick={deleteAllItems} className="delete-all-button">
          Delete All
        </button>
      )}
    </div>
  );
};

export default Todo;