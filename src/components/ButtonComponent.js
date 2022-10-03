import { Button } from "react-bootstrap";

function ButtonComponent({ title, id }) {
  return (
    <Button variant="btn btn-primary btn-lg" id={id}  onClick={() => alert("Please enter id")}>
      {title}
    </Button>
  );
}

export default ButtonComponent;
