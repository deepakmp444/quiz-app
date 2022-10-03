import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { db } from "../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { CreatePlayQuizContextApi } from "../../context/CreateQuizContext";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../util/LocalData";
import { checkDataFromLocalStorage } from "../../util/RandomUser";
function CreateQuiz() {

  const { setIdofFirestore, userName, setUserName } = useContext(
    CreatePlayQuizContextApi
  );
  
  const [clickSubmitBtn, setClickSubmitBtn] = useState(false);
  const [inputList, setInputList] = useState([
    {
      q: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    setUserName("");
  }, [setUserName]);

  // get data from Local storage
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

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        q: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
      },
    ]);
  };

  // this is, when first time page load, Where we Enter name
  const handleSubmit = (event) => {
    event.preventDefault();
    setClickSubmitBtn(true);
  };

  const insertedData = async (event) => {
    event.preventDefault();
    const validation = inputList.every(
      (item) =>
        item.q && item.optionB && item.optionC && item.optionD && item.answer
    );

    if (!validation) {
      alert("Please fill all data");
    }
    if (validation) {
      const docRef = await addDoc(collection(db, "quiz"), {
        name: userName,
        userId: userRandomId.userID,
        questions: inputList,
      });
      setIdofFirestore(docRef.id);
      AddData(docRef.id, userName);
      navigate("/link");
      // navigate("/");
    }
  };

  const AddData = (id) => {
    const userID = userRandomId.userID;
    const quizapp = userRandomId.quizapp;
    const initialValue = true;
    const QuizId = {
      id,
      time: new Date().toLocaleString(),
    };
    const quiz = [QuizId, ...userRandomId.quiz];
    const newQuizIdAdded = Object.assign({
      quizapp,
      userID,
      initialValue,
      quiz,
    });
    localStorage.setItem("UserData", JSON.stringify(newQuizIdAdded));
  };

  return (
    <Container>
      <Row>
        <Link to="/" className="text-center mt-3">
          <h3>
            <span className="badge bg-success text-center ">Home 🏠</span>
          </h3>
        </Link>
        <h1 className="text-center fontAdd mt-5">Creating... Quiz 😎</h1>
        <Col sm={4}></Col>
        <Col sm={4}>
          {clickSubmitBtn ? (
            <>
              {inputList.map((value, i) => {
                return (
                  <Row key={i}>
                    <Col xs={10}>
                      <Form>
                        <div className="mt-5 mb-3">
                          <label className="form-label">Question {i + 1}</label>
                          <input
                            className="form-control"
                            name="q"
                            placeholder="Enter Question"
                            value={value.q}
                            onChange={(e) => handleInputChange(e, i)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Option A</label>
                          <input
                            className="form-control"
                            name="optionA"
                            placeholder="Enter Option A"
                            value={value.optionA}
                            onChange={(e) => handleInputChange(e, i)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Option B</label>
                          <input
                            className="form-control"
                            name="optionB"
                            placeholder="Enter option B"
                            value={value.optionB}
                            onChange={(e) => handleInputChange(e, i)}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Option C</label>
                          <input
                            className="form-control"
                            name="optionC"
                            placeholder="Enter option C"
                            value={value.optionC}
                            onChange={(e) => handleInputChange(e, i)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Option D</label>
                          <input
                            className="form-control"
                            name="optionD"
                            placeholder="Enter option D"
                            value={value.optionD}
                            onChange={(e) => handleInputChange(e, i)}
                            required
                          />
                        </div>
                        <div>
                          <Form.Group className="mb-3">
                            <Form.Label>Select Answer</Form.Label>
                            <Form.Select
                              name="answer"
                              onChange={(e) => handleInputChange(e, i)}
                            >
                              <option value="">Select any options</option>
                              <option value="optionA">Option A</option>
                              <option value="optionB">Option B</option>
                              <option value="optionC">Option C</option>
                              <option value="optionD">Option D</option>
                            </Form.Select>
                          </Form.Group>
                        </div>

                        {/* form submit button */}

                        {inputList.length - 1 === i && (
                          <div className="d-grid gap-2 mt-4 mb-5">
                            <Button
                              type="submit"
                              variant="primary"
                              onClick={insertedData}
                            >
                              Submit
                            </Button>
                          </div>
                        )}
                      </Form>
                    </Col>
                    <Col xs={2}>
                      {inputList.length !== 1 && (
                        <div
                          className="d-grid gap-2"
                          style={{ marginTop: "225px" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            className="bi bi-x-circle-fill text-danger"
                            viewBox="0 0 16 16"
                            onClick={() => handleRemoveClick(i)}
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                          </svg>
                        </div>
                      )}
                      {inputList.length - 1 === i && (
                        <div className="d-grid gap-2 mt-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            className="bi bi-plus-circle-fill text-success"
                            viewBox="0 0 16 16"
                            onClick={handleAddClick}
                            style={
                              inputList.length === 1
                                ? { marginTop: "225px" }
                                : { marginTop: "5px" }
                            }
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                          </svg>
                        </div>
                      )}
                    </Col>
                  </Row>
                );
              })}
            </>
          ) : (
            <Form className="mt-5" onSubmit={handleSubmit}>
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
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default CreateQuiz;
