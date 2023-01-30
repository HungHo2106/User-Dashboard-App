import { Navbar, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const NavbarComponent = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link px-0 pe-4"
                      activeclassname="active fw-bold"
                      to="/users"
                    >
                      Users
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link px-0 pe-4"
                      activeclassname="active fw-bold"
                      to="/photos"
                    >
                      Photos
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};
