import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CreatePlayQuizContextApi } from "../../context/CreateQuizContext";
import { quizContextApi } from "../../context/LinkQuizContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

function QuizById() {
  const { id } = useParams();
  const { userName, setUserName } = useContext(CreatePlayQuizContextApi);
  const { getQuiz } = useContext(quizContextApi);
  const navigate = useNavigate();
  const { score, setScore } = useContext(quizContextApi);
  const [currenQuestion, setCurrentQuestion] = useState(0);
  const [clickNextBtn, setClickNextBtn] = useState(false);
  const [Questions, setQuestions] = useState([]);
  const [getIdOfCreatedQuiz, setGetIdOfCreatedQuiz] = useState("");
  const [getNameOfCreatedQuiz, setGetNameOfCreatedQuiz] = useState("");
  const [lastSubmitQuestion, setLastSubmitQuestion] = useState(false);

  useEffect(() => {
    getAllQuizById(id);
    setUserName("");
    setScore(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserName, setScore]);

  const getAllQuizById = async (id) => {
    const querySnapshot = await getQuiz(id);
    if (querySnapshot.exists()) {
      setQuestions(querySnapshot.data().questions);
      setGetNameOfCreatedQuiz(querySnapshot.data().name);
      setGetIdOfCreatedQuiz(querySnapshot.id);
    } else {
      alert("Quiz not created yet! 😞");
      navigate("/");
    }
  };

  const chooseOption = async (option) => {
    if (Questions[currenQuestion].answer === option) {
      setScore((pre) => pre + 1);
    }
    if (Questions.length - 1 === currenQuestion) {
      setLastSubmitQuestion(true);
    } else {
      setCurrentQuestion((pre) => pre + 1);
    }
  };

  const insertedData = async () => {
    await addDoc(collection(db, "result"), {
      name: userName,
      getNameOfCreatedQuiz,
      getIdOfCreatedQuiz: getIdOfCreatedQuiz,
      score: score,
      length: Questions.length,
    });
    setScore("");
  };

  // this is, when first time page load, Where we Enter name
  const handleSubmit = (event) => {
    event.preventDefault();
    setClickNextBtn(true);
  };

  const GoForResultClick = () => {
    insertedData();
    navigate(`/result/${getIdOfCreatedQuiz}`);
    setLastSubmitQuestion(false);
  };

  if (Questions.length === 0) {
    return <h1 className="mt-5 fontAdd text-center">Loading... 🪫</h1>;
  }
  return (
    <Container className="quizById" fluid>
      <Row>
        <Col sm={4}></Col>
        <Col sm={4} className="colorOfQuizByID shadow p-4">
          {clickNextBtn ? (
            <>
              <Link
                to="/"
                className="text-center mt-1"
                style={{ marginLeft: "160px" }}
              >
                <h3>
                  <span className="badge bg-success text-center ">Home 🏠</span>
                </h3>
              </Link>
              {!lastSubmitQuestion && <h1 className="fontAdd text-center">
                Score {score + "/" + Questions.length}
              </h1>}
              
              {!lastSubmitQuestion && (
                <>
                  <h4 className="fontAdd" style={{ marginTop: "100px" }}>
                    {Questions[currenQuestion].q}
                  </h4>
                  <div className="d-grid gap-2 mt-2">
                    <div
                      className="btn btn-outline-success btn-lg mt-2"
                      onClick={() => chooseOption("optionA")}
                    >
                      {Questions[currenQuestion].optionA}
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-2">
                    <div
                      className="btn btn-outline-success btn-lg mt-2"
                      onClick={() => chooseOption("optionB")}
                    >
                      {Questions[currenQuestion].optionB}
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-2">
                    <div
                      className="btn btn-outline-success btn-lg mt-2"
                      onClick={() => chooseOption("optionC")}
                    >
                      {Questions[currenQuestion].optionC}
                    </div>
                  </div>
                  <div className="d-grid gap-2 mt-2">
                    <div
                      className="btn btn-outline-success btn-lg"
                      onClick={() => chooseOption("optionD")}
                    >
                      {Questions[currenQuestion].optionD}
                    </div>
                  </div>
                </>
              )}
              {lastSubmitQuestion && (
                <div className="d-grid gap-2" style={{marginTop:"150px"}}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={GoForResultClick}
                  >
                    Get for result
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Form
              className=""
              onSubmit={handleSubmit}
              style={{ marginTop: "200px" }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={userName.trim().toString() === "" ? true : false}
                >
                  Next
                </Button>
              </div>
            </Form>
          )}
          <p className="fontAdd text-center mt-5">
            This is by <u>{getNameOfCreatedQuiz}</u>
          </p>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default QuizById;
