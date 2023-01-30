import { Row, Col, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../../api/axios";

export const ContactForm = ({ currentUser, currentUserId }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [emailInputValue, setEmailInputValue] = useState(currentUser?.email);
  const [phoneInputValue, setPhoneInputValue] = useState(currentUser?.phone);
  const [websiteInputValue, setWebsiteInputValue] = useState(
    currentUser?.website
  );

  const [usersList, setUsersList] = useState(null);

  useEffect(() => {
    getUsers().then((json) => setUsersList(json));
  }, [currentUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    currentUser.email = emailInputValue ? emailInputValue : currentUser.email;
    currentUser.phone = phoneInputValue ? phoneInputValue : currentUser.phone;
    currentUser.website = websiteInputValue
      ? websiteInputValue
      : currentUser.website;
    await axios.put(
      `https://jsonplaceholder.typicode.com/users/${currentUserId}`
    );
    const usersClone = [...usersList];
    const index = usersClone.indexOf(currentUser);
    usersClone[index] = { ...currentUser };
    setUsersList(usersClone);
    setIsEditting(false);
  };

  return (
    <>
      <Row>
        <Col xs={6}>
          <div className="d-flex items-center justify-content-between">
            <h4 className="h4 text-info">Contact:</h4>
          </div>
        </Col>
        <Col xs={12} className="mb-2">
          {!isEditting ? (
            <>
              <Row>
                <Col xs={4} lg={3}>
                  <p className="mb-0">Email:</p>
                </Col>
                <Col xs={8} lg={9}>
                  <p className="mb-0 fw-bold">{currentUser?.email}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={4} lg={3}>
                  <p className="mb-0">Website:</p>
                </Col>
                <Col xs={8} lg={9}>
                  <p className="mb-0 fw-bold">{currentUser?.website}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={4} lg={3}>
                  <p className="mb-0">Phone:</p>
                </Col>
                <Col xs={8} lg={9}>
                  <p className="mb-0 fw-bold">{currentUser?.phone}</p>
                </Col>
              </Row>
            </>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col xs={12}>
                  <Row>
                    <Col xs={12}>
                      <p className="mb-0">Email:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <input
                        type="email"
                        className="form-control my-2"
                        value={
                          emailInputValue ? emailInputValue : currentUser?.email
                        }
                        onChange={(e) => setEmailInputValue(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <p className="mb-0">Phone:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <input
                        type="email"
                        className="form-control my-2"
                        value={
                          phoneInputValue ? phoneInputValue : currentUser?.phone
                        }
                        onChange={(e) => setPhoneInputValue(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <p className="mb-0">Website:</p>
                    </Col>
                    <Col xs={8} lg={9}>
                      <input
                        type="email"
                        className="form-control my-2"
                        value={
                          websiteInputValue
                            ? websiteInputValue
                            : currentUser?.website
                        }
                        onChange={(e) => setWebsiteInputValue(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <div className="d-flex items-center gap-3">
                    <Button
                      type="submit"
                      variant="success"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                    <Button type="button" variant="danger">
                      Reset
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
        <Col xs={12}>
          {!isEditting && (
            <Button variant="success" onClick={() => setIsEditting(true)}>
              Edit
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};
