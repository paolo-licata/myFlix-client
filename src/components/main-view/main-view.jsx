import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser? storedUser : null);
	const [token, setToken] = useState(storedToken? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		if (!token) {
			return;
		}

		fetch("https://my-movie-flix-a563168476e8.herokuapp.com/movies", {
			headers: { Authorization: `Bearer ${token}`}
		})
		.then((response) => response.json())
		.then((movies) => {
			console.log(movies);
			const moviesFromAPI = movies.map(movie =>  {
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
		});
	}, [token]);
			

	if (!user) {
		return (
			<>
			 <LoginView onLoggedIn={(user, token) => {
				setUser(user);
				setToken(token);
				}} 
			/>
			or
			<SignupView />
			</>
		);
	}

	if (selectedMovie) {
		return (
			<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
		);
	}

	if (movies.length === 0) {
		return <div>The movie list is empty.</div>;
	} 

	return (
		<>
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
		<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
		</>
	);
};

