import { useContext } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import { CreatePlayQuizContextApi } from "../../context/CreateQuizContext";
function Quiz() {
  const { id } = useParams();
  const { urlId, setUrlId } = useContext(CreatePlayQuizContextApi);

  return (
    <>
      {" "}
      {id ? (
        <Outlet />
      ) : (
        <Container>
          <Row>
            <Col sm={4}></Col>
            <Col sm={4}>
              <h4
                className="text-center fontAdd"
                style={{ marginTop: "150px" }}
              >
                Quiz
              </h4>
              <div className="d-grid gap-2 mt-4">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter id"
                    aria-label="Enter id"
                    aria-describedby="Enter id"
                    size="lg"
                    value={urlId}
                    onChange={(e) => setUrlId(e.target.value)}
                  />
                  {urlId.trim() === "" ? (
                    <Button variant="btn btn-primary btn-lg" id="Enter id">
                      Go
                    </Button>
                  ) : (
                    <Link
                      to={`/quiz/${urlId}`}
                      className="btn btn-success btn-lg"
                      id="Enter id"
                    >
                      Go
                    </Link>
                  )}
                </InputGroup>
                <Link
                  to="/create-quiz"
                  className="btn btn-outline-success btn-lg"
                  type="button"
                >
                  Create Your Quiz
                </Link>
              </div>
            </Col>
            <Col sm={4}></Col>
          </Row>
          <Outlet />
        </Container>
      )}
    </>
  );
}

export default Quiz;
