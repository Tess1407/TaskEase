import React from 'react';
import EditRecordForm from './EditRecordForm';

const ViewRecords = ({ records, onEditRecord, onDeleteRecord }) => {
    return (
      <div>
        <h2>Moje záznamy</h2>
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              <strong>{record.title}</strong>: {record.content}
              <button onClick={() => onEditRecord(record.id)}>Edit</button>
              <button onClick={() => onDeleteRecord(record.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default ViewRecords;
