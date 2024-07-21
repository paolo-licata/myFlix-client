import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss"


export const MovieCard = ({ movie, onFavoriteUpdate }) => {

	const user = JSON.parse(localStorage.getItem("user"));
	const token = localStorage.getItem("token");
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const isMovieFavorite = user.FavoriteMovies.includes(movie.id);
		setIsFavorite(isMovieFavorite);
	}, [user, movie.id]);

	const addFavorite = () => {
		fetch(`https://my-movie-flix-a563168476e8.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
			"method": "POST",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		})
			.then((response) => response.json())
			.then(movies => {
				localStorage.setItem("user", JSON.stringify(movies));
				setIsFavorite(true);
				onFavoriteUpdate();
				alert("Movie added to Favorites")
			})
			.catch(e => console.log(e))
	}

	const removeFavorite = () => {
		fetch(`https://my-movie-flix-a563168476e8.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
				"method": "DELETE",
				headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
				}
		})
				.then((response) => response.json())
				.then(movies => {
						localStorage.setItem("user", JSON.stringify(movies))
						setIsFavorite(false);
						onFavoriteUpdate();
						alert("Movie deleted from favorites")
				})
				.catch(e => console.log(e))
}


	return (
		<Card className="h-100">
			<Card.Img className="card-image" variant="top" src={movie.imagePath} />
			<Card.Body>
				<Card.Title style={{ color: "white" }}>{movie.title}</Card.Title>
				<Link to={`/movies/${movie.id}`}>
					<Button className="watch-button" variant="link">Watch Now</Button>
				</Link>
				{isFavorite ? (
					<Button className="remove-button" onClick={removeFavorite} variant="link">Remove</Button>
				) : (
					<Button className="add-button" onClick={addFavorite}>Add</Button>
				)}
			</Card.Body>
		</Card>
	)
}

MovieCard.propTypes = {
	movies: PropTypes.shape({
		title: PropTypes.string.isRequired,
		genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
		}),
		director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
	}),
	imagePath: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
})
}
		

