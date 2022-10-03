import React from "react";

function CardComponent({ index, value }) {
  return (
    <div className="card shadow-sm mt-5 mb-5">
      <div className="card-body">
        <div className="d-flex justify-content-between mt-3">
          <div>
            <p className="fontAdd">
              {" "}
              <b style={{ marginRight: "40px" }}>{index + 1}</b> {value.name}
            </p>
          </div>
          <div>
            <p className="fontAdd">
              {value.score}/{value.length}👏🏻
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
