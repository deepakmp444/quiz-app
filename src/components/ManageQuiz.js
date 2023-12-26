import { Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { weburl } from "../util/Url";
import { RWebShare } from "react-web-share";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModelComponent from "./ModelComponent";

function ManageQuiz({ value, deleteHandle }) {
  const [modalShow, setModalShow] = useState(false);
  const notify = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied 👍", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      {value?.map((v) => {
        return (
          <Alert variant="secondary" className="mt-5" key={v.id}>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <Link to={`/result/${v.id}`} className="btn btn-success btn-sm">Who attempted</Link>
                </div>
                <div className="col-6"> <button type="button" className="btn btn-light btn-sm">{v.time}</button></div>
              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <div
                    onClick={() => setModalShow(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-archive-fill text-danger"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                    </svg>
                  </div>
                </div>
                <div className="col-4">
                  <div onClick={() => notify(v.id)} style={{ cursor: "pointer" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-clipboard-check-fill text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                    </svg>
                  </div>
                </div>
                <div className="col-4">
                  <div style={{ cursor: "pointer" }}>
                    <RWebShare
                      data={{
                        text: "",
                        url: `${weburl}/quiz/${v.id}`,
                        title: "Quiz-App",
                      }}
                    // onClick={() => console.log("shared successfully!", url)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-share-fill text-success"
                        viewBox="0 0 16 16"
                        style={{ marginLeft: "10px" }}
                      >
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                      </svg>
                    </RWebShare>
                  </div>
                </div>
              </div>
            </div>
            <ModelComponent show={modalShow}
              onHide={() => setModalShow(false)} delete={() => deleteHandle(v.id)} />
          </Alert>
        );
      })}
      <ToastContainer />
    </div>
  );
}

export default ManageQuiz;
