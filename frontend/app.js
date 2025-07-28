const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
    <h2>To-Do Form</h2>
    <form method="POST" action="/submit">
      <input name="itemId" placeholder="Item ID" /><br/>
      <input name="itemName" placeholder="Item Name" /><br/>
      <textarea name="itemDescription" placeholder="Item Description"></textarea><br/>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post('http://backend:5000/submit', req.body);
    res.send(`<h3>${response.data.message}</h3><pre>${JSON.stringify(response.data.data)}</pre>`);
  } catch (err) {
    res.send(`<h3>Error submitting data</h3>`);
  }
});

app.listen(3000, () => {
  console.log('Frontend running on port 3000');
});
