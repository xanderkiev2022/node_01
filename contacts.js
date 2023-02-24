const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      console.table(JSON.parse(data));
    }
    catch (error) {
      console.log(error.message);
    }
}

async function getContactById(contactId) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const searchedContact = contacts.find((contact) => contact.id === contactId);
      console.table(searchedContact || "There is no user with such ID");
    } catch (error) {
      console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      
      const contactToDel = contacts.find((contact) => contact.id === contactId);
      if (!contactToDel) {
        console.log("There is no such contact to del");
        return;
      }

      const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
      console.log("Contact removed");
      await listContacts();
    } catch (error) {
      console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const newContact = { id: nanoid(), name, email, phone };
      const updatedContacts = [...contacts, newContact];
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
      console.log("Contact added");
      await listContacts();
    } catch (error) {
      console.log(error.message);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
