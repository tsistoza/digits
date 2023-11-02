import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Contact = ({ contacts }) => {
  const person = contacts.map((contact, index) => (
    <Col key={index}>
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
        <Card.Footer>
          <Link to={`/edit/${contact._id}`}>Edit</Link>
        </Card.Footer>
      </Card>
    </Col>
  ));
  return person;
};

Contact.propTypes = {
  contacts: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Contact;
