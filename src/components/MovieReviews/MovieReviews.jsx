import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/moviesAPI";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getReviews();
  }, [movieId]);

  if (!reviews.length) {
    return <p>No reviews available.</p>;
  }

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.item}>
          <p>
            <strong>{author}</strong>
          </p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
