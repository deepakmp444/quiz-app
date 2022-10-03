import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import CardComponent from "../../components/CardComponent";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
function ResultByID() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allResultData, setAllResultData] = useState([]);

  useEffect(() => {
    getAllResultByID(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getAllResultByID = async (id) => {
    const q = query(
      collection(db, "result"),
      where("getIdOfCreatedQuiz", "==", id)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      alert("Not attempted yet! 😞");
      navigate(-1);
    }
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setAllResultData(list);
  };

  if (allResultData.length === 0) {
    return <h1 className="text-center mt-5 fontAdd">Loading... 🪫</h1>;
  }

  return (
    <Container fluid className="quizById">
      <Row>
        <Col sm={4}></Col>
        <Col sm={4} className="colorOfQuizByID shadow overflow-auto">
          <Link
            to="/"
            className="text-center mt-1"
            style={{ marginLeft: "160px" }}
          >
            <h3>
              <span className="badge bg-success text-center ">Home 🏠</span>
            </h3>
          </Link>
          <h1 className="text-center mt-5 sticky-top">
            <span className="badge bg-success ">Results 👏🏻</span>
          </h1>
          {allResultData.map((value, index) => {
            return <CardComponent key={index} index={index} value={value} />;
          })}
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default ResultByID;
