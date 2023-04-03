const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const users = [
  { id: 1, name: 'Neha json', email: 'neha.json@example.com' },
  { id: 2, name: 'demn kid', email: 'ajithrao@example.com' },
  { id: 3, name: 'shreya jo', email: 'jo.shreya@example.com' },
];

// GET 
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST 
app.post('/api/users', (req, res) => {
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser = { id: newId, name: req.body.name, email: req.body.email };
  users.push(newUser);
  res.json(newUser);
});

// PUT 
app.put('/api/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], name: req.body.name, email: req.body.email };
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).send(`User with ID ${userId} not found`);
  }
});

// DELETE 
app.delete('/api/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send(`User with ID ${userId} not found`);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
