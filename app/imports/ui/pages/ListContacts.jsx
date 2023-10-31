import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Contacts } from '../../api/contact/Contact';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListContacts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    const contact = Contacts.collection.find({}).fetch();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    return {
      contacts: contact,
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
        <Contact contacts={contacts} />
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContacts;
