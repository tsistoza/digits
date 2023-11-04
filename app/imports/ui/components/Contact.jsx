import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Note from './Note';
import AddNote from '../pages/AddNote';

const contacts = ({ contact, notes }) => (
  <Col>
    <Card className="h-100">
      <Image src={contact.image} width={75} />
      <Card.Title>
        <p>{contact.firstName} {contact.lastName}</p>
        <Card.Subtitle>
          <p>{contact.address}</p>
        </Card.Subtitle>
      </Card.Title>
      <Card.Body>
        <Card.Text>
          {contact.description}
        </Card.Text>
      </Card.Body>
      <ListGroup>
        {notes.map((note) => <Note key={note._id} notes={note} />)}
      </ListGroup>
      <AddNote owner={contact.owner} contactId={contact._id} />
      <Card.Footer><Link to={`/edit/${contact._id}`}>edit</Link></Card.Footer>
    </Card>
  </Col>
);

contacts.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.object)).isRequired,
};

export default contacts;
