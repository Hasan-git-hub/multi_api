import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const FACT_API = "https://catfact.ninja/facts";

const Facts = () => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFacts = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(FACT_API, {
        params: {
          limit: 10,
          max_length: 130,
        },
      });

      setFacts(data.data || []);
    } catch {
      setError("Facts API dan ma'lumot olishda xatolik bo'ldi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFacts();
  }, []);

  return (
    <section className="section">
      <Header
        title="Facts API Page"
        description="Cat Facts API orqali qisqa qiziqarli faktlar olinadi."
      />

      <div className="control-bar">
        <button className="app-btn" type="button" onClick={getFacts}>
          Refresh Facts
        </button>
      </div>

      {loading && <p className="status-text">Yuklanmoqda...</p>}
      {!loading && error && <p className="status-text error">{error}</p>}

      <div className="grid">
        {facts.map((fact, index) => (
          <article className="card" key={`${fact.fact}-${index}`}>
            <div className="card-body">
              <h3>Fact #{index + 1}</h3>
              <p>{fact.fact}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Facts;
