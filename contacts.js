const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./contacts.js");

async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const listOfContacts = contacts.map(({ contact }) => {
        return {
          Name: contact.name,
          Email: contact.email,
          Phone: contact.phone,
        };
      });
      return listOfContacts;
    }
    catch (error) {
      console.log(error.message);
    }
}

async function getContactById(contactId) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const searchedContact = contacts.find((contact) => {return contact.id === contactId;});
      return searchedContact || null;
    } catch (error) {
      console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const updatedContacts = contacts.reduce((acc, contact) => {
        if (contact.id === contactId) { return acc;}
        return acc.concat(contact);}, []);
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    } catch (error) {
      console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const newContact = { id: Date.now(), name, email, phone };
      const updatedContacts = [...contacts, newContact];
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    } catch (error) {
      console.log(error.message);
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
