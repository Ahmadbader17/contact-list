import React, { useState, useEffect } from 'react';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error(error));
  }, []);

  const handleAddContact = event => {
    event.preventDefault();
    const newContact = { name, email, phone };

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact)
    })
      .then(response => response.json())
      .then(data => setContacts([...contacts, data]))
      .catch(error => console.error(error));

    setShowForm(false);
  };

  const handleDeleteContact = id => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE'
    })
      .then(() => setContacts(contacts.filter(contact => contact.id !== id)))
      .catch(error => console.error(error));
  };

  const handleEditContact = updatedContact => {
    fetch(`https://jsonplaceholder.typicode.com/users/${updatedContact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContact)
    })
      .then(response => response.json())
      .then(data =>
        setContacts(
          contacts.map(contact =>
            contact.id === data.id ? { ...data } : contact
          )
        )
      )
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Contact List</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add Contact'}
      </button>
      {showForm && (
        <form onSubmit={handleAddContact}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={event => setPhone(event.target.value)}
              required
            />
          </label>
          <button type="submit">Add</button>
        </form>
      )}
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} ({contact.email}, {contact.phone})
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
            <button onClick={() => handleEditContact({ ...contact, name: 'Updated Name' })}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;


