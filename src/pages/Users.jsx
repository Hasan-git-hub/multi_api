import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const USER_API = "https://reqres.in/api/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(USER_API, {
        params: {
          page: 1,
          per_page: 10,
        },
      });

      setUsers(data.data || []);
    } catch {
      setError("Users API dan ma'lumot olishda xatolik bo'ldi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="section">
      <Header
        title="Users API Page"
        description="ReqRes Users API orqali userlar ro'yxati olinadi."
      />

      <div className="control-bar">
        <button className="app-btn" type="button" onClick={fetchUsers}>
          Load Users
        </button>
      </div>

      {loading && <p className="status-text">Yuklanmoqda...</p>}
      {!loading && error && <p className="status-text error">{error}</p>}

      <div className="grid">
        {users.map((user) => (
          <article className="card" key={user.id}>
            <img src={user.avatar} alt={user.first_name} />
            <div className="card-body">
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>{user.email}</p>
              <p>User ID: {user.id}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Users;
