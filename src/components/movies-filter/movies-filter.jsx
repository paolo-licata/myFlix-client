import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter } from "../../redux/reducers/movies";
import "../../index.scss";

export const MoviesFilter = () => {
	const filter = useSelector((state) => state.movies.filter);
	const dispatch = useDispatch();

	return (
		<div className="search-container">
			<Form.Control
			className="search-filter"
			type="text"
			placeholder="Search..."
			value={filter}
			onChange={(e) => dispatch(setFilter(e.target.value))}
			/>
		</div>
	);
};
