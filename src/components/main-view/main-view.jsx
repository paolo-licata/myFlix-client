import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
	const [movies, setMovies] = useState([
		{
			id: 1,
			title: "The Enchanted Forest",
			description: "A young girl stumbles upon a magical forest and embarks on an adventure to save its mystical creatures from an evil sorcerer.",
			image: "https://m.media-amazon.com/images/I/51T0HSJTqpL._AC_UF200,300_QL80_.jpg",
			genre: "Fantasy",
			director: "Alice Green"
		},
		{
			id: 2,
			title: "Space Odyssey",
			description: "In the year 2200, a group of astronauts set out on a journey to explore a distant galaxy, only to encounter unforeseen dangers.",
			image: "https://m.media-amazon.com/images/I/91EJkB7F07L._AC_UF200,300_QL80_.jpg",
			genre: "Science Fiction",
			director: "John Smith"
		},
		{
			id: 3,
			title: "Inception",
			description: "A skilled thief, who steals corporate secrets through the use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
			image: "https://m.media-amazon.com/images/I/71lbkL3zKvL._AC_UF200,300_QL80_.jpg",
			genre: "Science Fiction",
			director: "Christopher Nolan"
		},
		{
			id: 4,
			title: "Gladiator",
			description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
			image: "https://m.media-amazon.com/images/I/71RJmuDZdaL._AC_UF200,300_QL80_.jpg",
			genre: "Action",
			director: "Ridley Scott"
		}
	]);

	const [selectedMovie, setSelectedMovie] = useState(null);

	if (selectedMovie) {
		return (
			<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
		);
	}

	if (movies.length === 0) {
		return <div>The movie list is empty.</div>;
	} 

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard 
				key={movie.id} 
				movie={movie}
				onMovieClick={(newSelectedMovie) => {
					setSelectedMovie(newSelectedMovie);
				}}
				/>
			))}
		</div>
	);
};

