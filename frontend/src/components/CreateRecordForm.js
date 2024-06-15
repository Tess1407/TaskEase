import React, { useState } from 'react';

const CreateRecordForm = ({ onSaveRecord, onDeleteRecord }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    // uložení záznamu
    onSaveRecord(title, content);
  };

  const handleDelete = () => {
    // mazání záznamu
    onDeleteRecord();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Název záznamu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Obsah záznamu"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Uložit</button>
      <button onClick={handleDelete}>Smazat</button>
    </div>
  );
};

export default CreateRecordForm;
