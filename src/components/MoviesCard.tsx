// src/components/MovieCard.tsx
import React, { useState } from "react";
import MovieModal from "../components/Modal";

interface MovieCardProps {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  Poster,
  Title,
  Type,
  Year,
  imdbID,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="movie-card">
      <img
        src={Poster}
        alt={Title}
        className="movie-card-image"
        onClick={handleClick}
      />
      <h2 className="movie-card-title">{Title}</h2>
      <p className="movie-card-rating">Year: {Year}</p>
      <p className="movie-card-rating">Type: {Type}</p>

      <MovieModal
        visible={isModalVisible}
        onClose={handleClose}
        Poster={Poster}
        Title={Title}
        Type={Type}
        Year={Year}
        imdbID={imdbID}
      />
    </div>
  );
};

export default MovieCard;
