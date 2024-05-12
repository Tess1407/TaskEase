const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];
let personalRecords = [];
let listsOfRecords = [];

// new user
const createUser = (id, username, email, password) => {
    const newUser = { id, username, email, password };
    users.push(newUser);
};

// new record
const createPersonalRecord = (id, title, content, dateCreated, dateModified, category) => {
    const newPersonalRecord = { id, title, content, dateCreated, dateModified, category };
    personalRecords.push(newPersonalRecord);
};

// new list of records
const createListOfRecords = (id, title, description, records, creationDate, lastUpdated) => {
    const newList = { id, title, description, records, creationDate, lastUpdated };
    listsOfRecords.push(newList);
};

// update personal record
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

// delete personal record
const deletePersonalRecord = (id) => {
    const index = personalRecords.findIndex(record => record.id === id);
    if (index === -1) {
        return false;
    }
    personalRecords.splice(index, 1);
    return true;
};

// search personal record by date
const findPersonalRecordByDate = (date) => {
    return personalRecords.find(record => record.dateCreated === date || record.dateModified === date);
};

// find all records
const getAllPersonalRecords = () => {
    return personalRecords;
};

// find all lists of records
const getAllListsOfRecords = () => {
    return listsOfRecords;
};

// way to find personal record by date
app.get('/personal-record/:date', (req, res) => {
    const { date } = req.params;
    const record = findPersonalRecordByDate(date);
    if (!record) {
        return res.status(404).send("Osobní záznam nenalezen.");
    }
    res.send(record);
});

// way to find all records
app.get('/personal-records', (req, res) => {
    const allRecords = getAllPersonalRecords();
    res.send(allRecords);
});

// way to find all lists of records
app.get('/lists-of-records', (req, res) => {
    const allLists = getAllListsOfRecords();
    res.send(allLists);
});

// input validation while creating new user
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send("Není vyplněný všech povinných údajů.");
    }
    const id = users.length + 1;
    createUser(id, username, email, password);
    res.send("Uživatel úspěšně zaregistrován.");
});

// input validation while creating new record
app.post('/personal-record', (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content) {
        return res.status(400).send("Není vyplněný všech povinných údajů.");
    }
    const id = personalRecords.length + 1;
    const dateCreated = new Date();
    const dateModified = dateCreated;
    createPersonalRecord(id, title, content, dateCreated, dateModified, category);
    res.send("Nový osobní záznam byl úspěšně vytvořen.");
});

// Update existing record
app.put('/personal-record/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    if (!title && !content && !category) {
        return res.status(400).send("Žádná data k aktualizaci nebyla poskytnuta.");
    }
    const isUpdated = updatePersonalRecord(parseInt(id), title, content, category);
    if (!isUpdated) {
        return res.status(404).send("Osobní záznam nebyl nalezen.");
    }
    res.send("Osobní záznam byl úspěšně aktualizován.");
});

// Delete personal record
app.delete('/personal-record/:id', (req, res) => {
    const { id } = req.params;
    const isDeleted = deletePersonalRecord(parseInt(id));
    if (!isDeleted) {
        return res.status(404).send("Osobní záznam nebyl nalezen.");
    }
    res.send("Osobní záznam byl úspěšně odstraněn.");
});

// array of unsupported keys
const unsupportedKeysList = ['!', '@', '#', '$', '%'];

// handling unsupported keys and throwing error
function handleUnsupportedKeys(input) {
    const unsupportedKeys = Object.keys(input).filter(key => unsupportedKeysList.includes(key));

    if (unsupportedKeys.length > 0) {
        const errorMessage = 'Byly detekovány nepodporované klíče: ' + unsupportedKeys.join(', ');
        throw new Error(errorMessage);
    }
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Nastala neočekávaná chyba na serveru.');
});

// Start server
app.listen(port, () => {
    console.log(`Aplikace TaskEase naslouchá na adrese http://localhost:${port}`);
});
