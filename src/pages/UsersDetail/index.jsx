import { NavbarComponent } from "../../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { ContactForm } from "../../components/Contact-form";
import { AlbumCard } from "../../components/AlbumCard";
import { InputComponent } from "../../components/Input";

export const UsersDetail = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAlbum, setCurrentAlbum] = useState([]);
  const [titleAlbum, setTitleAlbum] = useState("");
  const { id } = useParams();
  const currentUserId = id;

  const getUserDetail = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${currentUserId}`)
      .then((response) => setCurrentUser(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getAlbumOfUserDetail = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos`)
      .then((response) => setCurrentAlbum(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserDetail();
    getAlbumOfUserDetail();
  }, [currentUserId]);

  const deleteAlbum = (albumId) => {
    setCurrentAlbum(currentAlbum.filter(({ id }) => id !== albumId));
  };

  const addNewAlbum = async () => {
    if (titleAlbum) {
      const newTitle = {
        albumId: currentUserId,
        id: Number(currentAlbum.length + 1),
        title: titleAlbum,
      };
      await axios.post(`https://jsonplaceholder.typicode.com/photos`, newTitle);
      setCurrentAlbum([newTitle, ...currentAlbum]);
    }
    setTitleAlbum("");
  };

  return (
    <div>
      <NavbarComponent />
      <div className="px-5">
        <Row className="mb-3">
          <Col xs={6}>
            <h2 className="h2 fw-bold">{currentUser?.name}</h2>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs={6}>
            <div className="d-flex flex-column gap-4">
              <Row>
                <Col xs={12}>
                  <h4 className="h4 text-info">Personal:</h4>
                </Col>
                <Col xs={12}>
                  <Row>
                    <Col xs={4} lg={3}>
                      <p className="mb-0">Id:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <p className="mb-0 fw-bold">{currentUser?.id}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4} lg={3}>
                      <p className="mb-0">Username:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <p className="mb-0 fw-bold">{currentUser?.username}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <h4 className="h4 text-info">Address:</h4>
                </Col>
                <Col xs={12}>
                  <Row>
                    <Col xs={4} lg={3}>
                      <p className="mb-0">Street:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <p className="mb-0 fw-bold">
                        {currentUser?.address.street}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4} lg={3}>
                      <p className="mb-0">Suit:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <p className="mb-0 fw-bold">
                        {currentUser?.address.suite}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4} lg={3}>
                      <p className="mb-0">City:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <p className="mb-0 fw-bold">
                        {currentUser?.address.city}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4} lg={3}>
                      <p className="mb-0">Zipcode:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <p className="mb-0 fw-bold">
                        {currentUser?.address.zipcode}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <h4 className="h4 text-info">Company:</h4>
                </Col>
                <Col xs={12}>
                  <Row>
                    <Col xs={4} lg={3}>
                      <p className="mb-0">Name:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <p className="mb-0 fw-bold">
                        {currentUser?.company.name}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4} lg={3}>
                      <p className="mb-0">CatchPhrase:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <p className="mb-0 fw-bold">
                        {currentUser?.company.catchPhrase}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4} lg={3}>
                      <p className="mb-0">Bs:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <p className="mb-0 fw-bold">{currentUser?.company.bs}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={6}>
            <ContactForm
              currentUser={currentUser}
              currentUserId={currentUserId}
            />
          </Col>
        </Row>
        <Row className="border-top pt-3 mb-3">
          <Col xs={8}>
            <h4 className="h4">Photo Albums: </h4>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={6}>
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                addNewAlbum();
              }}
            >
              <InputComponent
                placeholder={"Title of new album"}
                name="add-title"
                value={titleAlbum}
                onChange={(e) => setTitleAlbum(e.target.value)}
              />
              <Button variant="success" className="mx-3" onClick={addNewAlbum}>
                New Album
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="">
          {currentAlbum &&
            currentAlbum.length > 0 &&
            currentAlbum
              .filter(({ albumId }) => albumId.toString() === currentUserId)
              .map(({ id, title }, index) => (
                <Col md={6} className="mb-3" key={id}>
                  <AlbumCard
                    index={index}
                    albumId={id}
                    title={title}
                    deleteAlbum={deleteAlbum}
                  />
                </Col>
              ))}
        </Row>
      </div>
    </div>
  );
};
