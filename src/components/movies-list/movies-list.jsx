import React from "react";
import { useSelector} from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { MovieCard } from "../movie-card/movie-card";

export const MoviesList = () => {
	const movies = useSelector((state) => state.movies.list);
	const filter = useSelector((state) =>
	state.movies.filter).trim().toLowerCase();

	const filteredMovies = movies.filter((movie) => 
		movie.title.toLowerCase().includes(filter));

	return (
		<>
			<Row className="mb-5">
				<Col xs={12}>
					<MoviesFilter />
				</Col>
			</Row>
			<Row className="justify-content-center">
				{movies.length === 0 ? (
					<Col>The list is empty</Col>
				) : (
					filteredMovies.map((movie) => (
						<Col className="mb-4" key={movie.id} sm={6} md={5} lg={3} xl={2}>
							<MovieCard movie={movie} />
						</Col>
					))
				)}
			</Row>
		</>
	);
};