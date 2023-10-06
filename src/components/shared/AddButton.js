import React from 'react';
import './addButton.css'

const AddButton = ({ onClick }) => {
  return (
    <button className="add-button" onClick={onClick}>
      +
    </button>
  );
};

export default AddButton;
