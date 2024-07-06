import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
	const [movies, setMovies] = useState([]);

	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		fetch("https://my-movie-flix-a563168476e8.herokuapp.com/movies")
		.then((response) => response.json())
		.then((movies) => {
			const moviesFromAPI = movies.map((movie) => {
				return {
					id: movie._id,
					title: movie.Title,
					genre: movie.Genre,
					description: movie.Description,
					imagePath: movie.ImagePath,
					director: movie.Director
				}
			});
			setMovies(moviesFromAPI);
		})
	}, []);

	if (selectedMovie) {
		return (
			<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
		);
	}

	if (movies.length === 0) {
		return <div>The movie list is empty.</div>;
	} 

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard 
				key={movie.id} 
				movie={movie}
				onMovieClick={(newSelectedMovie) => {
					setSelectedMovie(newSelectedMovie);
				}}
				/>
			))}
		</div>
	);
};

