import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie, onMovieClick }) => {
	return (
		<Card className="h-100">
			<Card.Img variant="top" src={movie.imagePath} />
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Card.Text>{movie.genre.Name}</Card.Text>
				<Link to={`/movies/${movie.id}`}>
					<Button variant="link">Watch Now</Button>
				</Link>
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
		

