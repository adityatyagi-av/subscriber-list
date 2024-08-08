"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://subscriber-list.onrender.com/api';

const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editSubscriber, setEditSubscriber] = useState(null); // For editing a subscriber
  const [newSubscriber, setNewSubscriber] = useState({ name: '', email: '' });
  const [formErrors, setFormErrors] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-user`);
        setSubscribers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch subscribers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      try {
        const response = await axios.delete(`${API_URL}/delete-user/${id}`);
        if (response.status === 200) {
          setSubscribers(subscribers.filter(subscriber => subscriber._id !== id));
        } else {
          console.error('Failed to delete subscriber');
        }
      } catch (error) {
        console.error('Failed to delete subscriber:', error);
      }
    }
  };

  const handleEdit = (subscriber) => {
    setEditSubscriber(subscriber);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editSubscriber.name || !editSubscriber.email) {
      setFormErrors('Name and email are required');
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/edit-user/${editSubscriber._id}`, editSubscriber);

      if (response.status === 200) {
        setSubscribers(subscribers.map(subscriber =>
          subscriber._id === editSubscriber._id ? editSubscriber : subscriber
        ));
        setShowEditModal(false);
        setEditSubscriber(null);
        setFormErrors('');
      } else {
        console.error('Failed to edit subscriber');
      }
    } catch (error) {
      console.error('Failed to edit subscriber:', error);
    }
  };

  const handleAddSubscriber = async (event) => {
    event.preventDefault();

    if (!newSubscriber.name || !newSubscriber.email) {
      setFormErrors('Name and email are required');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/add-user`, newSubscriber);

      if (response.status === 201) {
        setSubscribers([...subscribers, { ...newSubscriber, _id: response.data._id }]);
        setNewSubscriber({ name: '', email: '' });
        setFormErrors('');
      } else {
        console.error('Failed to add subscriber');
      }
    } catch (error) {
      console.error('Failed to add subscriber:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Subscribers</h1>
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Remove</th>
              <th scope="col" className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <p>No subscribers found.</p>
            ) : (
              subscribers.map(subscriber => (
                <tr key={subscriber._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {subscriber.name}
                  </th>
                  <td className="px-6 py-4">{subscriber.email}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(subscriber._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleEdit(subscriber)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Form to Add New Subscriber */}
      <div style={{ marginTop: '20px' }}>
        <h2>Add New Subscriber</h2>
        <form onSubmit={handleAddSubscriber}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={newSubscriber.name}
              onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={newSubscriber.email}
              onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
              required
            />
          </div>
          {formErrors && <p style={{ color: 'red' }}>{formErrors}</p>}
          <button type="submit">Add Subscriber</button>
        </form>
      </div>

      {/* Edit Subscriber Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          zIndex: 1000
        }}>
          <h2>Edit Subscriber</h2>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label htmlFor="edit-name">Name:</label>
              <input
                id="edit-name"
                type="text"
                value={editSubscriber.name}
                onChange={(e) => setEditSubscriber({ ...editSubscriber, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="edit-email">Email:</label>
              <input
                id="edit-email"
                type="email"
                value={editSubscriber.email}
                onChange={(e) => setEditSubscriber({ ...editSubscriber, email: e.target.value })}
                required
              />
            </div>
            {formErrors && <p style={{ color: 'red' }}>{formErrors}</p>}
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setShowEditModal(false)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubscribersPage;
