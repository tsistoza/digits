import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Note from './Note';
import AddNote from '../pages/AddNote';

const Contact = ({ contacts, notes }) => (
  <Col>
    <Card className="h-100">
      <Image src={contacts.image} width={75} />
      <Card.Title>
        <p>{contacts.firstName} {contacts.lastName}</p>
        <Card.Subtitle>
          <p>{contacts.address}</p>
        </Card.Subtitle>
      </Card.Title>
      <Card.Body>
        <Card.Text>
          {contacts.description}
        </Card.Text>
      </Card.Body>
      <ListGroup>
        {notes.map((note) => <Note key={note._id} notes={note} />)}
      </ListGroup>
      <AddNote owner={contacts.owner} contactId={contacts._id} />
      <Card.Footer><Link to={`/edit/${contacts._id}`}>edit</Link></Card.Footer>
    </Card>
  </Col>
);

Contact.propTypes = {
  contacts: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};

export default Contact;
