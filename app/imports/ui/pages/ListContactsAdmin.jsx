import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Contacts } from '../../api/contact/Contact';
import LoadingSpinner from '../components/LoadingSpinner';
import ContactAdmin from '../components/ContactAdmin';
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListContactsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Contacts.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const contact = Contacts.collection.find({}).fetch();
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
            <h2>List Contacts (Admin)</h2>
          </Col>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <ContactAdmin contacts={contacts} />
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContactsAdmin;
