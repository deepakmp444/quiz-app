import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { CreatePlayQuizContextApi } from "../../context/CreateQuizContext";
import { weburl } from "../../util/Url";
import { RWebShare } from "react-web-share";
function QuizLink() {
  const navigate = useNavigate();
  const { userName, idOfFirestore } = useContext(CreatePlayQuizContextApi);
  const url = `${weburl}/quiz/${idOfFirestore}`;

  useEffect(() => {
    if (userName === "") {
      navigate("/");
    }
  }, [navigate, userName]);

  if (idOfFirestore === "") {
    return <h1 className="text-center mt-5">Loading...🪫</h1>;
  }
  return (
    <Container>
      <Row style={{ marginTop: "150px" }} className="text-center">
        <Col sm={4}></Col>
        <Col sm={4}>
          <Card className="p-5 shadow">
            <h1 className="fontAdd text-success ">Quiz Created</h1>
            <h3 className="fontAdd text-secondary  mt-3">
              {" "}
              <b>{userName}</b>{" "}
            </h3>

            <div className="d-flex justify-content-around mt-4 text-primary ">
              <Link to={`/result/${idOfFirestore}`} className="btn btn-success">
                Result
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check-all"
                  viewBox="0 0 16 16"
                  style={{ marginLeft: "10px" }}
                >
                  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                </svg>
              </Link>
              <RWebShare
                data={{
                  text: userName,
                  url: url,
                  title: "Quiz-App",
                }}
              >
                <Button variant="primary" className="">
                  Share
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-share-fill"
                    viewBox="0 0 16 16"
                    style={{ marginLeft: "10px" }}
                  >
                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                  </svg>
                </Button>
              </RWebShare>
            </div>
          </Card>
          <Link to="/" className="fontAdd">
            Home
          </Link>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default QuizLink;
