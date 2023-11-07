const fs = require('fs/promises');
const { Command } = require('commander');
const { listContacts, getContactById, addContact, removeContact } = require('./contacts');

const program = new Command();

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            listContacts().then(contacts => {
                if (contacts.length > 0) {
                    console.table(contacts);
                } else {
                    console.log('No contacts found.');
                }
            });
            break;

        case 'get':
            getContactById(id).then(contact => {
                if (contact) {
                    console.log(contact);
                } else {
                    console.log('Contact not found.');
                }
            });
            break;

        case 'add':
            addContact(name, email, phone).then(newContact => console.log('Added:', newContact));
            break;

        case 'remove':
            removeContact(id).then(removedContact => {
                if (removedContact) {
                    console.log('Removed:', removedContact);
                } else {
                    console.log('Contact not found or not removed.');
                }
            });
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
