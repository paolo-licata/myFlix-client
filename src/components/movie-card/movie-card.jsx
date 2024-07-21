import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss"


export const MovieCard = ({ movie, onMovieClick }) => {

	const user = JSON.parse(localStorage.getItem("user"));
	const token = localStorage.getItem("token");

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
				localStorage.setItem("user", JSON.stringify(movies))
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
						alert("Movie deleted")
				})
				.catch(e => console.log(e))
}


	return (
		<Card className="h-100">
			<Card.Img className="card-image" variant="top" src={movie.imagePath} />
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Link to={`/movies/${movie.id}`}>
					<Button className="watch-button" variant="link">Watch Now</Button>
				</Link>
				<Button className="add-button" onClick={addFavorite}>Add</Button>
				<Button className="remove-button" onClick={removeFavorite} variant="link">Remove</Button>
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
})
}
		

