import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contact';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addDataToContacts = (data) => {
  console.log('Adding data to contacts');
  Contacts.collection.insert(data);
};

if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating Contact data.');
    Meteor.settings.defaultContacts.forEach(data => addDataToContacts(data));
  }
}
