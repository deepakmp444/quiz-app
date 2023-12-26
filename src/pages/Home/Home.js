import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Quiz from "../../assets/svg/Quiz-App.svg";
import Tablet from "../../assets/svg/tablet.svg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CreatePlayQuizContextApi } from "../../context/CreateQuizContext";
import ButtonComponent from "../../components/ButtonComponent";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import ManageQuiz from "../../components/ManageQuiz";
import { getUserData } from "../../util/LocalData";
import { checkDataFromLocalStorage } from "../../util/RandomUser";

function Home() {
  const { urlId, setUrlId } = useContext(CreatePlayQuizContextApi);
  const [resultUrl, setResultUrl] = useState("");
  const [userRandomId, setUserRandomId] = useState(getUserData());

  useEffect(() => {
    if (
      Object.keys(userRandomId).length === 0 &&
      userRandomId.constructor === Object
    ) {
      const getData = checkDataFromLocalStorage();
      setUserRandomId(getData);
    } else {
      console.log("Not Empty");
    }
  }, [userRandomId]);

  const deleteHandle = async (id) => {

    await deleteDoc(doc(db, "quiz", id));
    const deleteItem = userRandomId.quiz.filter((item) => {
      return id !== item.id;
    });
    const userID = userRandomId.userID;
    const quizapp = userRandomId.quizapp;
    const initialValue = true;
    const quiz = deleteItem;
    const assignMent = Object.assign({ quizapp, userID, initialValue, quiz });
    setUserRandomId(assignMent);
    localStorage.setItem("UserData", JSON.stringify(assignMent));
  };

  return (
    <Container className="text-center mt-5">
      <img src={Quiz} alt="Dare" className="dare" />
      <div>
        <img
          src={Tablet}
          alt="React Logo"
          className=""
          height="300px"
          width="300"
        />
      </div>
      <Row>
        <Col sm={4} className="offset-sm-4">
          <div className="d-grid gap-2">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter result id"
                aria-label="Enter id"
                aria-describedby="Enter id"
                size="lg"
                value={resultUrl}
                onChange={(e) => setResultUrl(e.target.value)}
                type="search"
              />
              {resultUrl.trim() === "" ? (
                <ButtonComponent title="Result" id="result" />
              ) : (
                <Link
                  to={`result/${resultUrl.trim()}`}
                  className="btn btn-success btn-lg"
                >
                  Result
                </Link>
              )}
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter quiz id"
                aria-label="Enter id"
                aria-describedby="Enter id"
                size="lg"
                value={urlId}
                type="search"
                onChange={(e) => setUrlId(e.target.value)}
              />
              {urlId.trim() === "" ? (
                <ButtonComponent title="Go" id="go" />
              ) : (
                <Link
                  to={`quiz/${urlId.trim()}`}
                  className="btn btn-success btn-lg"
                >
                  Go
                </Link>
              )}
            </InputGroup>

            <Link
              to="create-quiz"
              className="btn btn-outline-success btn-md"
              type="button"
            >
              Create Your Quiz
            </Link>
          </div>
          {userRandomId.initialValue === true && (
            <ManageQuiz value={userRandomId.quiz} deleteHandle={deleteHandle} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
