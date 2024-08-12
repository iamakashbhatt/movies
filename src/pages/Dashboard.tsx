import React, { useEffect, useState } from "react";
import { getMethod } from "../utlility/rest";
import MovieCard from "../components/MoviesCard";

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMethod(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=iron`
        );
        if (data?.Search?.length > 0) {
          setMovies(data?.Search);
        }
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="centered-container">Loading...</div>;
  if (error) return <div className="centered-container">{error}</div>;
  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold">Movie Listing</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              Poster={movie.Poster}
              Title={movie.Title}
              Type={movie.Type}
              Year={movie.Year}
              imdbID={movie.imdbID}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
