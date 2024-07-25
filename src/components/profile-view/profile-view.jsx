import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ProfileView = ({ movies }) => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [username, setUsername] = useState(localUser.Username || "");
    const [password, setPassword] = useState(localUser.Password || "");
    const [email, setEmail] = useState(localUser.Email || "");
    const [birthday, setBirthday] = useState(localUser.Birthday || "");
    const [errorMessage, setErrorMessage] = useState("");
    const [userUpdated, setUserUpdated] = useState(false);

    const fav = movies.filter((movie) => {
        return localUser.FavoriteMovies.includes(movie.id);
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            ...(password && { Password: password }),
            Email: email,
            Birthday: birthday
        };

        fetch(`https://my-movie-flix-a563168476e8.herokuapp.com/users/${localUser.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Profile updated");
                localStorage.setItem("user", JSON.stringify({...localUser, ...data }))
                window.location.reload();
            } else {
                return response.json().then(err => {
                    throw new Error(err.message);
                });
            }
        }).catch((error) => {
            setErrorMessage(error.message || "Profile update failed")
        })
    };

    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete your account? This action is not reversible")) {
            return;
        }

        fetch(`https://my-movie-flix-a563168476e8.herokuapp.com/users/${localUser.Username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Account deleted successfully");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/signup");
            } else {
                return response.json().then(err => {
                    throw new Error(err.message);
                })
            }
        }).catch((error) => {
            setErrorMessage(error.message || "Account deletion failed")
        });
    };

    const handleFavoriteUpdate = () => {
        setUser(JSON.parse(localStorage.getItem("user")));
        setUserUpdated(!userUpdated);
    }

    return (
        <Form>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <Form.Group controlId="formUsername">
                <Form.Label>
                    Username:
                </Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='4'
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>
                    Password:
                </Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>
                    Email:
                </Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formBdate">
                <Form.Label>
                    Birthday:
                </Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <Button className="update-btn" variant="primary" type="submit">Update Profile</Button>
            <Button className="delete-btn" variant="secondary" onClick={handleDelete}>Delete Account</Button>

            <h3>Favorite Movies:</h3>
            <Row className="justify-content-md-center">
            {
                localUser && fav.map((movie) => (
                    <Col key={movie.id} sm={10} md={8} lg={5} xl={3}>
                    <MovieCard movie={movie} onFavoriteUpdate={handleFavoriteUpdate}>

						<Card className="h-100">
                         <Card.Img variant="top" src={movie.ImagePath}/>
                         <Card.Body>
                         <Card.Title>{movie.title}</Card.Title>
                         <Card.Text>{movie.genre.Name}</Card.Text>
                         <Link to = {`/movies/${movie.id}`}>
                           Open
                         </Link>
                         </Card.Body>
                        </Card>

                    </MovieCard>
                    </Col>		 
            ))}
            </Row>
        </Form>
    );
};