import React, { useState } from 'react';
import Modal from 'react-modal';
import { uploadPhoto, deletePhoto, updatePhoto } from './readerApi'; // Adjust the import path as necessary

const EditPhotoModal = ({ isOpen, onRequestClose, currentPhoto, userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select a file.');
      return;
    }

    try {
      if (currentPhoto) {
        // If there's an existing photo, update it
        await updatePhoto(selectedFile, userId);
        setSuccessMessage("Photo updated successfully.");
      } else {
        // If there's no photo, upload a new one
        await uploadPhoto(selectedFile, userId);
        setSuccessMessage("Photo uploaded successfully.");
      }
      setSelectedFile(null); // Clear the file input
      onRequestClose(); // Close the modal
    } catch (error) {
      setErrorMessage("Error uploading or updating photo. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePhoto(userId); // Call the delete function
      setSuccessMessage("Photo deleted successfully.");
      onRequestClose(); // Close the modal after deletion
    } catch (error) {
      setErrorMessage("Error deleting photo. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={{ content: { width: '300px', margin: 'auto' } }}>
      <h2>Edit Photo</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {currentPhoto ? (
          <>
            <img src={`http://localhost:3000/uploads/profile/${currentPhoto}`} alt="Current" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
            <button type="button" onClick={handleDelete} style={{ marginBottom: '10px' }}>Delete</button>
          </>
        ) : (
          <p>No current photo. Upload a new one below.</p>
        )}
        <input type="file" onChange={handleFileChange} />
        <button type="submit" style={{ marginTop: '10px' }}>
          {currentPhoto ? "Update Photo" : "Upload Photo"}
        </button>
        <button type="button" onClick={onRequestClose} style={{ marginTop: '10px' }}>Close</button>
      </form>
    </Modal>
  );
};

export default EditPhotoModal;
