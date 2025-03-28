import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/moviesAPI";
import css from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    getCast();
  }, [movieId]);

  if (!cast.length) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={css.item}>
          {profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              className={css.img}
            />
          ) : (
            <div className={css.placeholder}>No image</div>
          )}
          <div>
            <p>
              <strong>{name}</strong>
            </p>
            <p>as {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
