import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";
import { useSelector } from "react-redux";

export const MovieView = ({ movies, onBackClick }) => {

	const { movieId } = useParams();

	//console.log("movies", movies);
	//console.log("movie", movieId);

	const movie = useSelector((state) => state.movies);

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
				<span><strong>Title: </strong></span>
				<span>{movie.title}</span>
			</div>
			<div>
				<span><strong>Plot: </strong></span>
				<span>{movie.description}</span>
			</div>
			<div>
				<span><strong>Genre: </strong></span>
				<span>{movie.genre.Name}</span>
			</div>
			<div>
				<span><strong>Director: </strong></span>
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