// src/components/MovieCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import dummyImage from "../assets/images/dummyImage.png";
interface MovieCardProps {
  id: number;
  title: string;
  rating: number;
  image: string;
  imdbUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  rating,
  image,
  imdbUrl,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/${id}`);
  };
  console.log("image", image);
  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={dummyImage} alt={title} className="movie-card-image" />
      <h2 className="movie-card-title">{title}</h2>
      <p className="movie-card-rating">Rating: {rating}</p>
      <a
        href={imdbUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="movie-card-link"
      >
        View on IMDb
      </a>
    </div>
  );
};

export default MovieCard;
