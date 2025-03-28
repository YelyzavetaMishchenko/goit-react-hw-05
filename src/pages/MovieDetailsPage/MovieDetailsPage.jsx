import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/moviesAPI";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovie();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const { title, overview, genres, vote_average, poster_path } = movie;

  return (
    <div className={css.wrapper}>
      <button className="btn" onClick={() => navigate(backLink)}>
        ← Go back
      </button>

      <div className={css.content}>
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={title}
            className={css.poster}
          />
        )}
        <div>
          <h2>{title}</h2>
          <p>
            <strong>Rating:</strong> {vote_average}
          </p>
          <p>
            <strong>Overview:</strong> {overview}
          </p>
          <p>
            <strong>Genres:</strong> {genres.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>

      <hr />
      <h3>Additional information</h3>
      <ul className={css.links}>
        <li>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>

      <hr />
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
