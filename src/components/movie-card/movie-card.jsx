import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
	return (
	<div
	onClick={() => {
		onMovieClick(movie);
	}}
	>
		{movie.title}
		</div>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		Description: PropTypes.string. isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string,
		}),
		ImagePath: PropTypes.string.isRequired
	}).isRequired,
	onClick: PropTypes.func.isRequired
};

