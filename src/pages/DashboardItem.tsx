// src/pages/DashboardItem.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMethod } from "../utlility/rest";
import { Card, Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import dummyImage from "../assets/images/dummyImage.png";

const { Meta } = Card;

interface Movie {
  id: number;
  movie: string;
  rating: number;
  image: string;
  imdb_url: string;
}

const DashboardItem: React.FC = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data: Movie = await getMethod(
          `https://dummyapi.online/api/movies/${id}`
        );
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="centered-container">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered-container">
        <Alert message={error} type="error" />
      </div>
    );
  }
  if (!movie) {
    return (
      <div className="centered-container">
        <Alert message="Movie not found" type="warning" />
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      <Card
        hoverable
        cover={<img alt={movie.movie} src={dummyImage} />}
        style={{ width: 300 }}
        className="movie-card"
      >
        <Meta title={movie.movie} description={`Rating: ${movie.rating}`} />
        <a
          href={movie.imdb_url}
          target="_blank"
          rel="noopener noreferrer"
          className="movie-card-link"
        >
          View on IMDb
        </a>
      </Card>
    </div>
  );
};

export default DashboardItem;
