import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies, onBackClick }) => {

	const { movieId } = useParams();

	//console.log("movies", movies);
	//console.log("movie", movieId);

	const movie = movies.find((m) => m.id === movieId);

	//console.log("movie", movie);

	if (!movie) {
		return <div>Movie not found</div>;
	}

	return (
		<div className="movie-cont">
			<div>
				<img className="movie-image" src={movie.imagePath} />
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.title}</span>
			</div>
			<div>
				<span>Plot: </span>
				<span>{movie.description}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.genre.Name}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movie.director.Name}</span>
			</div>
			<button className="play-button">Play Now</button>
			<Link to={`/`}>
			<button 
			className="back-button"
			style={{ cursor: "pointer" }}
			>Back</button>
			</Link>
		</div>
	);
}

MovieView.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			genre: PropTypes.shape({
				Name: PropTypes.string.isRequired,
			}).isRequired,
			director: PropTypes.shape({
				Name: PropTypes.string.isRequired,
			}).isRequired,
			imagePath: PropTypes.string.isRequired,
		})
	).isRequired,
};