const { Command } = require("commander");
// const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contacts = await listContacts();
          console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {
        throw new Error(`there is no user with id ${id}`);
      }
      console.log(contactById);
      break;

    case "add":
          const contact = await addContact(name, email, phone);
          console.log(contact);
      break;

    case "remove":
      const contactToRemove = await removeContact(id);
      if (!contactToRemove) {
        throw new Error(`there is no user with id ${id}`);
      }
      console.table(contactToRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);