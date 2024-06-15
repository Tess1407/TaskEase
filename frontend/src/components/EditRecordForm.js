import React, { useState } from 'react';

const EditRecordForm = ({ record, onSaveEdit, onCancelEdit }) => {
  const [editedTitle, setEditedTitle] = useState(record.title);
  const [editedContent, setEditedContent] = useState(record.content);

  const handleSave = () => {
    onSaveEdit(record.id, editedTitle, editedContent);
  };

  return (
    <div>
      <h2>Edit Record</h2>
      <label>Title:</label>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <label>Content:</label>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancelEdit}>Cancel</button>
    </div>
  );
};

export default EditRecordForm;
