import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="navbar navbar navbar-expand-md navbar-light fixed-top" bg="primary" expand="md">
      <Container>
        <Navbar.Brand className="brand" as={Link} to="/">
          <strong>Movie Flicks</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {!user && (
							<>
								<Nav.Link className="nav-element" as={Link} to="/login">
									Login
								</Nav.Link>

								<Nav.Link className="nav-element" as={Link} to="/signup">
									Signup
								</Nav.Link>
							</>
						)}
						{user && (
							<>
								<Nav.Link className="nav-element" as={Link} to="/">
									Home
								</Nav.Link>
								<Nav.Link className="nav-element" as={Link} to="/profile">
									Your Profile
								</Nav.Link>
								<Nav.Link className="nav-element" onClick={onLoggedOut}>Logout</Nav.Link>
							</>
						)}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};