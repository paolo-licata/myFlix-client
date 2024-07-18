import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


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
						alert("Movie deleted")
				})
				.catch(e => console.log(e))
}


	return (
		<Card className="h-100">
			<Card.Img variant="top" src={movie.imagePath} />
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Card.Text>{movie.genre.Name}</Card.Text>
				<Link to={`/movies/${movie.id}`}>
					<Button variant="link">Watch Now</Button>
				</Link>
				<Button onClick={addFavorite}>Add</Button>
				<Button onClick={removeFavorite}>Remove</Button>
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
		

