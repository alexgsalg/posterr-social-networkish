import { ReactElement } from 'react';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import style from './user.style.scss';

function UserPage(): ReactElement {
  const navigate = useNavigate();
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
      <Modal show={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPage;
