const fs = require("fs").promises;
const pass = require("pass");

const contactsPath = path.resolve("./contacts.js");

function listContacts() {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      data.map((item) => {
        return {
          Name: item.name,
          Email: item.email,
          Phone: item.phone,
        };
      });
    } catch (error) {
      console.log(error.message);
    }
  })();
}

function getContactById(contactId) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const searchedContact = data.find((id) => {
        id.includes(contactId);
      });
      return searchedContact;
    } catch (error) {
      console.log(error.message);
    }
  })();
}

function removeContact(contactId) {
  (async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
         const updatedListOfContacts = data.find((id) => {!id.includes(contactId);});
      await fs.writeFile(contactsPath, { ...updatedListOfContacts }, "utf8");
    } catch (error) {
      console.log(error.message);
    }
  })();
}

function addContact(name, email, phone) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");

      const newContact = `{
    "id": "${Date.now()}",
    "name": "${name}",
    "email": "${email}",
    "phone": "${phone}"
  },`;
      await fs.writeFile(contactsPath, { ...data, newContact }, "utf8");
    } catch (error) {
      console.log(error.message);
    }
  })();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
