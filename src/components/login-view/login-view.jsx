import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";


export const LoginView = ({ onLoggedIn }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password
		};

		fetch("https://my-movie-flix-a563168476e8.herokuapp.com/login", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			},
		})
		.then((response) => response.json())
		.then((data) => {
			console.log("Login response: ", data);
			if (data.user) {
				localStorage.setItem("user", JSON.stringify(data.user));
				localStorage.setItem("token", data.token);
				onLoggedIn(data.user, data.token);
			} else {
				alert("No such user found")
			}
		})
		.catch((e) => {
			console.error("Error:", e.message);
			alert("Something went wrong")
		});
		};


  return (
    <Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
        <Form.Control 
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
				placeholder="Enter your username" />
			</Form.Group>

			<Form.Group>
      <Form.Label>Password:</Form.Label>
        <Form.Control 
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				placeholder="Enter your password" />
			</Form.Group>
			<Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
}
