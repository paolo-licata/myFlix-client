import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const fav = movies.filter((movie) => {
        return localUser.FavoriteMovies.includes(movie.id);
    });

    const [username, setUsername] = useState(localUser.Username || "");
    const [password, setPassword] = useState(localUser.Password || "");
    const [email, setEmail] = useState(localUser.Email || "");
    const [birthday, setBirthday] = useState(localUser.Birthday || "");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://my-movie-flix-a563168476e8.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit">Edit Profile</Button>
            {
                localUser && fav.map((movie) => (
                    <MovieCard movie={movie}>

											<Card>
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
										
                     
											 
                ))}
        </Form>
    );
};
