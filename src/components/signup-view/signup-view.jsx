import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SignupView = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");


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
			<Form.Group>
			<Form.Label style={{ color: "white" }}>Username:</Form.Label>
				<Form.Control 
				type="text" 
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
				minLength="3"
				placeholder="Enter your username"
				style={{ color: "white" }}
				/>
			</Form.Group>

			<Form.Group>
			<Form.Label style={{ color: "white" }}>Password:</Form.Label>
				<Form.Control 
				type="password" 
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				placeholder="Enter your password"
				style={{ color: "white" }}
				/>
			</Form.Group>

			<Form.Group>
			<Form.Label style={{ color: "white" }}>Email: </Form.Label>
				<Form.Control 
				type="email" 
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				placeholder="Enter a valid email"
				style={{ color: "white" }}
				/>
			</Form.Group>

			<Form.Group>
			<Form.Label style={{ color: "white" }}>Birthday: </Form.Label>
				<Form.Control 
				type="date" 
				value={birthday}
				onChange={(e) => setBirthday(e.target.value)}
				style={{ color: "white" }}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">Sign Up</Button>
		</Form>
	);
};