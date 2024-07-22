import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const MovieView = ({ onBackClick }) => {

	const movies = useSelector((state) => state.movies.list);
	const { movieId } = useParams();
	const movie = movies.find((m) => m.id === movieId);


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