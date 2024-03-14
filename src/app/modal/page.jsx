"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateModal = ({ id }) => {
 const [details, setDetails] = useState({ heading: '', note: '' });
 const [updatedDetails, setUpdatedDetails] = useState({ heading: '', note: '' });

 useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/notes/${id}`);
        setDetails(response.data);
        setUpdatedDetails(response.data); // Initialize updatedDetails with fetched details
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
 }, [id]); // Depend on id to refetch if it changes

 const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails(prevDetails => ({ ...prevDetails, [name]: value }));
 };

 const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/notes/${id}`, updatedDetails);
      console.log('Update successful:', response.data);
      // Assuming you have a function to update the notes list
      updateNotes(response.data);
    } catch (error) {
      console.error('Error updating details:', error);
    }
 };

 return (
    <div>
      <h2>Update Note</h2>
      <input
        type="text"
        name="heading"
        value={updatedDetails.heading}
        onChange={handleChange}
        placeholder="Heading"
      />
      <textarea
        name="note"
        value={updatedDetails.note}
        onChange={handleChange}
        placeholder="Note"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
 );
};

export default UpdateModal;