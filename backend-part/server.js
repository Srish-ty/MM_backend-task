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

// GET /api/users -> Returns JSON list of all users.
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST /api/users -> Adds user data to the users array.
app.post('/api/users', (req, res) => {
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser = { id: newId, name: req.body.name, email: req.body.email };
  users.push(newUser);
  res.json(newUser);
});

// PUT /api/users/:userId -> Updates a user in the users array.
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

// DELETE /api/users/:userId - Deletes a user from the users array.
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

// Start the server.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
