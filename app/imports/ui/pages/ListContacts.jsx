import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Contacts } from '../../api/contact/Contact';
import { Notes } from '../../api/note/Notes';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListContacts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts, notes } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    const subscription2 = Meteor.subscribe(Notes.userPublicationName);
    const contact = Contacts.collection.find({}).fetch();
    const note = Notes.collection.find({}).fetch();
    // Determine if the subscription is ready
    let rdy = subscription.ready();
    rdy = rdy === true ? subscription2.ready() : subscription.ready();
    // Get the Stuff documents
    return {
      contacts: contact,
      notes: note,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Contacts</h2>
          </Col>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {contacts.map((contact, index) => (
          <Contact
            key={index}
            contact={contact}
            notes={notes.filter(note => note.contactId === contact._id)}
          />
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContacts;
