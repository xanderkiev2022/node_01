const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./contacts.js");

async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = data.map((item) => {
        return {
          Name: item.name,
          Email: item.email,
          Phone: item.phone,
        };
      });
      return contacts;
    } catch (error) {
      console.log(error.message);
    }
}

async function getContactById(contactId) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const searchedContact = data.find((id) => {
        id.includes(contactId);
      });
      return searchedContact;
    } catch (error) {
      console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const updatedListOfContacts = contacts.find((contact) => {
        return !contact.id.includes(contactId);
      });
      await fs.writeFile(contactsPath, { ...updatedListOfContacts }, "utf8");
    } catch (error) {
      console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const newContact = {
    id: Date.now(),
    name,
    email,
    phone
      };
      data.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
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
