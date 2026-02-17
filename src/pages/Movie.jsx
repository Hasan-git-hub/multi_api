import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const OMDB_API_KEY = "c65fcde9";

const Movie = () => {
  const [query, setQuery] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = useCallback(async (term) => {
    const cleaned = term.trim();

    if (!cleaned) {
      setMovies([]);
      setError("Qidiruv uchun film nomi kiriting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: OMDB_API_KEY,
          s: cleaned,
        },
      });

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "Natija topilmadi.");
        return;
      }

      setMovies(data.Search || []);
    } catch {
      setError("Movie API bilan bog'lanishda xatolik bo'ldi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchMovies("Spider-Man");
  }, [searchMovies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies(query);
  };

  return (
    <section className="section">
      <Header
        title="Movie API Page"
        description="OMDB API orqali film qidiruvi. Qidiruv, hover, active va focus holatlari qo'shilgan."
      />

      <form className="control-bar" onSubmit={handleSubmit}>
        <input
          className="app-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Masalan: Inception"
        />
        <button className="app-btn" type="submit">
          Search Movie
        </button>
      </form>

      {loading && <p className="status-text">Yuklanmoqda...</p>}
      {!loading && error && <p className="status-text error">{error}</p>}

      <div className="grid">
        {movies.map((movie) => (
          <article className="card" key={movie.imdbID}>
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
            ) : (
              <div className="poster-fallback">Poster mavjud emas</div>
            )}
            <div className="card-body">
              <h3>{movie.Title}</h3>
              <p>Yili: {movie.Year}</p>
              <p>Turi: {movie.Type}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Movie;
