import React, { useState, useEffect } from "react";
import "./UserTable.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get API URL from Vite env
  const API_URL = import.meta.env.VITE_API_URL;

  const alluser = async () => {
    try {
      const response = await fetch(`${API_URL}/alluser`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.alluser || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${API_URL}/deleteuser/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Delete failed");
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        alert("Error deleting user.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    alluser();
  }, []);

  return (
    <div className="user-container">
      <h2>User List</h2>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
