// personalRecords.js
let personalRecords = [];

const createPersonalRecord = (id, title, content, dateCreated, dateModified, category) => {
    const newPersonalRecord = { id, title, content, dateCreated, dateModified, category };
    personalRecords.push(newPersonalRecord);
};

const updatePersonalRecord = (id, title, content, category) => {
    const recordToUpdate = personalRecords.find(record => record.id === id);
    if (!recordToUpdate) {
        return false;
    }
    recordToUpdate.title = title || recordToUpdate.title;
    recordToUpdate.content = content || recordToUpdate.content;
    recordToUpdate.category = category || recordToUpdate.category;
    recordToUpdate.dateModified = new Date();
    return true;
};

const deletePersonalRecord = (id) => {
    const index = personalRecords.findIndex(record => record.id === id);
    if (index === -1) {
        return false;
    }
    personalRecords.splice(index, 1);
    return true;
};

const findPersonalRecordByDate = (date) => {
    return personalRecords.find(record => record.dateCreated === date || record.dateModified === date);
};

const getAllPersonalRecords = () => {
    return personalRecords;
};

module.exports = {
    createPersonalRecord,
    updatePersonalRecord,
    deletePersonalRecord,
    findPersonalRecordByDate,
    getAllPersonalRecords
};
