import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies.js";
import { MoviesList } from "../movies-list/movies-list.jsx";


export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser? storedUser : null);
	const [token, setToken] = useState(storedToken? storedToken : null);
	const movies = useSelector((state) => state.movies.list);

  const dispatch = useDispatch();

	useEffect(() => {
		if (!token) {
			return
		}

		fetch("https://my-movie-flix-a563168476e8.herokuapp.com/movies", {
			headers: { Authorization: `Bearer ${token}`}
		})
		.then((response) => response.json())
		.then((movies) => {
			const moviesFromAPI = movies.map(movie =>  {
				return {
					id: movie._id,
					title: movie.Title,
					genre: movie.Genre,
					description: movie.Description,
					imagePath: movie.ImagePath,
					director: movie.Director
				}
			});
			dispatch(setMovies(moviesFromAPI));
		});
	}, [token]);
			

	
	return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col sm={4} md={6} lg={8} xl={12}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col sm={4} md={6} lg={8} xl={10}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col sm={4} md={6} lg={8} xl={10}>
                  <ProfileView 
                  username={user.Username}
                  token={token}
                  movies={movies}
                   />
                </Col>
              )
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty.</Col>
                ) : (
                  <Col sm={4} md={6} lg={8} xl={10}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? <Navigate to="/login" replace /> : <MoviesList />}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

