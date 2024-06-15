import React from 'react';

const Dashboard = ({ username, onCreateNewRecord, onViewRecords }) => {
  return (
    <div>
      <h2>Vítejte, {username}!</h2>
      <button onClick={onCreateNewRecord}>Vytvořit nový záznam</button>
      <button onClick={onViewRecords}>Mé záznamy</button>
    </div>
  );
};

export default Dashboard;
