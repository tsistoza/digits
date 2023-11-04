import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, SubmitField, TextField, ErrorsField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Notes } from '../../api/note/Notes';
// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  note: String,
  contactId: String,
  owner: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddNote = ({ contactId, owner }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { note, createdAt } = data;
    Notes.collection.insert(
      { note, contactId, createdAt, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Contact</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="note" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" value={owner} />
                <HiddenField name="contactId" value={contactId} />
                <HiddenField name="createdAt" value={new Date()} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddNote.propTypes = {
  contactId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default AddNote;
