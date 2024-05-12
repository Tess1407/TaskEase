// listOfRecords.js
let listsOfRecords = [];

const createListOfRecords = (id, title, description, records, creationDate, lastUpdated) => {
    const newList = { id, title, description, records, creationDate, lastUpdated };
    listsOfRecords.push(newList);
};

const getAllListsOfRecords = () => {
    return listsOfRecords;
};

module.exports = { createListOfRecords, getAllListsOfRecords };
