const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const foundContact = contacts.find(contact => contact.id === contactId);
    return foundContact || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex === -1) {
        return null;
    }
    const [removedContact] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
