import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

const Note = ({ notes }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{notes.createdAt.toLocaleDateString('en-US')}</p>
    <p>{notes.note}</p>
  </ListGroup.Item>
);

Note.propTypes = {
  notes: PropTypes.shape({
    note: PropTypes.string,
    contactId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: Date,
  }).isRequired,
};

export default Note;
