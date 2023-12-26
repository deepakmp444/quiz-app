import { Button, Modal } from 'react-bootstrap'

function ModelComponent(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>You will not be able to recover this quiz!</h6>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='light' onClick={props.onHide}>Close</Button>
                <Button variant="danger" onClick={props.delete}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModelComponent