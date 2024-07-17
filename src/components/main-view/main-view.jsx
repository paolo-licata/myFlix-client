import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser? storedUser : null);
	const [token, setToken] = useState(storedToken? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		if (!token) {
			return
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
			

	
		return (
			<Row className="justify-content-md-center">
				{!user ? (
			<>
			<Col sm={4} md={6} lg={8} xl={10}>
			<h3>Login</h3>
			 <LoginView onLoggedIn={(user, token) => {
				setUser(user);
				setToken(token);
				}} 
			/>
			<h3>or Register for free</h3>
			<SignupView />
			</Col>
			</>
		) : selectedMovie ? (
			<Col md={8}>
			<MovieView 
			movie={selectedMovie} 
			onBackClick={() => setSelectedMovie(null)} 
			/>
			</Col>
		) : movies.length === 0 ? (
		 <div>The movie list is empty.</div>
		) : (
		<>
			{movies.map((movie) => (
				<Col className="mb-5" key={movie.id} sm={6} md={5} lg={3} xl={2}>
				<MovieCard 
				movie={movie}
				onMovieClick={(newSelectedMovie) => {
					setSelectedMovie(newSelectedMovie)
				}}
				/>
			 	</Col>
			))}
			<Button variant="primary" onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>Logout</Button>
		</>
		)}
		</Row>		
	)
}

