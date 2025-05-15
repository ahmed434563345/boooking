const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/booking', (req, res) => {
  res.render('booking');
});
// ...existing code...
app.get('/hotels', (req, res) => {
  res.render('hotels'); // This will render views/hotels.ejs
});
// ...existing code...
app.post('/booking', (req, res) => {
  const data = req.body;
  const usersFilePath = path.join(__dirname, 'users.json');

  // Read existing data
  let users = [];
  if (fs.existsSync(usersFilePath)) {
    const fileData = fs.readFileSync(usersFilePath);
    users = JSON.parse(fileData);
  }

  // Append new user data
  users.push(data);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.render('thankyou', { name: data.name, destination: data.destination });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
