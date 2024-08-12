import React, { useEffect, useState } from "react";
import { getMethod } from "../utlility/rest";
import MovieCard from "../components/MoviesCard";

interface Movie {
  id: number;
  movie: string;
  rating: number;
  image: string;
  imdb_url: string;
}

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data: Movie[] = await getMethod(
          "https://dummyapi.online/api/movies"
        );
        setMovies(data);
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
      <h1 className="text-3xl font-bold">Movie Dashboard</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.movie}
              rating={movie.rating}
              image={movie.image}
              imdbUrl={movie.imdb_url}
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
