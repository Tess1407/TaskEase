import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CreateRecordForm from './components/CreateRecordForm';
import ViewRecords from './components/ViewRecords';
import EditRecordForm from './components/EditRecordForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // zobrazení formuláře pro nový záznam
  const [records, setRecords] = useState([]); // uchování seznamu záznamů
  const [editingRecord, setEditingRecord] = useState(null); // uchování záznamu k úpravě

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };
  const handleEditRecord = (recordId) => {
    const recordToEdit = records.find((record) => record.id === recordId);
    setEditingRecord(recordToEdit);
  };
  const handleSaveEdit = (recordId, title, content) => {
    //  uložení úprav záznamu
    console.log(`Uložení úprav záznamu s ID ${recordId}: ${title} - ${content}`);
    // Aktualizace seznamu záznamů
    const updatedRecords = records.map((record) =>
      record.id === recordId ? { ...record, title, content } : record
    );
    setRecords(updatedRecords);
    setEditingRecord(null); // Skrytí formuláře po uložení úprav
  };

  const handleCancelEdit = () => {
    setEditingRecord(null); // Skrytí formuláře po stisknutí tlačítka Cancel
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleCreateRecord = (title, content) => {
    // volání backendu pro vytvoření záznamu
    console.log(`Nový záznam: ${title} - ${content}`);
  };

  const handleDeleteRecord = (recordId) => {
    // volání backendu pro smazání záznamu
    const updatedRecords = records.filter((record) => record.id !== recordId);
    setRecords(updatedRecords);
    console.log(`Smazán záznam s ID: ${recordId}`);

  };

  
  // uložení nového záznamu
  const handleSaveRecord = (title, content) => {
    
    const newRecord = { id: records.length + 1, title, content };
    setRecords([...records, newRecord]);
    console.log(`Uložení nového záznamu: ${title} - ${content}`);
    setShowCreateForm(false); // Skrytí formuláře po uložení záznamu
  };

  return (
    <div>
      {user ? (
        <>
          <Dashboard
            username={user.username}
            onCreateNewRecord={() => setShowCreateForm(true)} // Aktivuje formulář pro vytvoření nového záznamu
            onViewRecords={() => console.log('View records')}
          />
          {showCreateForm && (
            <CreateRecordForm
            onSaveRecord={(title, content) => handleSaveRecord(title, content)}
            onCancel={() => setShowCreateForm(false)} // skrytí formuláře po kliknutí na Cancel
            />
          )}
           {editingRecord ? (
            <EditRecordForm
              record={editingRecord}
              onSaveEdit={(id, title, content) => handleSaveEdit(id, title, content)}
              onCancelEdit={handleCancelEdit}
            />
          ) : (
            <ViewRecords
              records={records}
              onEditRecord={handleEditRecord}
              onDeleteRecord={handleDeleteRecord}
            />
          )}
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
