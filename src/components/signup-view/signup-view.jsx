import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

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
		<Container>
			<Row className="justify-content-center">
				<Col sm={8} md={8} lg={6} xl={6}>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
						<Form.Label>Username:</Form.Label>
							<Form.Control 
							type="text" 
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							minLength="3"
							placeholder="Enter your username"
							/>
						</Form.Group>

						<Form.Group>
						<Form.Label>Password:</Form.Label>
							<Form.Control 
							type="password" 
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Enter your password"
							/>
						</Form.Group>

						<Form.Group>
						<Form.Label>Email: </Form.Label>
							<Form.Control 
							type="email" 
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="Enter a valid email"
							/>
						</Form.Group>

						<Form.Group>
						<Form.Label>Birthday: </Form.Label>
							<Form.Control 
							type="date" 
							value={birthday}
							onChange={(e) => setBirthday(e.target.value)}
							/>
						</Form.Group>
						<Button className="signup-btn" variant="primary" type="submit">Sign Up</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};