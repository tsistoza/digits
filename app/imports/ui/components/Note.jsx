import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

const Notes = ({ notes }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{notes.createdAt.toLocaleDateString('en-US')}</p>
    <p>{notes.note}</p>
  </ListGroup.Item>
);

Notes.propTypes = {
  notes: PropTypes.shape({
    note: PropTypes.string,
    contactId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: Date,
  }).isRequired,
};

export default Notes;
