import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
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
			<button 
			onClick={onBackClick}
			className="back-button"
			style={{ cursor: "pointer" }}
			>Back</button>
		</div>
	)
}